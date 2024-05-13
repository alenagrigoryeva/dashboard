import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Grid from '@mui/material/Grid'; 

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import CameraRollOutlinedIcon from '@mui/icons-material/CameraRollOutlined';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';

import CircularProgress from '@mui/material/CircularProgress';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function loadNews() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [news, setNews] = useState([]);

  const [page, setPage] = useState(1);
  const pageChange = (event, value) => {
    setPage(value);
    changePage(page)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    fetch("https://kinopoiskapiunofficial.tech/api/v1/media_posts?page=" + page, {
      method: 'GET',
      headers: {
          'X-API-KEY': '3154071d-b0c9-4bb0-b588-6b82737e4610',
          'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setNews(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const changePage = (numberPage) => {
    fetch("https://kinopoiskapiunofficial.tech/api/v1/media_posts?page=" + numberPage, {
      method: 'GET',
      headers: {
          'X-API-KEY': '3154071d-b0c9-4bb0-b588-6b82737e4610',
          'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setNews(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } 
  else if (!isLoaded) {
    return <Box sx={{ position: "fixed", top: "50%", left: "50%"}}>
            <CircularProgress color="secondary" />
          </Box>;
  } 
  else {
    return (
      <Grid>
        <Grid item xs={12}>
            <Grid container sx={{padding: "0 50px"}} spacing="15px">
            {news.items.map((item) => (
              <Grid key={item.kinopoiskId} xs={3} item> 
                <Card sx={{ width: "auto", height: '100%'}}>
                <CardActionArea sx={{display: "grid", height: "100%", alignItems: "start"}}>
                    <img
                        src={item.imageUrl}
                        height='auto'
                        width='100%'
                    />
                    <CardContent>
                    <Typography gutterBottom variant="subtitle2" component="div" marginBottom="1em" color="#4c495d">
                        {item.title}
                    </Typography>
                    <Typography color="text.secondary" 
                                variant="caption" component="div">
                        {item.description}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Stack padding="50px" alignItems="flex-end">
          <Pagination count={news.totalPages} page={page} onChange={pageChange}
                      variant="outlined" shape="rounded" color="secondary"
                      showFirstButton showLastButton />
        </Stack>
      </Grid>
    )
  }
}

const drawerWidth = "18%";

export default function MainWindow() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed"
              sx={{ width: `calc(100% - ${drawerWidth})`, ml: `${drawerWidth}`,
                    background: '#802BB1' }}>
        <Toolbar>
          <Typography variant="h6" component="div" color="#FFFFFF" sx={{ flexGrow: 1 }}>
            Коллекция фильмов и сериалов "FILMouth"
          </Typography>
          <div>
              <IconButton
                size="large"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Мой аккаунт</MenuItem>
                <MenuItem onClick={handleClose}>Выйти</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  background: '#2D283E',
                  color: '#D1D7E8',
                  border: "none",
                },
              }}
              variant="permanent">
        <Toolbar sx={{ background: '#802BB1' }} />
        <Divider />
        <List>
          {['Главная', 'Фильмы', 'Сериалы'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <Link to={"/" + text}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: 'initial',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center',
                      color: '#D1D7E8',
                    }}
                  >
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <TheatersOutlinedIcon />}
                    {index === 2 && <CameraRollOutlinedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: 1 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ background: '#D1D7E8' }} />
        <List>
          {['Премьеры', 'Коллекции', 'Новости'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <Link to={"/" + text}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: 'initial',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center',
                      color: '#D1D7E8',
                    }}
                  >
                    {index === 0 && <MovieOutlinedIcon />}
                    {index === 1 && <VideoLibraryOutlinedIcon />}
                    {index === 2 && <NewspaperOutlinedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: 1 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box>
        <Toolbar />
        <Toolbar />
        {loadNews()}
      </Box>
    </Box>
  );
}