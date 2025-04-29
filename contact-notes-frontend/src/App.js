import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import NotesPage from './pages/NotesPage';

import Header from './components/Header';

import { isAuthenticated } from './services/auth';

import backgroundImage from './assets/background.png'; 
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', 
      light: '#7986cb',
      dark: '#303f9f'
    },
    secondary: {
      main: '#ff4081', 
      light: '#ff80ab',
      dark: '#f50057'
    },
    background: {
      default: 'transparent', 
      paper: 'rgba(255, 255, 255, 0.7)'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h4: {
      fontWeight: 600,
      color: '#2c3e50'
    },
    h5: {
      fontWeight: 500,
      color: '#34495e'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600
        }
      }
    }
  }
});

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box 
            sx={{ 
              flexGrow: 1, 
              minHeight: '100vh',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            }}
        >
          <Box 
            sx={{ 
              position: 'relative', 
              zIndex: 1 
            }}
          >
            <Header loggedIn={loggedIn} onLogout={handleLogout} />
            <Box sx={{ 
              padding: 3, 
              maxWidth: 1200, 
              margin: '0 auto',
              paddingTop: theme => theme.spacing(4)
            }}>
              <Routes>
                <Route
                  path="/login"
                  element={<LoginPage onLogin={handleLogin} />}
                />
                <Route
                  path="/contacts"
                  element={
                    <PrivateRoute>
                      <ContactsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contacts/:contactId/notes"
                  element={
                    <PrivateRoute>
                      <NotesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/"
                  element={<Navigate to={loggedIn ? "/contacts" : "/login"} />}
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;