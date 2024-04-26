
import logo from '../logos/logo.jpg'
import pics from '../logos/single hex.png'
import ChatBot from './ChatBot';
import React, { useEffect, useState } from "react";
import Typed from 'typed.js'
import '../App.css';

export default function Home() {
  useEffect(() => {
    document.title="Home"
    // Initialize Typed in the useEffect hook
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

  const handleFlipClick = (index) => {
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
          <h2>Hi There,<br />I'm <span>Ashwin Kumar</span></h2>
          <h1>I'm <span class="auto-type"></span></h1>
        </div>
        <div className="hexagon-container col">
          <div className={`image-container ${flippedImages[0] ? 'flipped' : ''} i0`} onMouseEnter={() => handleFlipClick(0)} onMouseLeave={() => handleFlipClick(0)} >
            <img src={pics} alt="Flippable" />
            {flippedImageNames[0] && <a className="image-name" href="/photo">Photo lab</a>}
          </div>
          <div class='i1' className={`image-container ${flippedImages[1] ? 'flipped' : ''} i1`} onMouseEnter={() => handleFlipClick(1)} onMouseLeave={() => handleFlipClick(1)} >
            <img src={pics} alt="Flippable" />
            {flippedImageNames[1] && <a className="image-name" href="https://www.instagram.com/_its_ashwin_kumar_/#">Instagram</a>}
          </div>
          <div class='i2' className={`image-container ${flippedImages[2] ? 'flipped' : ''} i2`} onMouseEnter={() => handleFlipClick(2)} onMouseLeave={() => handleFlipClick(2)} >
            <img src={pics} alt="Flippable" />
            {flippedImageNames[2] && <a className="image-name" href="https://www.linkedin.com/in/ashwin-kumar-7a6a7b23a/">Linkedin</a>}
          </div>
          <div class='i3' className={`image-container ${flippedImages[3] ? 'flipped' : ''} i3`} onMouseEnter={() => handleFlipClick(3)} onMouseLeave={() => handleFlipClick(3)} >
            <img src={pics} alt="Flippable" />
            {flippedImageNames[3] && <a className="image-name" href="/resume">Resume</a>}
          </div>
          <div class='i4' className={`image-container ${flippedImages[4] ? 'flipped' : ''} i4`} onMouseEnter={() => handleFlipClick(4)} onMouseLeave={() => handleFlipClick(4)} >
            <img src={pics} alt="Flippable" />
            {flippedImageNames[4] && <a className="image-name" href="/skill">Skil Gallery</a>}
          </div>
          <div class='i5' className={`image-container ${flippedImages[5] ? 'flipped' : ''} i5`} onMouseEnter={() => handleFlipClick(5)} onMouseLeave={() => handleFlipClick(5)} >
            <img src={pics} alt="Flippable" />
            {flippedImageNames[5] && <a className="image-name"></a>}
          </div>
        </div>
      </div>
      <ChatBot/>
      <figure class="icon-cards mt-3">
        <div class="icon-cards__content">
          <div class="icon-cards__item d-flex align-items-center justify-content-center"><span class="h1">🙂</span></div>
          <div class="icon-cards__item d-flex align-items-center justify-content-center"><span class="h1">😊</span></div>
          <div class="icon-cards__item d-flex align-items-center justify-content-center"><span class="h1">😀</span></div>
        </div>
      </figure>
      <script src="script.js"></script>
    </div>
  );
}

