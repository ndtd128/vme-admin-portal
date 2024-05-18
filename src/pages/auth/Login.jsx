import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Button, Typography, Avatar, Snackbar, Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import isLoggedIn from '../../utils/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [credentialsError, setCredentialsError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.registerSuccess || null);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  }, []);
  useEffect(() => {
    if (message) {
      // Navigate to the current path without the state
      navigate(location.pathname, { replace: true });
    }
  }, [message, navigate, location.pathname]);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage(null);
    setCredentialsError('');
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('userRole', 'admin');
    } else {
      setCredentialsError('Tên đăng nhập hoặc mật khẩu không đúng!');
      return;
    }
    window.location.href = '/';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '35%',
        margin: 'auto',
        marginTop: '2rem',
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message !== null}
        onClose={handleCloseAlert}
        autoHideDuration={5000}
      >
        {message !== null && (
          <Alert severity="success" onClose={handleCloseAlert}>
            {message}
          </Alert>
        )}
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={credentialsError !== ''}
        onClose={() => setCredentialsError('')}
        autoHideDuration={5000}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          {credentialsError}
        </Alert>
      </Snackbar>

      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Đăng nhập
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Tên đăng nhập"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mật khẩu"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Đăng nhập
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
