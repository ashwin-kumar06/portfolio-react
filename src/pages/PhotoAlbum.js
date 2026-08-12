import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Modal,
  IconButton,
  Button,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ExtensionIcon from '@mui/icons-material/Extension';
import logo from '../logos/logo.jpg';
import photos from '../photosdata';
import './PhotoAlbum.css';

function getCardStyle(distanceFromCenter) {
  const absDist = Math.abs(distanceFromCenter);
  const scale = Math.max(0.6, 1 - absDist * 0.12);
  const opacity = Math.max(0.4, 1 - absDist * 0.2);
  const zIndex = Math.round(100 - absDist * 10);

  return {
    transform: `scale(${scale})`,
    opacity,
    zIndex,
  };
}

export default function PhotoAlbum() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const [cardStyles, setCardStyles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const allPhotos = Object.values(photos);

  const updateCardStyles = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const items = container.querySelectorAll('.photo-album-card');

    const styles = Array.from(items).map((item) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = (itemCenter - containerCenter) / item.offsetWidth;
      return getCardStyle(distance);
    });

    setCardStyles(styles);
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateCardStyles);
  }, [updateCardStyles]);

  useEffect(() => {
    updateCardStyles();
    window.addEventListener('resize', updateCardStyles);
    return () => {
      window.removeEventListener('resize', updateCardStyles);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateCardStyles, allPhotos.length]);

  const handleOpenModal = useCallback((image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setOpenModal(true);
  }, []);

  const handlePlayJigsaw = useCallback(() => {
    if (selectedIndex !== null) {
      setOpenModal(false);
      navigate(`/photo/jigsaw/${selectedIndex}`);
    }
  }, [selectedIndex, navigate]);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <Box className="photo-album-page">
      <AppBar position="static" className="photo-album-header" elevation={0}>
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{ width: 50, height: 50, marginRight: 10, borderRadius: '50%' }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#C8ACD6' }}>
            My Photo Gallery
          </Typography>
          <IconButton color="inherit" href="/home" aria-label="home" sx={{ color: '#C8ACD6' }}>
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box className="photo-album-carousel-wrapper">
        <Box
          className="photo-album-carousel"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {allPhotos.map((item, index) => (
            <Box
              key={index}
              className="photo-album-card"
              style={cardStyles[index] || {}}
              onClick={() => handleOpenModal(item, index)}
              role="button"
              tabIndex={0}
              aria-label={`View photo ${index + 1}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenModal(item, index);
                }
              }}
            >
              <img
                src={item}
                alt={`Gallery ${index + 1}`}
                loading="lazy"
                draggable={false}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slotProps={{
          backdrop: {
            className: 'photo-album-lightbox-backdrop',
          },
        }}
      >
        <Fade in={openModal}>
          <Box className="photo-album-lightbox-content">
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              className="photo-album-lightbox-close"
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <Box className="photo-album-lightbox-inner">
                <img src={selectedImage} alt="Selected" />
                <Button
                  variant="contained"
                  className="photo-album-jigsaw-btn"
                  startIcon={<ExtensionIcon />}
                  onClick={handlePlayJigsaw}
                >
                  Play Jigsaw
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
