import React, { useState } from 'react';
import {
  Avatar, Typography, Box, Snackbar, Alert,
  FormControl, Grid, TextField, Button, CircularProgress,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { addModels } from '../firebase';

function AddModel() {
  const [modelName, setModelName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setRegisterError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addModels(modelName, description, videoLink, image);
      if (res === 'OK') {
        setRegisterSuccess(true);
      }
    } catch (error) {
      setRegisterError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        margin: 'auto',
        marginTop: '2rem',
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={registerSuccess}
        onClose={() => setRegisterSuccess(false)}
        autoHideDuration={5000}
      >
        <Alert severity="success" onClose={() => setRegisterSuccess(false)}>
          Thêm mô hình thành công!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={registerError !== ''}
        onClose={handleCloseAlert}
        autoHideDuration={5000}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          {registerError}
        </Alert>
      </Snackbar>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <AddCircle />
      </Avatar>
      <Typography component="h1" variant="h5">
        Thêm mô hình
      </Typography>

      <FormControl>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Tên mô hình"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Mô tả"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="image"
                label="Đường dẫn video"
                name="image"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl required>
                <Button variant="contained" component="label" color="secondary">
                  Chọn ảnh đánh dấu
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                    required
                  />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100 %',
                }}
              >
                {imageName ? `${imageName}` : 'No image uploaded'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '100%' }}
                disabled={loading}
              >
                {loading ? <CircularProgress sx={{ color: 'inherit' }} size={32} /> : 'Thêm'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </FormControl>
    </Box>

  );
}

export default AddModel;
