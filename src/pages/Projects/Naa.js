import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaWindowMinimize, FaRegWindowMaximize, FaWindowClose, FaCheckSquare } from 'react-icons/fa';
import nutrition1 from '../../logos/naa 1.png';
import nutrition2 from '../../logos/naa 2.png';
import nutrition3 from '../../logos/naa 3.png';
import nutrition4 from '../../logos/naa 4.png';
import { COLORS } from '../../constant';

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
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderArea = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${COLORS.goldenYellow};
  color: #000;
  text-decoration: none;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  transition: all 0.1s ease;
  align-self: flex-start;
  margin-bottom: 2rem;

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
  
  &:hover {
    background: ${COLORS.burntOrange};
    color: #fff;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Shrikhand', cursive;
  font-size: 3.5rem;
  color: #000;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 0px #fff, 4px 4px 0px #000;
  text-transform: uppercase;
  line-height: 1.2;
`;

const RetroWindow = styled(motion.div)`
  background: #fff;
  border: 3px solid #000;
  box-shadow: 10px 10px 0px #000;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
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
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  
  h4 {
    font-family: 'Press Start 2P', monospace;
    font-size: 1.2rem;
    color: ${COLORS.burntOrange};
    margin-top: 0;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  h5 {
    font-family: 'Press Start 2P', monospace;
    font-size: 1rem;
    color: #000;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.5rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;

const RetroList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  
  li {
    font-size: 1.5rem;
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    margin-bottom: 0.8rem;
    
    svg {
      margin-top: 4px;
      color: ${COLORS.burntOrange};
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border: 3px solid #000;
  box-shadow: 6px 6px 0px #000;
`;

export default function NutritionAssistantApplication() {
  return (
    <PageContainer>
      <GlobalStyle />
      <HeaderArea
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackButton to="/home">
          <FaArrowLeft /> BACK_TO_HOME.EXE
        </BackButton>
        <SectionTitle>Nutrition Assistant Application</SectionTitle>
      </HeaderArea>

      <RetroWindow
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <WindowHeader>
          <span>PROJECT_OVERVIEW.EXE</span>
          <WindowIcons>
            <FaWindowMinimize />
            <FaRegWindowMaximize />
            <FaWindowClose />
          </WindowIcons>
        </WindowHeader>
        <WindowContent>
          <StyledImage src={nutrition3} alt="Nutrition Assistant Application Overview" />
          <ContentText>
            <h4>Project Overview</h4>
            <p>
              The Nutrition Assistant Application is an innovative web app that automatically estimates food attributes such as ingredients and nutritional value by classifying input images of food. This project aims to make nutritional information easily accessible and promote healthier eating habits.
            </p>
            <h5>Key Features:</h5>
            <RetroList>
              {['Image-based food recognition', 'Automatic ingredient identification', 'Nutritional value estimation', 'User-friendly interface', 'Comprehensive food database'].map((feature, index) => (
                <li key={index}>
                  <FaCheckSquare /> {feature}
                </li>
              ))}
            </RetroList>
          </ContentText>
        </WindowContent>
        <WindowContent style={{ borderTop: '3px dashed #000', gridTemplateColumns: '1fr' }}>
          <ContentText>
            <h4>Technical Details</h4>
            <p>
              This project leverages cutting-edge technologies in image processing and machine learning:
            </p>
            <RetroList>
              <li><FaCheckSquare style={{ color: COLORS.goldenYellow }} /> Frontend: React.js for a responsive and interactive user interface</li>
              <li><FaCheckSquare style={{ color: COLORS.goldenYellow }} /> Backend: Python with Flask for efficient image processing and API endpoints</li>
              <li><FaCheckSquare style={{ color: COLORS.goldenYellow }} /> Machine Learning: TensorFlow for image classification and food recognition</li>
            </RetroList>
          </ContentText>
        </WindowContent>
      </RetroWindow>

      <RetroWindow
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <WindowHeader>
          <span>IMAGE_RECOGNITION.EXE</span>
          <WindowIcons>
            <FaWindowMinimize />
            <FaRegWindowMaximize />
            <FaWindowClose />
          </WindowIcons>
        </WindowHeader>
        <WindowContent>
          <ContentText>
            <h4>Image Recognition Technology</h4>
            <p>
              Our Nutrition Assistant utilizes state-of-the-art image recognition technology to accurately identify food items from user-uploaded images. This forms the foundation of our nutritional analysis system.
            </p>
            <RetroList>
              <li><FaCheckSquare /> Deep learning models for image classification</li>
              <li><FaCheckSquare /> High accuracy in diverse food recognition</li>
              <li><FaCheckSquare /> Continuous model improvement through user feedback</li>
            </RetroList>
          </ContentText>
          <StyledImage src={nutrition2} alt="Image Recognition Technology" />
        </WindowContent>
      </RetroWindow>

      <RetroWindow
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <WindowHeader>
          <span>NUTRITIONAL_ANALYSIS.EXE</span>
          <WindowIcons>
            <FaWindowMinimize />
            <FaRegWindowMaximize />
            <FaWindowClose />
          </WindowIcons>
        </WindowHeader>
        <WindowContent>
          <StyledImage src={nutrition4} alt="Nutritional Analysis System" />
          <ContentText>
            <h4>Nutritional Analysis System</h4>
            <p>
              Once a food item is identified, our sophisticated nutritional analysis system provides comprehensive information about its nutritional content, helping users make informed dietary choices.
            </p>
            <RetroList>
              <li><FaCheckSquare /> Detailed breakdown of macronutrients and micronutrients</li>
              <li><FaCheckSquare /> Calorie estimation based on portion size</li>
              <li><FaCheckSquare /> Allergen and dietary restriction alerts</li>
            </RetroList>
          </ContentText>
        </WindowContent>
      </RetroWindow>

      <RetroWindow
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <WindowHeader>
          <span>UI_UX.EXE</span>
          <WindowIcons>
            <FaWindowMinimize />
            <FaRegWindowMaximize />
            <FaWindowClose />
          </WindowIcons>
        </WindowHeader>
        <WindowContent>
          <ContentText>
            <h4>User Experience and Interface</h4>
            <p>
              Our Nutrition Assistant Application features an intuitive and user-friendly interface, making it easy for users to upload food images and receive instant nutritional information.
            </p>
            <RetroList>
              <li><FaCheckSquare /> Clean and responsive design</li>
              <li><FaCheckSquare /> Simple image upload process</li>
              <li><FaCheckSquare /> Clear presentation of nutritional data</li>
            </RetroList>
          </ContentText>
          <StyledImage src={nutrition1} alt="User Interface" />
        </WindowContent>
      </RetroWindow>

    </PageContainer>
  );
}