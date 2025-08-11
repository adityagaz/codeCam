import React, { useState, createContext, useRef, useEffect } from "react";
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Peer } from 'peerjs';
import * as faceapi from 'face-api.js';
import Chat from "../components/pchat";
import copy from 'copy-to-clipboard';
import Editor from "../components/peditor";
import { 
  Phone, 
  PhoneOff, 
  Monitor, 
  MonitorOff, 
  Copy, 
  MessageCircle, 
  X,
  Users,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Settings,
  Shield,
  Clock,
  User,
  Code,
  FileText,
  Maximize2,
  Minimize2,
  GripVertical
} from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";

const server = process.env.REACT_APP_BACKEND_URI;
const server_host = process.env.REACT_APP_BACKEND_HOST;

const PeerCall = () => {
    const location = useLocation();
    const history = useNavigate();
    const { roomId } = useParams();

    const myName = location.state?.username;
    const interviewer = location.state?.interviewer;

    const MOTION_THRESHOLD = 40;
    const [myConns, setMyConns] = useState(new Map());
    const [mycalls, setMyCalls] = useState(new Set());
    const idName = new Map();

    var userMoves = 0;
    var previousLandmarks = null;
    var warned = false;
    var peer = null;
    var dataStream = null;
    var screenStream = null;
    var myPeerId;
    var timer;

    const [allPeers, setAllPeers] = useState([]);
    const [stream, setstream] = useState(null);
    const [lang, setLang] = useState('javascript');
    const [chatState, setChatState] = useState(false);
    const [displayCheck, setDisplayCheck] = useState(false);
    const [sirId, setsirId] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [participantCount, setParticipantCount] = useState(1);
    const [callDuration, setCallDuration] = useState(0);
    const [problemStatement, setProblemStatement] = useState('');
    const [editorWidth, setEditorWidth] = useState(60); // percentage
    const [isResizing, setIsResizing] = useState(false);
    
    const myVideo = useRef();
    const [code, setcode] = useState(`console.log("Live shared Code Editor")`);

    // Call duration timer
    useEffect(() => {
        const interval = setInterval(() => {
            setCallDuration(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Resizable editor
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isResizing) {
                const containerWidth = window.innerWidth;
                const newWidth = (e.clientX / containerWidth) * 100;
                setEditorWidth(Math.max(30, Math.min(80, newWidth)));
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    //Face motion logic
    function analyzeFaceMotions(landmarks) {
        const currentLandmarks = landmarks._positions;

        if (previousLandmarks && currentLandmarks.length == 68) {
            let totalMotion = 0, averageMotion = 0;
            for (let i = 0; i < 68; i++) {
                const dx = currentLandmarks[i]._x - previousLandmarks[i]._x;
                const dy = currentLandmarks[i]._y - previousLandmarks[i]._y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                totalMotion += distance;
            }
            averageMotion = totalMotion / 68;
            if (averageMotion > MOTION_THRESHOLD) {
                toast('Face motion detected, Please concentrate on the interview', {
                    icon: '❕',
                });
                userMoves++;
            }
        }
        previousLandmarks = currentLandmarks;
    }

    async function detectFaceMotions() {
        if (!myVideo.current) return;

        timer = setInterval(async () => {
            if (warned) {
                if (sirId) { }
                else {
                    toast.error('Please Behave until the Interviewer joins');
                }
                warned = false;
                userMoves = 0;
                return;
            }
            if (userMoves > 12) {
                toast.error("Warning! Interviewer will be notified if movement is observed again.");
                userMoves = userMoves - 2;
                warned = true;
            }
            const detections = await faceapi.detectAllFaces(myVideo.current,
                new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

            if (myVideo.current && detections.length == 0) {
                toast.error("Please sit in a well lit room and face the Webcam!");
                userMoves++;
            }
            else if (detections?.length > 1) {
                toast.error(`${detections.length} persons spotted in camera`);
                userMoves++;
            }
            else if (detections && detections.length == 1) {
                analyzeFaceMotions(detections[0].landmarks);
            } else {
                toast.error(" Please face the webcam!");
            }
        }, 2500);
    }

    useEffect(() => {
        //take camera permission
        navigator?.mediaDevices?.getUserMedia({ video: true, audio: true })
            .then(videoStream => {
                dataStream = videoStream;
                setstream(videoStream);
                init(videoStream);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Cannot connect without video and audio permissions');
                return <Navigate to="/" />;
            });
        
        loadModels();
        
        const init = async (videoStream) => {
            var peer_params = {
                host: server_host,
                path: '/myapp',
            }
            if (server_host == 'localhost') peer_params['port'] = 3007;
            peer = new Peer(peer_params);
            
            peer.on('open', function (id) {
                myPeerId = id;
                addVideo(videoStream, id, myName);
                if (interviewer)
                    detectFaceMotions();
                let flag = interviewer ? false : true;
                
                fetch(`${server}join`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        roomId,
                        username: myName,
                        peerId: id,
                        flag
                    })
                }).then(res => res.json())
                    .then(res_arr => {
                        const { data } = res_arr;
                        setAllPeers(data);
                        setParticipantCount(data.length + 1);
                        
                        for (const { peerId, username } of data) {
                            let conn = peer.connect(peerId);
                            conn.on("open", () => {
                                myConns.set(conn, username);
                                conn.send({ sig: 1, data: { id, name: myName } });
                                let call = peer.call(peerId, videoStream);
                                call.on('stream', (remoteStream) => {
                                    mycalls.add(call);
                                    addVideo(remoteStream, peerId, username);
                                });
                            });

                            conn.on('data', ({ sig, data }) => {
                                recvHandler(conn, sig, data);
                            });

                            conn.on('close', () => {
                                myConns.delete(conn);
                                const element = document.getElementById(peerId);
                                element?.remove();
                                setParticipantCount(prev => prev - 1);
                            });

                            if (peerId == sirId) {
                                toast.success('Interviewer Joined');
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });

            peer.on("connection", (conn) => {
                conn.on('data', ({ sig, data }) => {
                    recvHandler(conn, sig, data);
                });
                conn.on('close', () => {
                    myConns.delete(conn);
                    toast.success(`${idName[conn.peer]} left the Call`);
                    const element = document.getElementById(conn.peer);
                    element?.remove();
                    setParticipantCount(prev => prev - 1);
                });
            });

            peer.on('call', (call) => {
                call.answer(videoStream);
                mycalls.add(call);
                call.on('stream', (remoteStream) => {
                    addVideo(remoteStream, call.peer, idName[call.peer]);
                });
                toast.success(`${idName[call.peer]} joined the Call`);
                setParticipantCount(prev => prev + 1);
            });
        };

        return () => {
            const ele = document.getElementById(myPeerId);
            ele?.remove();
            clearInterval(timer);
            if (peer) {
                try {
                    fetch(`${server}leave`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            roomId,
                            peerId: myPeerId,
                        })
                    });
                } catch (err) {
                    console.log(err);
                    toast.error("Coudn't leave the room at the current moment");
                }
                peer.destroy();
            }
            if (dataStream) {
                const tracks = dataStream.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    const sendHandler = (sig, data) => {
        for (const [conn, name] of myConns) {
            conn.send({ sig, data });
        }
    };

    const recvHandler = (conn, sig, data) => {
        switch (sig) {
            case 1: {
                const { id, name } = data;
                myConns.set(conn, name);
                idName[id] = name;
                conn.send(3, { value: code });
                break;
            }
            case 2: {
                const { username, msg } = data;
                addRecvMsg(msg, username);
            }
            case 3: {
                const { value } = data;
                if (value != code)
                    setcode(value);
            }
            case 4: {
                const { newLang } = data;
                if (lang != newLang) setLang(newLang);
            }
            default:
                break;
        }
    };

    const addRecvMsg = (text, name = 'Unknown') => {
        setChatState(true);
        const element =
            ` <div class='receive'>
                    <div class='msg'>
                    <span class='senderName' >${name}</span>
                       ${text}
                    </div>
                </div>`;
        const rdiv = document.createElement('div');
        rdiv.innerHTML = element;
        rdiv.setAttribute('class', 'msg-container');
        const par = document.getElementById('msg-div');
        par?.appendChild(rdiv);
        if (par)
            par.scrollTop = par.scrollHeight;
    };

    function addVideo(vstream, peerID, userName = "user") {
        const prev = document.getElementById(peerID);
        prev?.remove();
        const row = document.createElement('div');
        row.setAttribute('class', 'video-container');
        row.setAttribute('id', peerID);

        const video = document.createElement('video');
        video.srcObject = vstream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        
        if (peerID == myPeerId) {
            video.muted = true;
            myVideo.current = video;
        }

        const span = document.createElement('span');
        span.innerText = userName;
        span.setAttribute('class', 'user-name-tag');

        row.append(video);
        row.append(span);

        const exist = document.getElementById(peerID);
        if (exist) return;

        const peerDiv = document.getElementById('peerDiv');
        peerDiv?.insertBefore(row, peerDiv.children[0]);
    };

    const loadModels = () => {
        Promise.all([
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.loadFaceLandmarkTinyModel("/models")
        ]).then(() => {
            // console.log('Models Loaded');
        }).catch(err => {
            console.log('FaceAPI modules loading error', err);
        });
    };

    const screenShareHandler = async (e) => {
        e.preventDefault();
        setDisplayCheck(!displayCheck);
        idName['screen'] = 'screen';
        navigator?.mediaDevices?.getDisplayMedia({ audio: true }).then(displStream => {
            screenStream = displStream;
            addVideo(displStream, 'screen', 'Screen');
            replaceStream(displStream);
        }).catch((error) => {
            console.log(error);
        });
    };

    const replaceStream = (mediaStream) => {
        for (const call of mycalls) {
            for (let sender of call.peerConnection?.getSenders()) {
                if (sender.track.kind == "audio") {
                    if (mediaStream.getAudioTracks().length > 0) {
                        sender.replaceTrack(mediaStream.getAudioTracks()[0]);
                    }
                }
                if (sender.track.kind == "video") {
                    if (mediaStream.getVideoTracks().length > 0) {
                        sender.replaceTrack(mediaStream.getVideoTracks()[0]);
                    }
                }
            }
        }
    };

    function stopCapture(evt) {
        evt.preventDefault();
        setDisplayCheck(!displayCheck);
        replaceStream(stream);
        let ele = document.getElementById('screen');
        const evid = ele?.childNodes[1];
        if (evid && evid.srcObject) {
            const tracks = evid.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
        }
        ele?.remove();
    };

    const copyCode = (e) => {
        e.preventDefault();
        if (copy(roomId))
            toast.success('Session ID copied');
        else toast.error('Cannot copy to clipboard');
    };

    function chatHider() {
        setChatState(chatState => !chatState);
    }

    function leaveRoom() {
        if (peer) {
            try {
                fetch(`${server}leave`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        roomId,
                        peerId: myPeerId,
                    })
                });
            } catch (err) {
                console.log(err);
                toast.error("Coudn't leave the room at the current moment");
            }
            peer.destroy();
        }
        if (dataStream) {
            const tracks = dataStream.getTracks();
            tracks.forEach((track) => track.stop());
        }
        clearInterval(timer);
        history('/');
    }

    const toggleMute = () => {
        if (dataStream) {
            const audioTrack = dataStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    };

    const toggleVideo = () => {
        if (dataStream) {
            const videoTrack = dataStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
            }
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!location.state) {
        return <Navigate to="/" />;
    }

    return (
        <div className="min-h-screen bg-gray-900 pt-16">
            {/* Compact Header Bar */}
            <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-gray-300">
                            <Users className="w-4 h-4" />
                            <span className="text-sm font-medium">{participantCount}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">{formatTime(callDuration)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-medium">Secure</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <code className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg font-mono text-sm border border-gray-600">
                            {roomId}
                        </code>
                        <Button
                            onClick={copyCode}
                            variant="ghost"
                            size="sm"
                            className="text-gray-300 hover:text-white hover:bg-gray-700"
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex h-[calc(100vh-5rem)]">
                {/* Left Side - Problem Statement & Code Editor */}
                <div className="flex-1 flex flex-col" style={{ width: `${editorWidth}%` }}>
                    {/* Problem Statement */}
                    <div className="bg-gray-800 border-b border-gray-700 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                                <FileText className="w-5 h-5 mr-2" />
                                Problem Statement
                            </h3>
                            <Button
                                onClick={() => setProblemStatement('')}
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-white"
                            >
                                Clear
                            </Button>
                        </div>
                        <textarea
                            value={problemStatement}
                            onChange={(e) => setProblemStatement(e.target.value)}
                            placeholder="Enter the problem statement here..."
                            className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                        />
                    </div>

                    {/* Code Editor */}
                    <div className="flex-1 bg-gray-900">
                        <div className="bg-gray-800 border-b border-gray-700 p-3">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                                <Code className="w-5 h-4 mr-2" />
                                Live Code Editor
                            </h3>
                        </div>
                        <div className="h-full">
                            <Editor
                                conns={myConns}
                                roomId={roomId}
                                onCodeChange={setcode}
                                code={code}
                                lang={lang}
                                peer={peer}
                                sendHandler={sendHandler}
                            />
                        </div>
                    </div>
                </div>

                {/* Resize Handle */}
                <div
                    className="w-1 bg-gray-700 hover:bg-blue-500 cursor-col-resize transition-colors duration-200"
                    onMouseDown={() => setIsResizing(true)}
                >
                    <div className="w-1 h-full flex items-center justify-center">
                        <GripVertical className="w-3 h-3 text-gray-500" />
                    </div>
                </div>

                {/* Right Side - Video & Controls */}
                <div className="flex-1 flex flex-col bg-gray-800">
                    {/* Video Grid */}
                    <div className="flex-1 p-4">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <Video className="w-5 h-5 mr-2" />
                            Participants
                        </h3>
                        <div id="peerDiv" className="grid grid-cols-1 gap-4">
                            {/* Videos will be dynamically added here */}
                        </div>
                    </div>

                    {/* Compact Controls */}
                    <div className="bg-gray-900 border-t border-gray-700 p-4">
                        <div className="flex items-center justify-center space-x-3">
                            <Button
                                onClick={toggleMute}
                                variant={isMuted ? "destructive" : "outline"}
                                size="sm"
                                className="w-12 h-12 rounded-full p-0"
                            >
                                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                            </Button>
                            
                            <Button
                                onClick={toggleVideo}
                                variant={isVideoOff ? "destructive" : "outline"}
                                size="sm"
                                className="w-12 h-12 rounded-full p-0"
                            >
                                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                            </Button>
                            
                            <Button
                                onClick={!displayCheck ? screenShareHandler : stopCapture}
                                variant="outline"
                                size="sm"
                                className="w-12 h-12 rounded-full p-0"
                            >
                                {!displayCheck ? <Monitor className="w-5 h-5" /> : <MonitorOff className="w-5 h-5" />}
                            </Button>
                            
                            <Button
                                onClick={chatHider}
                                variant="outline"
                                size="sm"
                                className="w-12 h-12 rounded-full p-0"
                            >
                                <MessageCircle className="w-5 h-5" />
                            </Button>
                            
                            <Button
                                onClick={leaveRoom}
                                className="w-12 h-12 rounded-full p-0 bg-red-600 hover:bg-red-700 text-white"
                            >
                                <PhoneOff className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Component */}
            {chatState && (
                <div className="fixed bottom-4 right-4 w-96 h-96 z-50">
                    <Card className="border-0 shadow-2xl bg-gray-800 border border-gray-700 h-full">
                        <CardContent className="p-0 h-full flex flex-col">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-t-lg flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">Chat</h3>
                                <Button
                                    onClick={chatHider}
                                    variant="ghost"
                                    size="sm"
                                    className="text-white hover:bg-white/20"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <Chat
                                    recvMsg={addRecvMsg}
                                    conns={myConns}
                                    roomId={roomId}
                                    username={myName}
                                    sendHandler={sendHandler}
                                    peer={peer}
                                    className='chatCont'
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Custom CSS for video containers */}
            <style jsx>{`
                .video-container {
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #000;
                    aspect-ratio: 16/9;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                }
                
                .video-container video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 12px;
                }
                
                .user-name-tag {
                    position: absolute;
                    bottom: 8px;
                    left: 8px;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
};

export default PeerCall;