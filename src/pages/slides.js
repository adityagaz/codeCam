import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw,
  BookOpen,
  Calendar,
  Clock,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const serverLink = process.env.REACT_APP_BACKEND_URI;

const Slides = () => {
  let local_Data = localStorage.getItem('slides');
  const [data, setData] = useState(local_Data != undefined ? JSON.parse(local_Data) : []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${serverLink}get_data`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        const newData = await res.json();
        setData(newData);
        localStorage.setItem('slides', JSON.stringify(newData));
      } catch (error) {
        console.log(error);
        toast.error("Error receiving data");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (isPlaying && data.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % data.length);
      }, 5000);
      setAutoPlayInterval(interval);
      return () => clearInterval(interval);
    } else if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }, [isPlaying, data.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSlides = () => {
    setCurrentSlide(0);
    setIsPlaying(true);
  };

  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No Slides Available</h2>
          <p className="text-lg text-gray-600 mb-8">
            There are currently no slides to display. Check back later or contact an administrator.
          </p>
          <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Revision Slides
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review and study important concepts with our interactive slide presentation
          </p>
        </div>

        {/* Main Slide Display */}
        <div className="relative mb-8">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-96 md:h-[500px] flex items-center justify-center">
                {/* Slide Content */}
                <div className="text-center px-8 py-12 max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {data[currentSlide]?.heading || 'Loading...'}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    {data[currentSlide]?.body || 'Content loading...'}
                  </p>
                </div>

                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            onClick={togglePlayPause}
            variant="outline"
            className="px-6 py-3 border-2 hover:bg-gray-50"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Play
              </>
            )}
          </Button>

          <Button
            onClick={resetSlides}
            variant="outline"
            className="px-6 py-3 border-2 hover:bg-gray-50"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Auto-advance: {isPlaying ? 'On' : 'Off'}</span>
          </div>
        </div>

        {/* Slide Progress */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
            <Calendar className="w-4 h-4" />
            <span>Slide {currentSlide + 1} of {data.length}</span>
          </div>
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / data.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Slide Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {data.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`p-3 rounded-lg text-left transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-blue-100 border-2 border-blue-500 shadow-lg'
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="text-xs font-medium text-gray-900 mb-1 truncate">
                {slide.heading}
              </div>
              <div className="text-xs text-gray-500 line-clamp-2">
                {slide.body}
              </div>
            </button>
          ))}
        </div>

        {/* Keyboard Navigation Info */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Use arrow keys or click the navigation buttons to move between slides</p>
          <p className="mt-1">Press Space to play/pause auto-advance</p>
        </div>
      </div>
    </div>
  );
};

export default Slides;