
import logo from '../logos/logo.jpg'
import React from "react";
import '../App.css';

export default function Skill() {
  
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
                <a class="nav-link " href="/home">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section class = "skills container">
      <div class = "title">
        <h2>Skills</h2>
        <div>
          <h2>Full Stack Development</h2>
        </div>
      </div>

      <div class = "row">
        <div class = "item">
          <div class = "item-text">
            <span>Html 5</span>
            <span class = "w-90">90%</span>
          </div>
          <div class = "progress">
            <div class = "progress-bar w-90"></div>
          </div>
        </div>

        <div class = "item">
          <div class = "item-text">
            <span>CSS 3</span>
            <span class = "w-75">85%</span>
          </div>
          <div class = "progress">
            <div class = "progress-bar w-85"></div>
          </div>
        </div>

        <div class = "item">
          <div class = "item-text">
            <span>React Js</span>
            <span class = "w-85">80%</span>
          </div>
          <div class = "progress">
            <div class = "progress-bar w-80"></div>
          </div>
        </div>

        <div class = "item">
          <div class = "item-text">
            <span>MySql</span>
            <span class = "w-80">80%</span>
          </div>
          <div class = "progress">
            <div class = "progress-bar w-80"></div>
          </div>
        </div>

        <div class = "item">
          <div class = "item-text">
            <span>.Net C#</span>
            <span class = "w-80">60%</span>
          </div>
          <div class = "progress">
            <div class = "progress-bar w-60"></div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

