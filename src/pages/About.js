import React, { useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button,
  Paper,
  Grid,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import { styled } from '@mui/system';
import { 
  Code as CodeIcon, 
  Brush as BrushIcon, 
  People as PeopleIcon, 
  Search as SearchIcon 
} from '@mui/icons-material';
import logo from '../logos/logo.jpg';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#BB86FC',
    },
    secondary: {
      main: '#03DAC6',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
});

const GlowingButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `radial-gradient(circle, ${theme.palette.primary.main}33 0%, transparent 70%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover::after': {
    opacity: 1,
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 10px 20px ${theme.palette.primary.main}33`,
  },
}));

export default function About() {
  useEffect(() => {
    document.title = "About Ashwin Kumar";
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <img src={logo} alt="Logo" style={{ width: 40, height: 40, marginRight: 10, borderRadius: '50%' }} />
            <Button color="inherit" href="/home">Home</Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 8, mb: 4, flexGrow: 1 }}>
          <Typography variant="h1" gutterBottom align="center" sx={{ mb: 6 }}>
            Welcome to <span style={{ color: darkTheme.palette.primary.main }}>Ashwin Kumar's</span> Portfolio
          </Typography>
          <Typography variant="h5" paragraph align="center" sx={{ mb: 8 }}>
            Hello there! I'm Ashwin Kumar, a passionate Software Developer based in Nagercoil. 
            Welcome to my creative space, where I bring ideas to life and turn concepts into captivating experiences.
          </Typography>

          <Grid container spacing={6} sx={{ mb: 8 }}>
            <Grid item xs={12} md={6}>
              <FeatureCard elevation={3}>
                <Typography variant="h4" gutterBottom>
                  Who Am I?
                </Typography>
                <Typography variant="body1">
                  I'm more than just a Software Developer. I am an ambitious individual with an insatiable curiosity 
                  and a love for Computer Science. From a young age, I've been fascinated by computers and technologies. 
                  This passion has driven me to continually explore, learn, and evolve in the ever-changing landscape of Software Development.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <FeatureCard elevation={3}>
                <Typography variant="h4" gutterBottom>
                  What I Do
                </Typography>
                <Typography variant="body1">
                  My expertise lies in Software Development. Whether it's Frontend, Backend, or Full Stack, 
                  I am dedicated to delivering top-notch results that not only meet but exceed expectations. 
                  I thrive on challenges and am always eager to take on new and exciting projects.
                </Typography>
              </FeatureCard>
            </Grid>
          </Grid>

          <Typography variant="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Why Work With Me?
          </Typography>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {[
              { icon: <BrushIcon fontSize="large" color="primary" />, title: "Creativity Unleashed", description: "I believe in the power of creativity to transform ideas into something extraordinary." },
              { icon: <PeopleIcon fontSize="large" color="primary" />, title: "Collaborative Spirit", description: "I value collaboration and believe that the best results come from working together." },
              { icon: <SearchIcon fontSize="large" color="primary" />, title: "Attention to Detail", description: "I pay meticulous attention to ensure every aspect of my work is polished and precise." },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard elevation={3}>
                  {feature.icon}
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2">
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Let's Connect!
            </Typography>
            <Typography variant="body1" paragraph>
              I'm always open to new opportunities and collaborations. If you're looking for someone who is passionate about Computer Science 
              and can bring a fresh perspective to your project, let's chat!
            </Typography>
            <GlowingButton 
              variant="contained" 
              color="primary" 
              size="large" 
              href="mailto:ashwinkumar0850@gmail.com"
              startIcon={<CodeIcon />}
            >
              Get In Touch
            </GlowingButton>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}