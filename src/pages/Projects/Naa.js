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
import nutrition1 from '../../logos/naa 1.png'
import nutrition2 from '../../logos/naa 2.png'
import nutrition3 from '../../logos/naa 3.png'
import nutrition4 from '../../logos/naa 4.png'

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

export default function NutritionAssistantApplication() {
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
              Nutrition Assistant Application
            </Typography>
          </motion.div>

          <ProjectPaper elevation={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ProjectImage src={nutrition3} alt="Nutrition Assistant Application Overview" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Project Overview
                </Typography>
                <Typography variant="body1" paragraph>
                  The Nutrition Assistant Application is an innovative web app that automatically estimates food attributes such as ingredients and nutritional value by classifying input images of food. This project aims to make nutritional information easily accessible and promote healthier eating habits.
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Key Features:
                </Typography>
                <List>
                  {['Image-based food recognition', 'Automatic ingredient identification', 'Nutritional value estimation', 'User-friendly interface', 'Comprehensive food database'].map((feature, index) => (
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
                  This project leverages cutting-edge technologies in image processing and machine learning:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Frontend: React.js for a responsive and interactive user interface" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Backend: Python with Flask for efficient image processing and API endpoints" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Machine Learning: TensorFlow for image classification and food recognition" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </ProjectPaper>

          <ProjectPaper elevation={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Image Recognition Technology
                </Typography>
                <Typography variant="body1" paragraph>
                  Our Nutrition Assistant utilizes state-of-the-art image recognition technology to accurately identify food items from user-uploaded images. This forms the foundation of our nutritional analysis system.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Deep learning models for image classification" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="High accuracy in diverse food recognition" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Continuous model improvement through user feedback" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <ProjectImage src={nutrition2} alt="Image Recognition Technology" />
              </Grid>
            </Grid>
          </ProjectPaper>

          <ProjectPaper elevation={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ProjectImage src={nutrition4} alt="Nutritional Analysis System" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Nutritional Analysis System
                </Typography>
                <Typography variant="body1" paragraph>
                  Once a food item is identified, our sophisticated nutritional analysis system provides comprehensive information about its nutritional content, helping users make informed dietary choices.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Detailed breakdown of macronutrients and micronutrients" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Calorie estimation based on portion size" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Allergen and dietary restriction alerts" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </ProjectPaper>

          <ProjectPaper elevation={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  User Experience and Interface
                </Typography>
                <Typography variant="body1" paragraph>
                  Our Nutrition Assistant Application features an intuitive and user-friendly interface, making it easy for users to upload food images and receive instant nutritional information.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Clean and responsive design" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Simple image upload process" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Clear presentation of nutritional data" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <ProjectImage src={nutrition1} alt="User Interface" />
              </Grid>
            </Grid>
          </ProjectPaper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}