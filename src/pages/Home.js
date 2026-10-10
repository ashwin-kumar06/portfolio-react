import React, { useEffect, useRef } from 'react';
import about from '../logos/about me.jpg';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Typed from 'typed.js';
import { FaLinkedin, FaCameraRetro, FaGithub, FaEnvelope, FaArrowRight, FaInstagram, FaLaptopCode, FaServer, FaMobileAlt, FaDatabase, FaWindowClose, FaRegWindowMaximize, FaWindowMinimize } from 'react-icons/fa';
import ChatBot from './ChatBot';
import { COLORS } from '../constant';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Shrikhand&family=VT323&family=Outfit:wght@400;600&display=swap');
  
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'VT323', monospace;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${COLORS.lightSage};
    /* Retro Grid Background */
    background-image: 
      linear-gradient(rgba(101, 124, 106, 0.4) 1px, transparent 1px),
      linear-gradient(90deg, rgba(101, 124, 106, 0.4) 1px, transparent 1px);
    background-size: 50px 50px;
    color: #000;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: ${COLORS.lightSage};
    border-left: 2px solid #000;
  }
  ::-webkit-scrollbar-thumb {
    background: ${COLORS.burntOrange}; 
    border: 2px solid #000;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${COLORS.goldenYellow}; 
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

// -- Header --
const Header = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  background: ${COLORS.lightSage};
  border-bottom: 3px solid #000;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const Logo = styled(motion.div)`
  font-family: 'Press Start 2P', monospace;
  font-size: 1.5rem;
  color: #000;
  cursor: pointer;
  text-transform: uppercase;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: 'VT323', monospace;
  color: #000;
  text-decoration: none;
  font-size: 1.5rem;
  position: relative;
  
  &:hover {
    color: ${COLORS.burntOrange};
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-offset: 4px;
  }
`;

const HeaderButton = styled.button`
  font-family: 'VT323', monospace;
  font-size: 1.2rem;
  background-color: ${props => props.primary ? COLORS.burntOrange : COLORS.lightSage};
  color: ${props => props.primary ? '#fff' : '#000'};
  border: 2px solid #000;
  padding: 0.5rem 1rem;
  cursor: pointer;
  box-shadow: 4px 4px 0px #000;
  transition: all 0.1s;
  
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

// -- Sections --
const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8rem 2rem 2rem 2rem;
  position: relative;
`;

// -- Hero --
const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 2;
  max-width: 900px;
  width: 100%;
`;

const Greeting = styled(motion.div)`
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-style: italic;
  color: #000;
  margin-bottom: 0.5rem;
`;

const Title = styled(motion.h1)`
  font-family: 'Shrikhand', cursive;
  font-size: clamp(3rem, 8vw, 7rem);
  margin: 0;
  line-height: 1.1;
  color: #311c1c;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 3px 3px 0px ${COLORS.goldenYellow}, 6px 6px 0px #000;
  
  span {
    color: ${COLORS.burntOrange};
  }
`;

const Subtitle = styled(motion.h2)`
  font-family: 'VT323', monospace;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin: 2rem 0 3rem 0;
  color: #000;
  height: 3rem;
  background: ${COLORS.goldenYellow};
  padding: 0.5rem 2rem;
  border: 2px solid #000;
  box-shadow: 4px 4px 0px #000;
  display: inline-block;
`;

const RetroWindow = styled(motion.div)`
  background: ${COLORS.goldenYellow};
  border: 3px solid #000;
  box-shadow: 8px 8px 0px #000;
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
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
    cursor: pointer;
    background: ${COLORS.lightSage};
    color: #000;
    border: 1px solid #000;
  }
`;

const WindowContent = styled.div`
  padding: 1.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const SocialDock = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const SocialIcon = styled(motion.a)`
  color: #000;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${COLORS.lightSage};
  border: 2px solid #000;
  box-shadow: 3px 3px 0px #000;
  transition: all 0.1s;
  position: relative;

  &:hover {
    background: ${COLORS.goldenYellow};
  }
  
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0px #000;
  }

  /* Tooltip */
  &::before {
    content: attr(data-tooltip);
    position: absolute;
    top: -35px;
    background: #000;
    color: #fff;
    font-size: 1rem;
    font-family: 'VT323', monospace;
    padding: 2px 8px;
    opacity: 0;
    visibility: hidden;
    white-space: nowrap;
    border: 1px solid #fff;
  }
  &:hover::before {
    opacity: 1;
    visibility: visible;
  }
`;

// -- Shared Components --
const SectionTitle = styled(motion.h2)`
  font-family: 'Shrikhand', cursive;
  font-size: 3.5rem;
  color: #000;
  margin-bottom: 3rem;
  position: relative;
  text-align: center;
  width: 100%;
  text-shadow: 2px 2px 0px #fff, 4px 4px 0px #000;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 6px;
    background: ${COLORS.burntOrange};
    margin: 1rem auto 0;
    border: 2px solid #000;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.5rem;
  background: ${COLORS.burntOrange};
  color: #fff;
  text-decoration: none;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  border: 3px solid #000;
  cursor: pointer;
  box-shadow: 5px 5px 0px #000;
  transition: all 0.1s ease;
  text-transform: uppercase;

  &:active {
    transform: translate(3px, 3px);
    box-shadow: 2px 2px 0px #000;
  }
  
  &:hover {
    background: ${COLORS.goldenYellow};
    color: #000;
  }
`;

// -- About --
const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1100px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ImageRetroContainer = styled(RetroWindow)`
  margin-top: 0;
  max-width: 450px;
  margin: 0 auto;
`;

const StyledImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border: 2px solid #000;
`;

const AboutText = styled(motion.div)`
  background: #fff;
  padding: 2rem;
  border: 3px solid #000;
  box-shadow: 8px 8px 0px #000;

  p {
    font-size: 1.5rem;
    line-height: 1.5;
    color: #000;
    margin-bottom: 1.5rem;
  }
`;

// -- Skills (Retro Folder Grid) --
const BentoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FolderCard = styled(motion.div)`
  background: ${COLORS.goldenYellow};
  border: 3px solid #000;
  box-shadow: 6px 6px 0px #000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  
  /* Folder tab effect */
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -3px;
    width: 100px;
    height: 20px;
    background: ${COLORS.goldenYellow};
    border: 3px solid #000;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
  }
  
  &:hover {
    background: #fcd581;
  }
`;

const SkillIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: #fff;
  border: 2px solid #000;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 3px 3px 0px #000;
`;

// -- Projects --
const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
`;

const ProjectCard = styled(motion.div)`
  background: #fff;
  border: 3px solid #000;
  box-shadow: 8px 8px 0px #000;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.1s;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0px #000;
  }
  
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 4px 4px 0px #000;
  }
`;

const ProjectHeader = styled.div`
  background: ${COLORS.sageGreen};
  border-bottom: 3px solid #000;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProjectTitle = styled.h3`
  font-size: 2rem;
  color: #000;
  margin: 0 0 1rem 0;
  text-decoration: underline;
  text-decoration-thickness: 2px;
`;

const ProjectDesc = styled.p`
  color: #333;
  line-height: 1.4;
  font-size: 1.4rem;
  margin: 0;
  flex-grow: 1;
`;

// -- Contact --
const ContactWrapper = styled(RetroWindow)`
  max-width: 700px;
  background: ${COLORS.lightSage};
`;

const ContactContent = styled(WindowContent)`
  background: ${COLORS.goldenYellow};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  width: 100%;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  color: #000;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: #fff;
  border: 3px solid #000;
  box-shadow: inset 3px 3px 0px rgba(0,0,0,0.2);
  color: #000;
  font-family: 'VT323', monospace;
  font-size: 1.5rem;
  transition: all 0.1s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background: #fffae6;
  }
  &::placeholder {
    color: #999;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: #fff;
  border: 3px solid #000;
  box-shadow: inset 3px 3px 0px rgba(0,0,0,0.2);
  color: #000;
  font-family: 'VT323', monospace;
  font-size: 1.5rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.1s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background: #fffae6;
  }
  &::placeholder {
    color: #999;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  color: #000;
  font-size: 1.5rem;
  border-top: 4px dashed #000;
  background: ${COLORS.sageGreen};
  color: #fff;
  margin-top: 4rem;
`;

const skills = [
  { icon: FaLaptopCode, title: "Front-end", desc: "React, JavaScript, HTML5, CSS3, Framer Motion" },
  { icon: FaServer, title: "Back-end", desc: "ASP.NET Core, C#, RESTful APIs, Node.js" },
  { icon: FaDatabase, title: "Database", desc: "SQL, MySQL, MongoDB, Database Design" },
  { icon: FaMobileAlt, title: "Mobile", desc: "React Native, Cross-platform Development" }
];

const projects = [
  { link: "/lxp", title: "Learning Experience Platform", desc: "Delivers personalized, engaging learning experiences. It supports diverse learning styles, and uses analytics to optimize outcomes." },
  { link: '/oas', title: "Online Auction System", desc: "Provides secure, efficient auctions with real-time bidding and robust analytics, ensuring transparency and user-friendly navigation." },
  { link: "/naa", title: "Nutrition Assistant Application", desc: "A web app that automatically estimates food attributes such as ingredients and nutritional value by classifying food images." }
];

export default function HomePage() {
  const typedRef = useRef(null);
  
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["a Software Engineer", "a Creative Developer", "a Problem Solver", "an Innovator"],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      cursorChar: '█',
    });
    return () => typed.destroy();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <PageContainer>
      <GlobalStyle />
      
      <Header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        <Logo>PORTFOLIO</Logo>
        <Nav>
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <NavLink key={item} href={`#${item.toLowerCase()}`}>
              {item.toLowerCase()}
            </NavLink>
          ))}
        </Nav>
        <HeaderActions>
          <HeaderButton primary>Hire Me</HeaderButton>
          <HeaderButton>Download CV</HeaderButton>
        </HeaderActions>
      </Header>

      <AnimatePresence>
        {/* HERO SECTION */}
        <Section id="home">
          <HeroContainer>
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Ashwin Kumar
            </Title>
            
            <RetroWindow
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <WindowHeader>
                <span>C:\\PORTFOLIO\\ABOUT_ME.EXE</span>
                <WindowIcons>
                  <FaWindowMinimize />
                  <FaRegWindowMaximize />
                  <FaWindowClose />
                </WindowIcons>
              </WindowHeader>
              <WindowContent>
                <Subtitle>
                  I'm <span ref={typedRef}></span>
                </Subtitle>
                
                <SocialDock
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { icon: FaGithub, name: 'GitHub', href: 'https://github.com/ashwin-kumar06' },
                    { icon: FaLinkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/in/ashwin-kumar-7a6a7b23a/' },
                    { icon: FaInstagram, name: 'Instagram', href: 'https://www.instagram.com/be_artivist/' },
                    { icon: FaEnvelope, name: 'My Books', href: '/books' },
                    { icon: FaCameraRetro, name: 'Photo Lab', href: '/photo' },
                  ].map((item, i) => (
                    <SocialIcon
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-tooltip={item.name}
                      variants={fadeInUp}
                    >
                      <item.icon />
                    </SocialIcon>
                  ))}
                </SocialDock>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                   <PrimaryButton href="#projects">View Projects</PrimaryButton>
                   <PrimaryButton href="#skills" style={{ background: COLORS.lightSage, color: '#000' }}>My Lab</PrimaryButton>
                </div>
              </WindowContent>
            </RetroWindow>

          </HeroContainer>
          <ChatBot />
        </Section>

        {/* ABOUT SECTION */}
        <Section id="about">
          <SectionTitle
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          >
            ABOUT ME
          </SectionTitle>
          <AboutGrid>
            <ImageRetroContainer
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <WindowHeader>
                <span>IMAGE_VIEWER.EXE</span>
                <WindowIcons>
                  <FaWindowClose />
                </WindowIcons>
              </WindowHeader>
              <WindowContent style={{ padding: '1rem' }}>
                <StyledImage src={about} alt="Ashwin Kumar" />
              </WindowContent>
            </ImageRetroContainer>
            
            <AboutText
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <p>
                Hello! I'm Ashwin Kumar, a passionate software engineer with a drive for creating innovative and elegant solutions. My journey in tech began with a fascination for how things work, leading me to deeply explore Computer Science.
              </p>
              <p>
                I specialize in full-stack development, with a particular focus on building scalable, performant, and beautifully designed web applications. When I'm not coding, I'm exploring new technologies, contributing to projects, or sharing knowledge.
              </p>
              <PrimaryButton href="/about">
                More About Me <FaArrowRight />
              </PrimaryButton>
            </AboutText>
          </AboutGrid>
        </Section>

        {/* SKILLS SECTION */}
        <Section id="skills">
          <SectionTitle
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            MY EXPERTISE
          </SectionTitle>
          <BentoGrid
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {skills.map((skill, index) => (
              <FolderCard key={index} variants={fadeInUp}>
                <SkillIconWrapper>
                  <skill.icon />
                </SkillIconWrapper>
                <div>
                  <h3 style={{ color: '#000', fontFamily: "'Press Start 2P', monospace", fontSize: '1rem', margin: '1rem 0 0.5rem 0' }}>{skill.title}</h3>
                  <p style={{ color: '#333', margin: 0, fontSize: '1.4rem', lineHeight: 1.2 }}>{skill.desc}</p>
                </div>
              </FolderCard>
            ))}
          </BentoGrid>
          <PrimaryButton href="/skill">
            View Full Skillset <FaArrowRight />
          </PrimaryButton>
        </Section>

        {/* PROJECTS SECTION */}
        <Section id="projects">
          <SectionTitle
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            FEATURED PROJECTS
          </SectionTitle>
          <ProjectsContainer>
            {projects.map((project, index) => (
              <ProjectCard
                as={Link}
                to={project.link}
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectHeader>
                  <FaWindowClose />
                  <span>{project.title.substring(0, 15).toUpperCase()}...</span>
                </ProjectHeader>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDesc>{project.desc}</ProjectDesc>
                  <div style={{ marginTop: '1.5rem', color: COLORS.burntOrange, display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Press Start 2P', monospace", fontSize: '0.8rem' }}>
                    View Project <FaArrowRight size={14} />
                  </div>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsContainer>
        </Section>

        {/* CONTACT SECTION */}
        <Section id="contact">
          <SectionTitle
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            GET IN TOUCH
          </SectionTitle>
          <ContactWrapper
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <WindowHeader>
              <span>CONTACT_FORM.EXE</span>
              <WindowIcons>
                <FaWindowMinimize />
                <FaRegWindowMaximize />
                <FaWindowClose />
              </WindowIcons>
            </WindowHeader>
            <ContactContent>
              <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
                <FormGroup>
                  <Label>NAME:</Label>
                  <StyledInput type="text" placeholder="Enter your name..." required />
                </FormGroup>
                <FormGroup>
                  <Label>EMAIL:</Label>
                  <StyledInput type="email" placeholder="Enter your email..." required />
                </FormGroup>
                <FormGroup>
                  <Label>MESSAGE:</Label>
                  <StyledTextarea placeholder="Type your message here..." required />
                </FormGroup>
                <PrimaryButton as="button" type="submit" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}>
                  SEND MESSAGE
                </PrimaryButton>
              </form>
            </ContactContent>
          </ContactWrapper>
        </Section>
      </AnimatePresence>

      <Footer>
        <p>&copy; {new Date().getFullYear()} Ashwin Kumar. Crafted with passion & retro vibes.</p>
      </Footer>
    </PageContainer>
  );
}