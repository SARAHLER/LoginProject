import { register, selectError, selectIsLoading } from '../store/authSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../them';

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const resultAction = await dispatch(register(formData) as any);
      const token = resultAction.payload;
    } catch (error) {
      // Handle registration error
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          autoFocus
          value={formData.name}
          onChange={handleChange}
         
        />

        <TextField
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={formData.email}
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

    
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Register'}
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default RegisterForm;
