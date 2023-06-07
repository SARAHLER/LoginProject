import React, { useState } from 'react';
import { Grid, Paper, Tabs, Tab, Typography } from '@material-ui/core';
import { LoginFormContainer, RegisterFormContainer } from '../components/Containers';

const LoginPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Grid container justify="center" alignItems="center" style={{ minHeight: '100vh', }}>
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <Paper style={{ padding: '2rem' }}>
          <Typography variant="h4" align="center" gutterBottom>
            פורטל דרושים 
          </Typography>
          <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary"  centered>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {tabIndex === 0 && <LoginFormContainer />}
          {tabIndex === 1 && <RegisterFormContainer />}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
