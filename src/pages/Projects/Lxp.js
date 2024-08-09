import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import lxp1 from '../../logos/lxp 1.png'
import lxp2 from '../../logos/lxp 2.webp'
import lxp3 from '../../logos/lxp 3.webp'
import lxp4 from '../../logos/lxp 4.jpg'

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

const ProjectPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: theme.palette.background.paper,
}));

const ProjectImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  marginBottom: '20px',
});

export default function LearningExperiencePlatform() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              component={Link}
              to="/home"
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 2 }}
            >
              Back to Home
            </Button>
            <Typography variant="h2" gutterBottom>
              Learning Experience Platform
            </Typography>
          </motion.div>

          <ProjectPaper elevation={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ProjectImage src={lxp1} alt="Learning Experience Platform Overview" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Project Overview
                </Typography>
                <Typography variant="body1" paragraph>
                  The Learning Experience Platform (LXP) is a comprehensive solution designed to deliver personalized, engaging learning experiences. It caters to diverse learning styles and leverages analytics to optimize outcomes for corporate training, professional development, and education.
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Key Features:
                </Typography>
                <List>
                  {['Personalized learning paths', 'Interactive content', 'Progress tracking', 'Analytics dashboard', 'Integration with existing systems'].map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Technical Details
                </Typography>
                <Typography variant="body1" paragraph>
                  This project was built using a modern tech stack to ensure scalability, performance, and maintainability:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Backend: C# ASP.NET Core 8 Framework with layered architecture" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Frontend: React.js with Redux architecture" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Database: MySQL with Entity Framework" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </ProjectPaper>

          <ProjectPaper elevation={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Personalized Learning Paths
                </Typography>
                <Typography variant="body1" paragraph>
                  Our LXP uses advanced algorithms to create tailored learning journeys for each user. By analyzing user preferences, skill levels, and learning goals, the platform suggests courses and content that best fit individual needs.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="AI-driven content recommendations" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Adaptive learning sequences" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Skill gap analysis and targeted learning" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <ProjectImage src={lxp2} alt="Personalized Learning Paths" />
              </Grid>
            </Grid>
          </ProjectPaper>

          <ProjectPaper elevation={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ProjectImage src={lxp3} alt="Interactive Content Creation" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Interactive Content Creation
                </Typography>
                <Typography variant="body1" paragraph>
                  Our platform empowers instructors and content creators to develop engaging, interactive learning materials. With a user-friendly interface and a variety of multimedia tools, creating impactful content has never been easier.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Drag-and-drop course builder" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Integrated multimedia support" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Interactive quizzes and assessments" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </ProjectPaper>

          <ProjectPaper elevation={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Analytics and Reporting
                </Typography>
                <Typography variant="body1" paragraph>
                  Our comprehensive analytics dashboard provides deep insights into learner engagement, progress, and performance. This data-driven approach allows organizations to continuously improve their learning strategies and outcomes.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Real-time performance tracking" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Customizable reports and visualizations" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Predictive analytics for learning outcomes" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <ProjectImage src={lxp4} alt="Analytics and Reporting Dashboard" />
              </Grid>
            </Grid>
          </ProjectPaper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}