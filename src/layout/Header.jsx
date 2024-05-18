import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Typography,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import Logo from '../components/Logo';
import isLoggedIn from '../utils/auth';

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userLoggedIn = isLoggedIn();
  // const userRole = localStorage.getItem('userRole');
  // const username = localStorage.getItem('username');
  const logoWidth = '5rem';

  //  Navigation menu items
  let pages = ['Login'];
  let routes = ['/'];
  const settings = [];
  const settingRoutes = [];
  if (userLoggedIn) {
    pages = ['Thêm mô hình', 'Danh sách mô hình'];
    routes = ['/model/add', '/'];
  } else {
    pages = ['Login'];
    routes = ['/'];
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Large Screen Logo */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: logoWidth,
              height: 'auto',
              alignItems: 'center',
              '&:hover': { cursor: 'pointer' },
            }}
          >
            <Link to="/">
              <Logo />
            </Link>
          </Box>

          {/* Small Screen Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={routes[index]}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Small Screen Logo */}
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'center',
              display: { xs: 'flex', md: 'none' },
              width: logoWidth,
              height: 'auto',
              alignItems: 'center',
              margin: '1.5rem',
              '&:hover': { cursor: 'pointer' },
            }}
          >
            <Link to="/">
              <Logo />
            </Link>
          </Box>

          {/* Large Screen Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2, color: 'inherit', display: 'block', textAlign: 'center',
                }}
                component={Link}
                to={routes[index]}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Avatar */}
          <Box sx={{ flexGrow: 0 }}>
            {userLoggedIn && (
              <>
                <Tooltip title="admin">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar">ad</Avatar>
                  </IconButton>
                </Tooltip>
                {/* Avatar Menu */}
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => (
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                      component={Link}
                      to={settingRoutes[index]}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem key="logout" onClick={handleLogout}>
                    <Typography textAlign="center">Đăng xuất</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
