
import logo from '../logos/logo.jpg'
import pics from '../logos/single hex.png'
import ChatBot from './ChatBot';
import React, { useEffect, useState } from "react";
import Typed from 'typed.js'
import '../App.css';
import 'animate.css';
export default function Home() {


  useEffect(() => {
    document.title = "Home";
    // Additional setup for Typed.js
    var typed = new Typed(".auto-type", {
      strings: ["a Trainee Software Engineer", "a Developer"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const [flippedImages, setFlippedImages] = useState([false, false, false, false, false, false]);
  const [flippedImageNames, setFlippedImageNames] = useState([false, false, false, false, false, false]);
  const [animatedIndex, setAnimatedIndex] = useState(null);

  const handleFlipClick = (index) => {
    const newFlippedImages = flippedImages.map((status, i) => (i === index ? !status : status));
    setFlippedImages(newFlippedImages);
    const newFlippedImageNames = flippedImageNames.map((status, i) => (i === index ? !status : status));
    setFlippedImageNames(newFlippedImageNames);
    setAnimatedIndex(index);
    setTimeout(() => setAnimatedIndex(null), 1000); // Reset after animation
  }

  return (
    <div className={`Home`}>

      <nav class="navbar navbar-expand-sm">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home"><img src={logo} alt="Logo" class="rounded-circle" style={{ width: 50 }} /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <i class="bi bi-toggles2"></i>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul class="navbar-nav ">
              <li class="nav-item ">
                <a class="nav-link " href="/about">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="content row-sm">
        <div class="details col-5">
          <h2>Hi There,<br />I'm <span className="render">Ashwin Kumar</span></h2>
          <h1>I'm <span class="auto-type"></span></h1>
        </div>
        <div className="hexagon-container col">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div 
            key={index}
            className={`image-container ${flippedImages[index] ? 'flipped' : ''} i${index} ${animatedIndex === index ? 'animate__animated animate__rubberBand' : ''}`} 
            onMouseEnter={() => handleFlipClick(index)} 
            onMouseLeave={() => handleFlipClick(index)}
          >
            <img src={pics} alt="Flippable" />
            {flippedImageNames[index] && <a className="image-name" href={getHref(index)}>{getName(index)}</a>}
          </div>
        ))}
      </div>
      </div>
      <ChatBot/>
      <script src="script.js"></script>
    </div>
  );
}

function getHref(index) {
  const hrefs = ["/photo", "https://www.instagram.com/_its_ashwin_kumar_/#", "https://www.linkedin.com/in/ashwin-kumar-7a6a7b23a/", "/resume", "/skill", "#"];
  return hrefs[index];
}

function getName(index) {
  const names = ["Photo lab", "Instagram", "Linkedin", "Resume", "Skill Gallery", ""];
  return names[index];
}