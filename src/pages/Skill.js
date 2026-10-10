import React from "react";
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from "framer-motion";
import { FaHome, FaWindowMinimize, FaRegWindowMaximize, FaWindowClose } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
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
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
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
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 2px 2px 0px #fff, 4px 4px 0px #000;
  text-transform: uppercase;
`;

const SubTitle = styled(motion.h3)`
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  color: ${COLORS.burntOrange};
  margin-bottom: 3rem;
  text-align: center;
  background: #fff;
  padding: 0.5rem 1rem;
  border: 2px solid #000;
  box-shadow: 4px 4px 0px #000;
  display: inline-block;
`;

const RetroWindow = styled(motion.div)`
  background: #fff;
  border: 3px solid #000;
  box-shadow: 10px 10px 0px #000;
  width: 100%;
  max-width: 1000px;
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
  }
`;

const ChartContainer = styled.div`
  padding: 2rem;
  background: ${COLORS.goldenYellow};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
`;

const SkillCard = styled(motion.div)`
  background: #fff;
  border: 3px solid #000;
  box-shadow: 6px 6px 0px #000;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.1s;
  
  &:hover {
    background: ${COLORS.lightSage};
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px #000;
  }
`;

const SkillName = styled.div`
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  color: #000;
`;

const SkillLevel = styled.div`
  font-family: 'VT323', monospace;
  font-size: 2rem;
  color: ${COLORS.burntOrange};
  font-weight: bold;
`;

const TooltipContainer = styled.div`
  background: #fff;
  border: 3px solid #000;
  padding: 0.5rem;
  font-family: 'VT323', monospace;
  font-size: 1.5rem;
  box-shadow: 4px 4px 0px #000;
  color: #000;
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        {`${label}: ${payload[0].value}%`}
      </TooltipContainer>
    );
  }
  return null;
};

const skillsData = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'HTML 5', level: 90 },
  { name: 'CSS 3', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'MySQL', level: 80 },
  { name: 'Python', level: 75 },
  { name: '.Net C#', level: 60 },
];

export default function Skill() {
  const colors = [
    COLORS.burntOrange,
    COLORS.goldenYellow,
    COLORS.sageGreen,
    COLORS.lightSage,
    '#D46A2A',
    '#E89C35',
    '#4E6353',
    '#8FA895'
  ];

  return (
    <PageContainer>
      <GlobalStyle />
      
      <Header>
        <HomeButton to="/home">
          <FaHome size={18} /> BACK_TO_HOME.EXE
        </HomeButton>
      </Header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <SectionTitle>MY SKILLS</SectionTitle>
        <SubTitle>FULL STACK DEVELOPMENT</SubTitle>
      </motion.div>

      <RetroWindow
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <WindowHeader>
          <span>SKILLS_CHART.EXE</span>
          <WindowIcons>
            <FaWindowMinimize />
            <FaRegWindowMaximize />
            <FaWindowClose />
          </WindowIcons>
        </WindowHeader>
        <ChartContainer>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={skillsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#000" tick={{fontFamily: "'VT323', monospace", fontSize: '1.2rem', fill: '#000'}} />
                <YAxis dataKey="name" type="category" width={100} stroke="#000" tick={{fontFamily: "'VT323', monospace", fontSize: '1.2rem', fill: '#000'}} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(0,0,0,0.1)'}} />
                <Bar dataKey="level">
                  {skillsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="#000" strokeWidth={2} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </RetroWindow>

      <SkillsGrid>
        {skillsData.map((skill, index) => (
          <SkillCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <SkillName>{skill.name}</SkillName>
            <SkillLevel>{`${skill.level}%`}</SkillLevel>
          </SkillCard>
        ))}
      </SkillsGrid>

    </PageContainer>
  );
}