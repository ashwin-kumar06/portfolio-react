import React from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  LinearProgress, 
  Grid,
  Paper,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import HomeIcon from '@mui/icons-material/Home';
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
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'left',
  color: theme.palette.text.primary,
  background: theme.palette.background.paper,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 10px 20px ${theme.palette.primary.main}33`,
  },
}));

const SkillBar = ({ skill, percentage }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body1">{skill}</Typography>
        <Typography variant="body2">{percentage}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            backgroundImage: 'linear-gradient(45deg, #BB86FC, #03DAC6)',
          },
        }}
      />
    </Box>
  );
};

export default function Skill() {
  const skills = [
    { name: "HTML 5", percentage: 90 },
    { name: "CSS 3", percentage: 85 },
    { name: "React Js", percentage: 80 },
    { name: "MySQL", percentage: 80 },
    { name: ".Net C#", percentage: 60 },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <img src={logo} alt="Logo" style={{ width: 50, height: 50, marginRight: 10, borderRadius: '50%' }} />
            <IconButton color="inherit" href="/home">
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" gutterBottom align="center" sx={{ mb: 4 }}>
              My Skills
            </Typography>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6, color: 'primary.main' }}>
              Full Stack Development
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {skills.map((skill, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StyledPaper elevation={3}>
                    <SkillBar skill={skill.name} percentage={skill.percentage} />
                  </StyledPaper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}