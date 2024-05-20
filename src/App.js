import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Skill from './pages/Skill';
import Resume from './pages/Resume';
import PhotoAlbum from './pages/PhotoAlbum';
import ChatGPTComponent from './pages/ChatBot';
import LoadingPage from './pages/LoadingPage';

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="skill" element={<Skill />} />
                <Route path="resume" element={<Resume />} />
                <Route path="photo" element={<PhotoAlbum />}/>
                <Route path="/portfolio-react" element={<LoadingPage />}/>
            </Routes>
        </div>
    );
}