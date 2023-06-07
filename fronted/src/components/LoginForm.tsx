import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { login, selectIsLoading, selectError } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import theme from '../them';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(formData) as any);
    navigate('/banner');
  };

  return (
    <ThemeProvider  theme={theme}>
    <form onSubmit={handleSubmit}>
      <TextField
        type="email"
        name="email"
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        autoFocus
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        type="password"
        name="password"
        label="Password"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={formData.password}
        onChange={handleChange}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit"   disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </Button>
    </form>
    </ThemeProvider>
  );
};

export default LoginForm;
