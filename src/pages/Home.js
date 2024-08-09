import React, { useEffect, useRef } from 'react';
import about from '../logos/about me.jpg'
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Typed from 'typed.js';
import { FaLinkedin, FaCameraRetro, FaGithub, FaEnvelope, FaArrowRight, FaInstagram, FaLaptopCode, FaServer, FaMobileAlt, FaDatabase } from 'react-icons/fa';
import ChatBot from './ChatBot';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&display=swap');
  
  body {
    font-family: 'Raleway', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #1E1E1E;
    color: #C8ACD6;
  }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PageContainer = styled.div`
  margin-top: 80px;
  background-color: #1E1E1E;
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const Header = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(23, 21, 59, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const Logo = styled(motion.h1)`
  font-size: 2rem;
  color: #C8ACD6;
  font-weight: 600;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(motion.a)`
  color: #C8ACD6;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #433D8B;
  }
`;

const Section = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #C8ACD6;
`;

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #433D8B;
`;

const HexagonContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;
`;

const HexagonButton = styled(motion.a)`
  width: 130px;
  height: 130px;
  background-color: rgba(46, 35, 108, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #C8ACD6;
  font-size: 2.5rem;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(67, 61, 139, 0.8);
    color: #C8ACD6;
  }
`;

const ButtonName = styled.span`
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const SectionTitle = styled(motion.h3)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #433D8B;
`;

const SectionContent = styled(motion.p)`
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.2rem;
  color: #C8ACD6;
`;

const SummarySection = styled(motion.div)`
  margin-top: 4rem;
  text-align: left;
`;

const NavButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background-color: #2E236C;
  color: #C8ACD6;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #433D8B;
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(67, 61, 139, 0.3);
  }

  svg {
    margin-left: 0.8rem;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;
`;

const ProjectCard = styled(motion.div)`
  background-color: rgba(46, 35, 108, 0.3);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(67, 61, 139, 0.2);
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: #433D8B;
`;

const ProjectDescription = styled.p`
  font-size: 1.1rem;
  color: #C8ACD6;
  line-height: 1.6;
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
`;

const Input = styled(motion.input)`
  padding: 1rem;
  border-radius: 30px;
  border: none;
  background-color: rgba(46, 35, 108, 0.3);
  color: #C8ACD6;
  font-size: 1.1rem;

  &::placeholder {
    color: rgba(200, 172, 214, 0.7);
  }
`;

const TextArea = styled(motion.textarea)`
  padding: 1rem;
  border-radius: 20px;
  border: none;
  background-color: rgba(46, 35, 108, 0.3);
  color: #C8ACD6;
  font-size: 1.1rem;
  resize: vertical;

  &::placeholder {
    color: rgba(200, 172, 214, 0.7);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  border-radius: 30px;
  border: none;
  background-color: #2E236C;
  color: #C8ACD6;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #433D8B;
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(67, 61, 139, 0.3);
  }
`;

const Footer = styled(motion.footer)`
  background-color: rgba(23, 21, 59, 0.8);
  padding: 2rem;
  text-align: center;
  color: #C8ACD6;
  font-size: 1.1rem;
`;

const SkillsChart = styled(motion.div)`
  width: 100%;
  height: 300px;
  margin-top: 2rem;
`;

const AboutContent = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const AboutText = styled(motion.div)`
  flex: 1;
  min-width: 300px;
`;

const AboutImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  border-radius: 15px;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SkillCard = styled(motion.div)`
  background-color: rgba(46, 35, 108, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(67, 61, 139, 0.5);
    transform: translateY(-5px);
  }
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  color: #C8ACD6;
  margin-bottom: 1rem;
`;

const SkillTitle = styled.h4`
  color: #C8ACD6;
  margin-bottom: 0.5rem;
`;

const SkillDescription = styled.p`
  color: #A89EC2;
  font-size: 0.9rem;
`;


export default function HomePage() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["a Junior Software Engineer", "a Developer", "a Problem Solver", "an Innovator"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <PageContainer>
      <GlobalStyle />
      <Header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 120 }}>
        <Logo initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>AK</Logo>
        <Nav>
          {['About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
            <NavLink
              key={item}
              href={`#${item.toLowerCase().replace(' ', '')}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </NavLink>
          ))}
        </Nav>
      </Header>

      <AnimatePresence>
        <Section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroContent>
            <Title
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              Hi, I'm Ashwin Kumar
            </Title>
            <Subtitle
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            >
              I'm <span ref={typedRef}></span>
            </Subtitle>
            <HexagonContainer
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
            >
              {[
                { icon: FaGithub, name: 'GitHub', href: 'https://github.com/ashwin-kumar06' },
                { icon: FaLinkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/in/ashwin-kumar-7a6a7b23a/' },
                { icon: FaInstagram, name: 'Instagram', href: 'https://www.instagram.com/be_artivist/' },
                { icon: FaEnvelope, name: 'Email', href: 'mailto:ashwinkumar0850@gmail.com' },
                { icon: FaCameraRetro, name: 'Photo Lab', href: '/photo' },
              ].map((item, index) => (
                <HexagonButton
                  key={item.name}
                  href={item.href}
                  target={"_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                >
                  <item.icon />
                  <ButtonName>{item.name}</ButtonName>
                </HexagonButton>
              ))}
            </HexagonContainer>
          </HeroContent>
          <ChatBot />
        </Section>

        <Section
          id="about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <SummarySection
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.6 }}
          >
            <SectionTitle>About Me</SectionTitle>
            <AboutContent>
              <AboutText>
                <SectionContent>
                  Hello! I'm Ashwin Kumar, a passionate junior software engineer with a drive for creating innovative solutions.
                  My journey in tech began with a fascination for how things work, which led me to pursue a degree in Computer Science.
                </SectionContent>
                <SectionContent>
                  I specialize in full-stack development, with a particular interest in building scalable web applications.
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and tech meetups.
                </SectionContent>
                <SectionContent>
                  I believe in the power of technology to solve real-world problems and am always excited to take on new challenges that push my skills to the next level.
                </SectionContent>
              </AboutText>
              <AboutImage
                src={about}
                alt="Ashwin Kumar"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              />
            </AboutContent>
            <NavButton
              href="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More <FaArrowRight />
            </NavButton>
          </SummarySection>
        </Section>

        <Section
          id="skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SummarySection
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.8 }}
          >
            <SectionTitle>Skills</SectionTitle>
            <SectionContent>
              As a full-stack developer, I've honed a diverse set of skills that allow me to build complete, scalable web applications. Here's an overview of my technical expertise:
            </SectionContent>
            <SkillsGrid>
              <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <SkillIcon><FaLaptopCode /></SkillIcon>
                <SkillTitle>Front-end Development</SkillTitle>
                <SkillDescription>Proficient in React js, JavaScript, HTML5, and CSS3. Experienced in building responsive and intuitive user interfaces.</SkillDescription>
              </SkillCard>
              <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <SkillIcon><FaServer /></SkillIcon>
                <SkillTitle>Back-end Development</SkillTitle>
                <SkillDescription>Skilled in Asp .Net Core and C#. Capable of designing and implementing RESTful APIs and server-side logic.</SkillDescription>
              </SkillCard>
              <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <SkillIcon><FaDatabase /></SkillIcon>
                <SkillTitle>Database Management</SkillTitle>
                <SkillDescription>Experienced with SQL and MySQL databases. Proficient in database design and optimization.</SkillDescription>
              </SkillCard>
              <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <SkillIcon><FaMobileAlt /></SkillIcon>
                <SkillTitle>Mobile Development</SkillTitle>
                <SkillDescription>Familiar with React Native for cross-platform mobile app development. Passionate about creating seamless mobile experiences.</SkillDescription>
              </SkillCard>
            </SkillsGrid>
            <SectionContent style={{ marginTop: '2rem' }}>
              I'm always eager to learn and adapt to new technologies, keeping myself updated with the latest trends in software development.
            </SectionContent>
            <NavButton
              href="/skill"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Skills <FaArrowRight />
            </NavButton>
          </SummarySection>
        </Section>

        <Section
          id="projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>Projects</SectionTitle>
          <ProjectsGrid>
            {[
              {
                link: "/lxp",
                title: "Learning Experience Platform",
                description: "Learning Experience Platform (LXP) delivers personalized, engaging learning experiences. It supports diverse learning styles, and uses analytics to optimize outcomes for corporate training, professional development, and education."
              },
              {
                link: '/oas',
                title: "Online Auction System",
                description: "Online Auction System provides secure, efficient auctions with real-time bidding and robust analytics, ensuring transparency and user-friendly navigation for all"
              },
              {
                link: "/naa",
                title: "Nutrition Assistant Application",
                description: "This project aims at building a web app that automatically estimates food attributes such as ingredients and nutritional value by classifying the input image of the food"
              }
            ].map((project, index) => (
              <ProjectCard
                as={Link}
                style={{textDecoration:'none'}}
                to={project.link}
                key={project.title}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ProjectInfo>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                </ProjectInfo>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </Section>

        <Section
          id="contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>Contact Me</SectionTitle>
          <ContactForm
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          >
            <Input
              type="text"
              placeholder="Your Name"
              required
              whileFocus={{ scale: 1.05 }}
            />
            <Input
              type="email"
              placeholder="Your Email"
              required
              whileFocus={{ scale: 1.05 }}
            />
            <TextArea
              placeholder="Your Message"
              rows="5"
              required
              whileFocus={{ scale: 1.05 }}
            />
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </SubmitButton>
          </ContactForm>
        </Section>

        <Footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>&copy; 2024 Ashwin Kumar. All rights reserved.</p>
        </Footer>
      </AnimatePresence>
    </PageContainer>
  );
}