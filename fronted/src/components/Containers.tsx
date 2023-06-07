import React from 'react';
import { Grid } from '@material-ui/core';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export const LoginFormContainer: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export const RegisterFormContainer: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RegisterForm />
      </Grid>
    </Grid>
  );
};