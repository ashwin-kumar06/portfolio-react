import React, { useEffect, useState } from 'react';
import loadingBot from '../logos/loadingBot.gif';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { COLORS } from '../constant';
import { FaWindowMinimize, FaRegWindowMaximize, FaWindowClose } from 'react-icons/fa';

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

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const RetroWindow = styled.div`
  background: #fff;
  border: 4px solid #000;
  box-shadow: 12px 12px 0px rgba(0,0,0,0.8);
  width: 90%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
`;

const WindowHeader = styled.div`
  background: ${COLORS.sageGreen};
  border-bottom: 4px solid #000;
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
    border: 2px solid #000;
    padding: 2px;
  }
`;

const WindowContent = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${COLORS.lightSage};
  border-top: 2px solid #fff;
`;

const LoadingImage = styled.img`
  width: 200px;
  border: 4px solid #000;
  box-shadow: 6px 6px 0px #000;
  background: #fff;
  margin-bottom: 2.5rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 30px;
  background-color: #fff;
  border: 4px solid #000;
  box-shadow: inset 4px 4px 0px rgba(0,0,0,0.2), 6px 6px 0px #000;
  position: relative;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: ${COLORS.goldenYellow};
  border-right: 4px solid #000;
  transition: width 0.1s linear;
`;

const ProgressText = styled.div`
  color: #000;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  text-shadow: 1px 1px 0px #fff;
`;

const ProgressBar = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await fetch('/pages/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();

    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(intervalId);
          setTimeout(() => {
            navigate('/home');
          }, 1000);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <ProgressContainer>
      <GlobalStyle />
      <RetroWindow>
        <WindowHeader>
          <span>SYSTEM_BOOT.EXE</span>
          <WindowIcons>
            <FaWindowMinimize />
            <FaRegWindowMaximize />
            <FaWindowClose />
          </WindowIcons>
        </WindowHeader>
        <WindowContent>
          <LoadingImage src={loadingBot} alt="Loading..." />
          <ProgressBarContainer>
            <ProgressBarFill style={{ width: `${progress}%` }} />
          </ProgressBarContainer>
          <ProgressText>{progress < 100 ? `LOADING SYSTEM FILES... ${progress}%` : 'BOOT COMPLETE. REDIRECTING...'}</ProgressText>
        </WindowContent>
      </RetroWindow>
    </ProgressContainer>
  );
};

export default ProgressBar;