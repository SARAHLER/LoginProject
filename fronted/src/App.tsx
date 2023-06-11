import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import theme from './them';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Banner from './components/Baner'
import backgroundImage from './image/image13.jpg'; 
import { selectIsAuthenticated } from './store/authSlice';
import { useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Tasks from './components/TasksFrom'


const App: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <ThemeProvider theme={theme}> 

      <Box
        style={{
          background: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/registerForm" element={<RegisterForm />} />
          <Route path="/banner" element={<Banner />} /> 
          <Route path="/tasks" element={<Tasks />} /> 


        </Routes>
</Box>
    </ThemeProvider>
  );
};

export default App;
