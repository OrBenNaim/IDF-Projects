import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { loadFromLocalStorage, removeFromLocalStorage } from '../utils/localStorageUtils';

function HomePage(): JSX.Element {
  const [username, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication state on page load
  useEffect(() => {
    const token = loadFromLocalStorage<string>('accessToken'); // Replace with your actual token storage logic
    const savedUsername = loadFromLocalStorage<string>('username');
    
    if (token) {
      setIsAuthenticated(true);
      
      if (savedUsername) setUserName(savedUsername);
    }
  }, []);

  

  const handleSignOut = () => {
    removeFromLocalStorage('accessToken');
    removeFromLocalStorage('username');
    setIsAuthenticated(false);
    setUserName('');
    navigate('/signin');
  };

  return (
    <Box
      sx={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          boxShadow: 3,
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <CardContent>
          <Grid2 container spacing={8} justifyContent="center">
            {!isAuthenticated ? (
              <>
                {/* Welcome Message */}
                <Grid2 size={{ xs: 12 }}>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Welcome to your To-Do List App!
                  </Typography>
                </Grid2>

                {/* Sign In & Sign Up Buttons */}
                <Grid2
                  size={{ xs: 12 }}
                  display="flex"
                  justifyContent="center"
                  gap={2}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/signin')}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                </Grid2>
              </>
            ) : (
              <>
                {/* Authenticated Welcome */}
                <Grid2 size={{ xs: 12 }}>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Welcome Back, {username}!
                  </Typography>
                </Grid2>

                {/* Explore App Button */}
                <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/app')}
                    size="large"
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      padding: '10px 30px',
                    }}
                  >
                    Go to App
                  </Button>
                </Grid2>

                {/* Sign Out Button */}
                <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </Grid2>
              </>
            )}
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
}

export default HomePage;
