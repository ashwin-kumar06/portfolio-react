import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { FaLinkedin, FaCameraRetro, FaGithub, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import ChatBot from './ChatBot';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HexagonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const HexagonButton = styled(motion.a)`
  width: 120px;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #ffffff;
  font-size: 2rem;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 188, 212, 0.3);
    color: #00bcd4;
  }
`;

const ButtonName = styled.span`
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const PageContainer = styled.div`
  background: linear-gradient(45deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  color: #ffffff;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(15, 12, 41, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #00bcd4;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #00bcd4;
  }
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #00bcd4;
 
`;

const SectionContent = styled.p`
  margin-bottom: 1rem;
  
  line-height: 1.6;
  
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;


const SummarySection = styled.div`
  margin-top: 3rem;
  text-align: left;
`;

const NavButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #00bcd4;
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #008ba3;
  }

  svg {
    margin-left: 0.5rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const ProjectCard = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectInfo = styled.div`
  padding: 1rem;
`;

const ProjectTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #00bcd4;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #008ba3;
  }
`;

const Footer = styled.footer`
  background-color: rgba(15, 12, 41, 0.8);
  padding: 1rem;
  text-align: center;
`;

export default function HomePage() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["a Trainee Software Engineer", "a Developer", "a Problem Solver", "an Innovator"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <PageContainer>
      <Header>
        <Logo>AK</Logo>
        <Nav>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/skill">Skills</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="/photo">Photo Lab</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </Nav>
      </Header>

      <Section>

        <Section id="home">
          <HeroContent>
            <Title>Hi, I'm Ashwin Kumar</Title>
            <Subtitle>I'm <span ref={typedRef}></span></Subtitle>
            <HexagonContainer>
              <HexagonButton href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaGithub />
                <ButtonName>GitHub</ButtonName>
              </HexagonButton>
              <HexagonButton href="https://www.linkedin.com/in/ashwin-kumar-7a6a7b23a/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaLinkedin />
                <ButtonName>LinkedIn</ButtonName>
              </HexagonButton>
              <HexagonButton href="mailto:youremail@example.com" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaEnvelope />
                <ButtonName>Email</ButtonName>
              </HexagonButton>
              <HexagonButton href="/photo" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaCameraRetro />
                <ButtonName>Photo Lab</ButtonName>
              </HexagonButton>
            </HexagonContainer>
          </HeroContent>
        </Section>

        <ChatBot/>
      <script src="script.js"></script>

        <SummarySection>
          <SectionTitle>About Me</SectionTitle>
          <SectionContent>
            I'm a passionate software engineer with a keen interest in creating innovative solutions.
            My journey in tech started with a curiosity about how things work, which led me to pursue
            a career in software development.
          </SectionContent>
          <NavButton href="/about" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Learn More <FaArrowRight />
          </NavButton>
        </SummarySection>

        <SummarySection>
          <SectionTitle>Skills</SectionTitle>
          <SectionContent>
            Proficient in JavaScript, React, Node.js, and Python. Experienced in building responsive
            web applications and RESTful APIs. Constantly learning and adapting to new technologies.
          </SectionContent>
          <NavButton href="/skill" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            View All Skills <FaArrowRight />
          </NavButton>
        </SummarySection>
      </Section>
              
      <Section id="projects">
        <h2>Projects</h2>
        <ProjectsGrid>
          <ProjectCard whileHover={{ scale: 1.05 }} onClick={{}} style={{cursor:'pointer'}}>
            <ProjectInfo>
              <ProjectTitle>Learning Experience Platform</ProjectTitle>
              <ProjectDescription>Learning Experience Platform (LXP) delivers personalized,
                engaging learning experiences. It supports diverse learning
                styles, and uses analytics to optimize outcomes for corporate
                training, professional development, and education.</ProjectDescription>
            </ProjectInfo>
          </ProjectCard>
          <ProjectCard whileHover={{ scale: 1.05 }} onClick={{}} style={{cursor:'pointer'}}>
            <ProjectInfo>
              <ProjectTitle>Online Auction System</ProjectTitle>
              <ProjectDescription>Online Auction System provides secure, efficient auctions
                with real-time bidding and robust analytics, ensuring
                transparency and user-friendly navigation for all</ProjectDescription>
            </ProjectInfo>
          </ProjectCard>
          <ProjectCard whileHover={{ scale: 1.05 }} onClick={{}} style={{cursor:'pointer'}}>
            <ProjectInfo>
              <ProjectTitle>Nutrition Assistant Application</ProjectTitle>
              <ProjectDescription>This project aims at building a web app that
                automatically estimates food attributes such as
                ingredients and nutritional value by classifying the input
                image of the food</ProjectDescription>
            </ProjectInfo>
          </ProjectCard>
        </ProjectsGrid>
      </Section>
                  
      <Section id="contact">
        <h2>Contact Me</h2>
        <ContactForm>
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <TextArea placeholder="Your Message" rows="5" required />
          <SubmitButton type="submit">Send Message</SubmitButton>
        </ContactForm>
      </Section>

      <Footer>
        <p>&copy; 2024 Ashwin Kumar. All rights reserved.</p>
      </Footer>
    </PageContainer>
  );
}
