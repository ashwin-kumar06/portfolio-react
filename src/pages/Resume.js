
import logo from '../logos/logo.jpg'
import React from "react";
import '../App.css';
import resume from '../logos/2023 Resume.jpg'

export default function Resume() {
  
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
      <div>
        <img src={resume} style={{width:900}}/>
      </div>
      
    </div>
  );
}

