import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaWindowMinimize, FaRegWindowMaximize, FaWindowClose, FaPuzzlePiece } from 'react-icons/fa';
import styled, { createGlobalStyle } from 'styled-components';
import photos from '../photosdata';
import { COLORS } from '../constant';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Shrikhand&family=VT323&display=swap');
  
  body {
    font-family: 'VT323', monospace;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${COLORS.lightSage};
    background-image: 
      linear-gradient(rgba(101, 124, 106, 0.4) 1px, transparent 1px),
      linear-gradient(90deg, rgba(101, 124, 106, 0.4) 1px, transparent 1px);
    background-size: 50px 50px;
    color: #000;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${COLORS.goldenYellow};
  border-bottom: 4px solid #000;
  box-shadow: 0px 6px 0px #000;
  z-index: 10;
`;

const HeaderTitle = styled.h1`
  font-family: 'Shrikhand', cursive;
  font-size: 2rem;
  color: #000;
  margin: 0;
  text-transform: uppercase;
  text-shadow: 2px 2px 0px #fff;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: ${COLORS.burntOrange};
  color: #fff;
  text-decoration: none;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  transition: all 0.1s ease;

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
  
  &:hover {
    background: #000;
    color: #fff;
  }
`;

const CarouselWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 80px); /* adjust based on header */
  position: relative;
  overflow: hidden;
`;

const CarouselScroll = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  scroll-behavior: smooth;
  height: 100%;
  width: 100%;
  padding: 0 50vw; /* allows first and last item to be centered */
  
  /* Hide scrollbar */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PhotoCard = styled(motion.div)`
  flex-shrink: 0;
  width: 500px;
  height: 680px;
  background: #fff;
  border: 4px solid #000;
  box-shadow: 12px 12px 0px rgba(0,0,0,0.8);
  padding: 1rem;
  margin: 0 -40px; /* negative margin to overlap cards slightly */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 2px solid #000;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const RetroWindow = styled(motion.div)`
  background: ${COLORS.lightSage};
  border: 3px solid #000;
  box-shadow: 10px 10px 0px #000;
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

const WindowHeader = styled.div`
  background: ${COLORS.sageGreen};
  border-bottom: 3px solid #000;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
`;

const WindowIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  
  svg {
    background: ${COLORS.lightSage};
    color: #000;
    border: 1px solid #000;
    padding: 2px;
    cursor: pointer;
  }
`;

const WindowContent = styled.div`
  padding: 1.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  gap: 1.5rem;

  img {
    max-width: 100%;
    max-height: 60vh;
    border: 4px solid #000;
    box-shadow: 6px 6px 0px #000;
  }
`;

const JigsawButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${COLORS.burntOrange};
  color: #fff;
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  border: 3px solid #000;
  box-shadow: 6px 6px 0px #000;
  cursor: pointer;
  transition: all 0.1s;
  
  &:active {
    transform: translate(3px, 3px);
    box-shadow: 3px 3px 0px #000;
  }
  
  &:hover {
    background: ${COLORS.goldenYellow};
    color: #000;
  }
`;

function getCardStyle(distanceFromCenter) {
  const absDist = Math.abs(distanceFromCenter);
  const scale = Math.max(0.6, 1 - absDist * 0.15);
  const opacity = Math.max(0.3, 1 - absDist * 0.25);
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
      const distance = (itemCenter - containerCenter) / (item.offsetWidth * 0.8);
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

  // Center the scroll initially
  useEffect(() => {
    if (scrollRef.current && allPhotos.length > 0) {
      const container = scrollRef.current;
      const firstItem = container.querySelector('.photo-album-card');
      if (firstItem) {
         // rough center
         container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
      }
    }
  }, [allPhotos.length]);

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
    <PageContainer>
      <GlobalStyle />
      
      <Header>
        <HeaderTitle>PHOTO_GALLERY.EXE</HeaderTitle>
        <HomeButton to="/home">
          <FaHome size={16} /> BACK
        </HomeButton>
      </Header>

      <CarouselWrapper>
        <CarouselScroll
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {allPhotos.map((item, index) => (
            <PhotoCard
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
            </PhotoCard>
          ))}
        </CarouselScroll>
      </CarouselWrapper>

      <AnimatePresence>
        {openModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <RetroWindow
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside window
            >
              <WindowHeader>
                <span>IMAGE_VIEWER.EXE</span>
                <WindowIcons>
                  <FaWindowMinimize onClick={handleCloseModal} />
                  <FaRegWindowMaximize />
                  <FaWindowClose onClick={handleCloseModal} />
                </WindowIcons>
              </WindowHeader>
              
              <WindowContent>
                {selectedImage && (
                  <>
                    <img src={selectedImage} alt="Selected from album" />
                    <JigsawButton onClick={handlePlayJigsaw}>
                      <FaPuzzlePiece /> PLAY JIGSAW
                    </JigsawButton>
                  </>
                )}
              </WindowContent>
            </RetroWindow>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
