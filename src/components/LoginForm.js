import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function LoginForm({ onSubmit, error }) {
  const [credentials, setCredentials] = useState({
    apiKey: '',
    apiSecret: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="API Key"
        name="apiKey"
        autoFocus
        value={credentials.apiKey}
        onChange={(e) => setCredentials({
          ...credentials,
          apiKey: e.target.value
        })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="API Secret"
        name="apiSecret"
        type="password"
        value={credentials.apiSecret}
        onChange={(e) => setCredentials({
          ...credentials,
          apiSecret: e.target.value
        })}
      />
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Login
      </Button>
    </Box>
  );
}

export default LoginForm; 