import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaWindowMinimize, FaRegWindowMaximize, FaWindowClose, FaCheckSquare } from 'react-icons/fa';
import auction1 from '../../logos/oas 1.jpg';
import auction2 from '../../logos/oas 2.jpg';
import auction3 from '../../logos/oas 3.jpg';
import auction4 from '../../logos/oas 4.jpg';
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

export default function OnlineAuctionSystem() {
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
        <SectionTitle>Online Auction System</SectionTitle>
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
          <StyledImage src={auction1} alt="Online Auction System Overview" />
          <ContentText>
            <h4>Project Overview</h4>
            <p>
              The Online Auction System is a comprehensive platform designed to provide secure, efficient auctions with real-time bidding and robust analytics. It ensures transparency and user-friendly navigation for all participants in the auction process.
            </p>
            <h5>Key Features:</h5>
            <RetroList>
              {['Real-time bidding', 'Secure transactions', 'User-friendly interface', 'Robust analytics', 'Transparent auction process'].map((feature, index) => (
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
              This project was built using a modern tech stack to ensure scalability, performance, and maintainability:
            </p>
            <RetroList>
              <li><FaCheckSquare style={{ color: COLORS.goldenYellow }} /> Backend: C# ASP.NET Core 7 Framework</li>
              <li><FaCheckSquare style={{ color: COLORS.goldenYellow }} /> Frontend: React.js</li>
              <li><FaCheckSquare style={{ color: COLORS.goldenYellow }} /> Database: MySQL with Entity Framework</li>
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
          <span>REAL_TIME_BIDDING.EXE</span>
          <WindowIcons>
            <FaWindowMinimize />
            <FaRegWindowMaximize />
            <FaWindowClose />
          </WindowIcons>
        </WindowHeader>
        <WindowContent>
          <ContentText>
            <h4>Real-Time Bidding System</h4>
            <p>
              Our Online Auction System features a state-of-the-art real-time bidding mechanism. This ensures that all participants have fair and equal access to the latest bid information, creating a dynamic and exciting auction environment.
            </p>
            <RetroList>
              <li><FaCheckSquare /> Instant bid updates</li>
              <li><FaCheckSquare /> Automated outbid notifications</li>
              <li><FaCheckSquare /> Live auction countdown timers</li>
            </RetroList>
          </ContentText>
          <StyledImage src={auction4} alt="Real-Time Bidding Interface" />
        </WindowContent>
      </RetroWindow>

      <RetroWindow
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <WindowHeader>
          <span>SECURE_TRANSACTIONS.EXE</span>
          <WindowIcons>
            <FaWindowMinimize />
            <FaRegWindowMaximize />
            <FaWindowClose />
          </WindowIcons>
        </WindowHeader>
        <WindowContent>
          <StyledImage src={auction3} alt="Secure Transaction System" />
          <ContentText>
            <h4>Secure Transaction System</h4>
            <p>
              Security is paramount in our Online Auction System. We've implemented robust measures to ensure that all transactions are secure, protecting both buyers and sellers throughout the auction process.
            </p>
            <RetroList>
              <li><FaCheckSquare /> Encrypted data transmission</li>
              <li><FaCheckSquare /> Secure payment gateways</li>
              <li><FaCheckSquare /> User authentication and authorization</li>
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
          <span>ANALYTICS_DASHBOARD.EXE</span>
          <WindowIcons>
            <FaWindowMinimize />
            <FaRegWindowMaximize />
            <FaWindowClose />
          </WindowIcons>
        </WindowHeader>
        <WindowContent>
          <ContentText>
            <h4>Analytics Dashboard</h4>
            <p>
              Our comprehensive analytics dashboard provides deep insights into auction performance, user behavior, and market trends. This data-driven approach allows auctioneers to optimize their strategies and users to make informed decisions.
            </p>
            <RetroList>
              <li><FaCheckSquare /> Real-time auction statistics</li>
              <li><FaCheckSquare /> User engagement metrics</li>
              <li><FaCheckSquare /> Market trend analysis</li>
            </RetroList>
          </ContentText>
          <StyledImage src={auction2} alt="Analytics Dashboard" />
        </WindowContent>
      </RetroWindow>

    </PageContainer>
  );
}