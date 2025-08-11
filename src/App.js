import './App.css';
import "./styles/globals.css";
import React,{createContext, useReducer, useState, useEffect} from 'react';
import {Route , BrowserRouter as Router,Routes} from 'react-router-dom'
import { initialState, reducer } from './reducers/userReducer';
import 'react-bootstrap'
//components and pages
import MyNavbar from './components/navbar';
import Home from './pages/home';
import NotFound from './pages/NotFound';
// import Testing from './pages/testing';
import { Toaster } from 'react-hot-toast';
import Slides from './pages/slides';
import AddSlides from './pages/addSlides';
import PeerCall from './pages/peerCall';
import Motivation from './pages/motivation';
import Features from './pages/features';
import Footer from './components/footer';

export const UserContext = createContext();
export const ThemeContext = createContext();

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            <UserContext.Provider value={{state,dispatch}}>
                <div className={isDarkMode ? 'dark' : ''}>
                    <Toaster 
                        position='top-right'
                        toastOptions={{
                            style: {
                                background: isDarkMode ? '#1f2937' : '#fff',
                                color: isDarkMode ? '#f9fafb' : '#111827',
                                border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                            },
                        }}
                    />
                    <Router>
                        <div className='wrapper'>
                            <div className='App'>
                                <MyNavbar/>
                                <main className='content'>
                                    <Routes>
                                        <Route exact path="/" element={<Home/>} />
                                        {/* <Route exact path="/call/:roomId" element={<CallPage/>} /> */}
                                        <Route exact path="/call/:roomId" element={<PeerCall/>} />
                                        <Route exact path='/slides' element={<Slides/>} />
                                        <Route exact path='/add' element={<AddSlides/>} />
                                        {/* <Route path="/chat" element={<Chat/>} /> */}
                                        <Route exact path='/motivation' element={<Motivation />} />
                                        {/* <Route exact path='/features' element={<Features />} /> */}
                                        <Route path="*" element={<NotFound/>} />
                                    </Routes>
                                </main>
                                <Footer />
                            </div>
                        </div>
                    </Router>
                </div>
             </UserContext.Provider>
        </ThemeContext.Provider>
    );
}

export default App;
