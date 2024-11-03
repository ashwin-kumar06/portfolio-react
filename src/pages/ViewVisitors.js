import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Grid,
  Fade,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Download as DownloadIcon,
  People as PeopleIcon,
  Fingerprint as FingerprintIcon,
  Today as TodayIcon,
  Update as UpdateIcon,
  Search as SearchIcon,
  Computer as ComputerIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  statCard: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
    borderRadius: '12px',
    padding: '1rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
  },
  iconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '2rem',
  },
  tableContainer: {
    borderRadius: '12px',
    boxShadow: 'none',
    margin: '1rem 0',
  },
  chip: {
    margin: '0.25rem',
  },
};

const ViewVisitors = () => {
  const theme = useTheme();
  const [visitors, setVisitors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const storedVisitors = JSON.parse(localStorage.getItem('visitors') || '[]');
    setVisitors(storedVisitors);
    setFadeIn(true);
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(visitors, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'visitors-data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const sortedVisitors = [...visitors].sort((a, b) => {
    if (sortConfig.key === 'timestamp') {
      return sortConfig.direction === 'asc'
        ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
        : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
    }
    return sortConfig.direction === 'asc'
      ? a[sortConfig.key]?.localeCompare(b[sortConfig.key])
      : b[sortConfig.key]?.localeCompare(a[sortConfig.key]);
  });

  const filteredVisitors = sortedVisitors.filter(visitor =>
    Object.values(visitor).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const StatCard = ({ icon, title, value, color }) => (
    <Card sx={styles.statCard}>
      <Box sx={{ ...styles.iconContainer, backgroundColor: `${color}20` }}>
        {icon}
      </Box>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h4" color="primary" fontWeight="bold">
        {value}
      </Typography>
    </Card>
  );

  return (
    <Box sx={styles.pageContainer}>
      <Fade in={fadeIn} timeout={1000}>
        <Paper sx={styles.card}>
          <Box p={4}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                Visitor Analytics Dashboard
              </Typography>
              <Tooltip title="Export Data">
                <IconButton onClick={handleExportData} color="primary">
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<PeopleIcon sx={{ color: theme.palette.primary.main }} />}
                  title="Total Visits"
                  value={visitors.length}
                  color={theme.palette.primary.main}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<FingerprintIcon sx={{ color: theme.palette.secondary.main }} />}
                  title="Unique IPs"
                  value={new Set(visitors.map(v => v.ip)).size}
                  color={theme.palette.secondary.main}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<TodayIcon sx={{ color: theme.palette.success.main }} />}
                  title="Today's Visits"
                  value={visitors.filter(v =>
                    new Date(v.timestamp).toDateString() === new Date().toDateString()
                  ).length}
                  color={theme.palette.success.main}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<UpdateIcon sx={{ color: theme.palette.info.main }} />}
                  title="Latest Visit"
                  value={visitors.length > 0 ? formatDate(visitors[visitors.length - 1].timestamp).split(',')[0] : 'N/A'}
                  color={theme.palette.info.main}
                />
              </Grid>
            </Grid>

            <Box sx={styles.searchContainer}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search visitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Box>

            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === 'timestamp'}
                        direction={sortConfig.direction}
                        onClick={() => handleSort('timestamp')}
                      >
                        Timestamp
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === 'ip'}
                        direction={sortConfig.direction}
                        onClick={() => handleSort('ip')}
                      >
                        IP Address
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Platform & Browser</TableCell>
                    <TableCell>Screen Resolution</TableCell>
                    <TableCell>Language</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredVisitors
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((visitor, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{formatDate(visitor.timestamp)}</TableCell>
                        <TableCell>
                          <Chip
                            label={visitor.ip}
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={styles.chip}
                          />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <ComputerIcon color="action" fontSize="small" />
                            <Typography variant="body2">
                              {visitor.platform}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{visitor.screenResolution}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <LanguageIcon color="action" fontSize="small" />
                            <Typography variant="body2">
                              {visitor.language}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={filteredVisitors.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </TableContainer>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
};

export default ViewVisitors;