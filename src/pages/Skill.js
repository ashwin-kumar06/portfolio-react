import React from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Section = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const SkillsContainer = styled(Grid)`
  margin-top: 2rem;
`;

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

const SkillCard = styled(motion(Paper))(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  background: theme.palette.background.paper,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 10px 20px ${theme.palette.primary.main}33`,
  },
}));

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="body2">{`${label} : ${payload[0].value}%`}</Typography>
      </Paper>
    );
  }
  return null;
};

export default function Skill() {
  const colors = ['#BB86FC', '#03DAC6', '#CF6679', '#4CAF50', '#FFC107', '#2196F3', '#9C27B0', '#F44336'];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <img src={logo} alt="Logo" style={{ width: 50, height: 50, marginRight: 10, borderRadius: '50%' }} />
            <IconButton color="inherit" href="/home" aria-label="Home">
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
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

          <Section id="skills">
            <Box sx={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={skillsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="level" fill="#8884d8">
                    {skillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <SkillsContainer container spacing={3}>
              {skillsData.map((skill, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <SkillCard elevation={3}>
                      <Typography variant="h6">{skill.name}</Typography>
                      <Typography variant="body1" color="primary">{`${skill.level}%`}</Typography>
                    </SkillCard>
                  </motion.div>
                </Grid>
              ))}
            </SkillsContainer>
          </Section>
        </Container>
      </Box>
    </ThemeProvider>
  );
}