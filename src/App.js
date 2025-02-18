import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Skill from './pages/Skill';
import Resume from './pages/Resume';
import PhotoAlbum from './pages/PhotoAlbum';
import LoadingPage from './pages/LoadingPage';
import TrainingChatBox from './pages/TrainingChatBox';
import LearningExperiencePlatform from './pages/Projects/Lxp';
import OnlineAuctionSystem from './pages/Projects/Oas';
import NutritionAssistantApplication from './pages/Projects/Naa';
import ViewVisitors from './pages/ViewVisitors';
import Books from './pages/Book/Books';
import BookReader from './pages/Book/BookReader';

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/portfolio-react" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="skill" element={<Skill />} />
                <Route path="resume" element={<Resume />} />
                <Route path="photo" element={<PhotoAlbum />} />
                <Route path="lxp" element={<LearningExperiencePlatform />} />
                <Route path="oas" element={<OnlineAuctionSystem />} />
                <Route path="naa" element={<NutritionAssistantApplication />} />
                <Route path="/trainingChatBox" element={<TrainingChatBox />} />
                <Route path="/loading" element={<LoadingPage />} />
                <Route path="/visitors" element={<ViewVisitors />} />
                <Route path="/books" element={<Books />} />
                <Route path="/book/:id" element={<BookReader />} />
            </Routes>
        </div>
    );
}