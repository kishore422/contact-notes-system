import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = ({ loggedIn, onLogout }) => {
  return (
    <AppBar 
      position="static" 
      color="primary" 
      elevation={2}
      sx={{
        background: 'linear-gradient(90deg, rgba(63, 81, 181, 0.9) 0%, rgba(92, 107, 192, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            letterSpacing: 1,
            color: 'white'
          }}
        >
          Contact Notes System
        </Typography>
        {loggedIn ? (
          <Box>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/contacts"
              sx={{
                mx: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              Contacts
            </Button>
            <Button 
              color="inherit" 
              onClick={onLogout}
              sx={{
                mx: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/login"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;