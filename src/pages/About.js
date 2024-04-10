
import logo from '../logos/logo.jpg'
import React from "react";
import '../App.css';

export default function About() {


  return (
    <div className="Home" >

      <nav class="navbar navbar-expand-sm ">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home"><img src={logo} alt="Logo" class="rounded-circle" style={{ width: 50 }} /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul class="navbar-nav ">
              <li class="nav-item ">
                <a class="nav-link " href="/home">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="about col-6">
        <div class="details">
          <h2>Welcome to<br /><span>Ashwin Kumar's </span>Portfolio!</h2>
          <h1>Hello there! <span class="auto-type"> I'm Ashwin Kumar, a passionate Software Developer based in Nagercoil. Welcome to my creative space, where I bring ideas to life and turn concepts into captivating experiences.</span></h1>
        </div><br/><br/>
        <div class="details">
          <h2>Who Am I?</h2>
          <h1>I'm <span class="auto-type">more than just a Software Developer. I am a Ambitious individual with an insatiable curiosity and a love for Computer Science. From a young age, I've been fascinated by Computer and technologies. This passion has driven me to continually explore, learn, and evolve in the ever-changing landscape of Software Development.</span></h1>
        </div><br/><br/>
        <div class="details">
          <h2>What i Do?</h2>
          <h1>My <span class="auto-type">expertise lies in Software Development. Whether it's Frontend, Backend, or Full Stack, I am dedicated to delivering top-notch results that not only meet but exceed expectations. I thrive on challenges and am always eager to take on new and exciting projects.</span></h1>
        </div><br/><br/>
        <div class="details">
          <h2>Why Work With Me??</h2>
          <h1>Creativity Unleashed: <span class="auto-type">I believe in the power of creativity to transform ideas into something extraordinary. Each project is an opportunity to innovate and push the boundaries of what's possible.</span></h1>
          <h1>Collaborative Spirit: <span class="auto-type"> I value collaboration and believe that the best results come from working together. I see each project as a partnership, and I'm committed to open communication and mutual success.</span></h1>
          <h1>Attention to Detail: <span class="auto-type">Whether it's a small detail in design or a crucial element in coding, I pay meticulous attention to ensure every aspect of my work is polished and precise.</span></h1>
        </div><br/><br/>
        <div class="details">
          <h2>Let's Connect!</h2>
          <h1><span class="auto-type">I'm always open to new opportunities and collaborations. If you're looking for someone who is passionate about Computer Science and can bring a fresh perspective to your project, let's chat! Feel free to reach out through </span> <a href='ashwinkumar0850@gmail.com'>Ashwin Kumar</a> </h1>
          <h1><span class="auto-type">Thank you for visiting my portfolio. I look forward to the possibility of working together and creating something extraordinary!</span></h1>
        </div>
        <div className="photo col-12">
          
        </div>
      </div>

    </div>
  );
}

