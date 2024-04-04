
import logo from '../logos/logo.jpg'
import React from "react";
import '../App.css';

export default function Contact() {


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
              <li class="nav-item ">
                <a class="nav-link" href="/contact">Contact</a>
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
        <div className="photo">
          
        </div>
      </div>

    </div>
  );
}

