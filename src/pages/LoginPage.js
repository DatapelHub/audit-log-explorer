import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import { Container, Paper, Typography } from '@mui/material';

function LoginPage() {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (credentials) => {
    try {
      await login(credentials.apiKey, credentials.apiSecret);
      navigate('/audit-logs');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center">
          Audit Log Explorer
        </Typography>
        <LoginForm onSubmit={handleSubmit} error={error} />
      </Paper>
    </Container>
  );
}

export default LoginPage; 