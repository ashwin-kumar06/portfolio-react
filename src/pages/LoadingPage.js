import React, { useEffect, useState } from 'react';
import loadingBot from '../logos/loadingBot.gif';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  // We'll use the existing background from your CSS
`;

const LoadingImage = styled.img`
  width: 300px;
  animation: ${fadeIn} 1s ease-in;
`;

const ProgressBarContainer = styled.div`
  width: 300px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #af35fa, #c300ff);
  transition: width 0.5s ease-out;
`;

const ProgressText = styled.div`
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
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
      <LoadingImage src={loadingBot} alt="Loading..." />
      <ProgressBarContainer>
        <ProgressBarFill style={{ width: `${progress}%` }} />
      </ProgressBarContainer>
      <ProgressText>{`Loading... ${progress}%`}</ProgressText>
    </ProgressContainer>
  );
};

export default ProgressBar;