import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from '../logos/logo.jpg';
import resume from '../logos/2023 Resume.jpg';
import '../App.css';

export default function Resume() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="Home">
      <motion.nav 
        className="navbar navbar-expand-sm"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-fluid">
          <motion.a 
            className="navbar-brand" 
            href="/home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={logo} alt="Logo" className="rounded-circle" style={{ width: 50 }} />
          </motion.a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <motion.a 
                  className="nav-link" 
                  href="/home"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home
                </motion.a>
              </li>
            </ul>
          </div>
        </div>
      </motion.nav>

      <motion.div 
        className="resume-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img 
          src={resume} 
          alt="Resume"
          style={{ 
            maxWidth: '100%', 
            height: 'auto', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.open(resume, '_blank')}
        />
      </motion.div>

      <motion.div 
        className="download-button"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.a 
          href={resume} 
          download="Ashwin_Kumar_Resume.jpg"
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Resume
        </motion.a>
      </motion.div>
    </div>
  );
}