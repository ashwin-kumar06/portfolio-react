
import logo from '../logos/logo.jpg'

import React from "react";
import photos from '../photosdata'
import '../App.css';

export default function PhotoAlbum() {

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
              <li class="nav-item ">
                <a class="nav-link" href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="photo-gallery">
        <div className="gallery container-fluid">
          <div className="row ">
            <div className="col-4">
              <img src={photos.image1} alt="1" />
              <img src={photos.image2} alt="2" />
         
              <img src={photos.image4} alt="4" />
              <img src={photos.image5} alt="5" />
              <img src={photos.image6} alt="6" />
              <img src={photos.image7} alt="7" />
              <img src={photos.image8} alt="8" />
              <img src={photos.image9} alt="9" />
              <img src={photos.image10} alt="10" />
              <img src={photos.image11} alt="11" />

              <img src={photos.image13} alt="13" />
              <img src={photos.image14} alt="14" />
         
              <img src={photos.image16} alt="16" />
              <img src={photos.image17} alt="17" />
              <img src={photos.image18} alt="18" />
            </div>
            <div className="col-4">

              <img src={photos.image19} alt="19" />
              <img src={photos.image20} alt="20" />
              <img src={photos.image21} alt="21" />
              <img src={photos.image22} alt="22" />
              <img src={photos.image23} alt="23" />
              <img src={photos.image24} alt="17" />
              <img src={photos.image25} alt="18" />
              <img src={photos.image26} alt="19" />
              <img src={photos.image27} alt="20" />
              <img src={photos.image28} alt="21" />
              <img src={photos.image29} alt="22" />
              <img src={photos.image30} alt="23" />
              <img src={photos.image31} alt="23" />
              <img src={photos.image32} alt="23" />
              <img src={photos.image33} alt="3" />
              <img src={photos.image34} alt="4" />
            </div>
            <div className="col-4">

              <img src={photos.image35} alt="5" />
              <img src={photos.image36} alt="6" />
              <img src={photos.image37} alt="7" />
              <img src={photos.image38} alt="8" />
              <img src={photos.image39} alt="9" />
              <img src={photos.image40} alt="10" />
              <img src={photos.image41} alt="11" />
             
              <img src={photos.image44} alt="14" />
        
              <img src={photos.image46} alt="16" />
              <img src={photos.image47} alt="16" />
              <img src={photos.image48} alt="16" />
              <img src={photos.image49} alt="16" />
              <img src={photos.image50} alt="16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

