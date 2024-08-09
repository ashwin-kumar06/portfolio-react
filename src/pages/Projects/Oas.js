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

// Note: In a real project, you would import actual image files.
// For this example, we'll use placeholder images.
import auction1 from '../../logos/oas 1.jpg';
import auction2 from '../../logos/oas 2.jpg';
import auction3 from '../../logos/oas 3.jpg';
import auction4 from '../../logos/oas 4.jpg';


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

export default function OnlineAuctionSystem() {
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
              Online Auction System
            </Typography>
          </motion.div>

          <ProjectPaper elevation={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ProjectImage src={auction1} alt="Online Auction System Overview" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Project Overview
                </Typography>
                <Typography variant="body1" paragraph>
                  The Online Auction System is a comprehensive platform designed to provide secure, efficient auctions with real-time bidding and robust analytics. It ensures transparency and user-friendly navigation for all participants in the auction process.
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Key Features:
                </Typography>
                <List>
                  {['Real-time bidding', 'Secure transactions', 'User-friendly interface', 'Robust analytics', 'Transparent auction process'].map((feature, index) => (
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
                    <ListItemText primary="Backend: C# ASP.NET Core 7 Framework" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Frontend: React.js" />
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
                  Real-Time Bidding System
                </Typography>
                <Typography variant="body1" paragraph>
                  Our Online Auction System features a state-of-the-art real-time bidding mechanism. This ensures that all participants have fair and equal access to the latest bid information, creating a dynamic and exciting auction environment.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Instant bid updates" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Automated outbid notifications" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Live auction countdown timers" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <ProjectImage src={auction4} alt="Real-Time Bidding Interface" />
              </Grid>
            </Grid>
          </ProjectPaper>

          <ProjectPaper elevation={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ProjectImage src={auction3} alt="Secure Transaction System" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Secure Transaction System
                </Typography>
                <Typography variant="body1" paragraph>
                  Security is paramount in our Online Auction System. We've implemented robust measures to ensure that all transactions are secure, protecting both buyers and sellers throughout the auction process.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Encrypted data transmission" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Secure payment gateways" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="User authentication and authorization" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </ProjectPaper>

          <ProjectPaper elevation={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Analytics Dashboard
                </Typography>
                <Typography variant="body1" paragraph>
                  Our comprehensive analytics dashboard provides deep insights into auction performance, user behavior, and market trends. This data-driven approach allows auctioneers to optimize their strategies and users to make informed decisions.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Real-time auction statistics" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="User engagement metrics" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Market trend analysis" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <ProjectImage src={auction2} alt="Analytics Dashboard" />
              </Grid>
            </Grid>
          </ProjectPaper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}