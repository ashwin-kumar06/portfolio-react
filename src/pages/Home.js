
import logo from '../logos/logo.jpg'
import pics from '../logos/single hex.png'
import React, { useEffect, useState } from "react";
import Typed from 'typed.js'
import '../App.css';

export default function Home() {
  useEffect(() => {
    // Initialize Typed in the useEffect hook
    var typed = new Typed(".auto-type", {
      strings: ["a Trainee Software Engineer", "a Developer"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });

    // Cleanup function to destroy Typed when the component unmounts
    return () => {
      typed.destroy();
    };
  }, []);
  const [flippedImages, setFlippedImages] = useState([false, false, false, false, false, false]);
  const [flippedImageNames, setFlippedImageNames] = useState([false, false, false, false, false, false]);

  const handleFlipClick = (index) => {
    // Create a new array with the flipped status of only the clicked image updated
    const newFlippedImages = flippedImages.map((status, i) => (i === index ? !status : status));
    setFlippedImages(newFlippedImages);
    const newFlippedImageNames = flippedImageNames.map((status, i) => (i === index ? !status : status));
    setFlippedImageNames(newFlippedImageNames);
  }

  return (
    <div className="Home" >

      <nav class="navbar navbar-expand-sm">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home"><img src={logo} alt="Logo" class="rounded-circle" style={{ width: 50 }} /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
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

      <div class="content">
        <div class="details">
          <h2>Hi There,<br />I'm <span>Ashwin Kumar</span></h2>
          <h1>I'm <span class="auto-type"></span></h1>
        </div>
        <div className="hexagon-container">
          <div className={`image-container ${flippedImages[0] ? 'flipped' : ''}`} onMouseEnter={() => handleFlipClick(0)} onMouseLeave={() => handleFlipClick(0)} style={{ top: 30, left: 170 }}>
            <img src={pics} alt="Flippable" />
            {flippedImageNames[0] && <a className="image-name" href="/photo">Photo lab</a>}
          </div>
          <div className={`image-container ${flippedImages[1] ? 'flipped' : ''}`} onMouseEnter={() => handleFlipClick(1)} onMouseLeave={() => handleFlipClick(1)} style={{ top: 100, left: 30 }}>
            <img src={pics} alt="Flippable" />
            {flippedImageNames[1] && <a className="image-name" href="https://www.instagram.com/_its_ashwin_kumar_/#">Instagram</a>}
          </div>
          <div className={`image-container ${flippedImages[2] ? 'flipped' : ''}`} onMouseEnter={() => handleFlipClick(2)} onMouseLeave={() => handleFlipClick(2)} style={{ top: 170, left: -110 }}>
            <img src={pics} alt="Flippable" />
            {flippedImageNames[2] && <a className="image-name" href="https://www.linkedin.com/in/ashwin-kumar-7a6a7b23a/">Linkedin</a>}
          </div>
          <div className={`image-container ${flippedImages[3] ? 'flipped' : ''}`} onMouseEnter={() => handleFlipClick(3)} onMouseLeave={() => handleFlipClick(3)} style={{ top: 50, left: -280 }}>
            <img src={pics} alt="Flippable" />
            {flippedImageNames[3] && <a className="image-name" href="/resume">Resume</a>}
          </div>
          <div className={`image-container ${flippedImages[4] ? 'flipped' : ''}`} onMouseEnter={() => handleFlipClick(4)} onMouseLeave={() => handleFlipClick(4)} style={{ top: 5, left: -20 }}>
            <img src={pics} alt="Flippable" />
            {flippedImageNames[4] && <a className="image-name" href="/skill">Skil Gallery</a>}
          </div>
          <div className={`image-container ${flippedImages[5] ? 'flipped' : ''}`} onMouseEnter={() => handleFlipClick(5)} onMouseLeave={() => handleFlipClick(5)} style={{ top: 80, left: -380 }}>
            <img src={pics} alt="Flippable" />
            {flippedImageNames[5] && <a className="image-name"></a>}
          </div>
        </div>
      </div>

    </div>
  );
}

