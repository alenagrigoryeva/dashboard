import * as React from 'react';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Grid from '@mui/material/Grid'; 

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CameraRollOutlinedIcon from '@mui/icons-material/CameraRollOutlined';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import GroupIcon from '@mui/icons-material/Group';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';

import CircularProgress from '@mui/material/CircularProgress';

const actions = [
  { icon: <FavoriteIcon />, name: 'В любимые' },
  { icon: <EditOutlinedIcon />, name: 'Редактировать' },
  { icon: <DeleteOutlineOutlinedIcon />, name: 'Удалить' },
];

function loadFilms(idFilm) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [film, setItems] = useState([]);

  useEffect(() => {
    fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films/" + idFilm, {
      method: 'GET',
      headers: {
          'X-API-KEY': '938b1776-31c3-4752-bd61-f22983b11571',
          'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

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
      <Grid key={film.kinopoiskId} sx={{display: 'flex'}}> 
        <Box sx={{padding: '50px 50px 0 70px'}}>
          <Card>
            <CardActionArea sx={{display: "grid", height: "100%"}}>
              <img
                src={film.posterUrl}
                height='100%'
                width='250px'
              />
            </CardActionArea>
          </Card>
        </Box>
        <Box sx={{padding: '30px 70px 10px 0'}}>
          <List sx={{width: '100%'}}>
            <ListItem>
              <ListItemIcon>
                <StarOutlineIcon sx={{color: "#802BB1"}} />
              </ListItemIcon>
              <ListItemText primary={"IMDb  " + film.ratingImdb} />
              <ListItemIcon>
                <GroupIcon sx={{color: "#802BB1"}} />
              </ListItemIcon>
              <ListItemText primary={film.ratingImdbVoteCount} />
              <ListItemIcon>
                <StarOutlineIcon sx={{color: "#802BB1"}} />
              </ListItemIcon>
              <ListItemText primary={"Кинопоиск " + film.ratingKinopoisk} />
              <ListItemIcon>
                <GroupIcon sx={{color: "#802BB1"}} />
              </ListItemIcon>
              <ListItemText primary={film.ratingKinopoiskVoteCount} />
            </ListItem>
            <ListItem>
              <Typography variant='h5' margin="10px 0">
                {film.nameRu}
              </Typography>
              {film.nameOriginal !== null && 
                <Typography color="text.secondary" variant='body1' margin="10px">
                  {"(" + film.nameOriginal + ")"}
                </Typography>
              }
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem>
              {film.genres.map((element) => (
                <Typography color="text.secondary" 
                            variant="subtitle2" component="div" 
                            display="inline-block" margin="0 5px 0 0">
                  {element.genre}
                </Typography>
              ))}
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem>
              <ListItemText primary={"Год выпуска: " + film.year} />
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem>
              <ListItemText primary={"Продолжительность: " + film.filmLength + " минут"} />
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem>
              <Typography margin="5px 15px 0 0">Страны производства:</Typography>
              {film.countries.map((element) => (
                <Typography color="text.secondary" 
                            variant="subtitle2" component="div" 
                            display="inline-block" margin="0 5px 0 0">
                  {element.country}
                </Typography>
              ))}
            </ListItem>
            <Divider variant="middle" component="li" />
            {film.slogan !== null && 
              <ListItem>
                <ListItemText primary={film.slogan} />
              </ListItem>
            }
            <Divider variant="middle" component="li" />
            <ListItem>
              <ListItemText primary={film.description} />
            </ListItem>
            <ListItem>
              
            </ListItem>
          </List>
        </Box>
      </Grid>
    )
  }
}

function loadSimilars(idFilm) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [similars, setSimilars] = useState([]);

  useEffect(() => {
    fetch("https://kinopoiskapiunofficial.tech/api/v2.1/films/" + idFilm + "/sequels_and_prequels", {
      method: 'GET',
      headers: {
          'X-API-KEY': '938b1776-31c3-4752-bd61-f22983b11571',
          'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setSimilars(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } 
  else if (!isLoaded) {
    return <Box sx={{ position: "fixed", top: "50%", left: "50%"}}>
            <CircularProgress color="secondary" />
          </Box>;
  } 
  else if (similars.length !== 0) {
    return (
      <Grid item xs={12} sx={{ margin: "0 50px 50px 50px"}}>
        <Typography variant="h6" component="div" marginBottom="1em" color="#4c495d"
                    textAlign="center" paddingBottom="15px">
          Приквелы и сиквелы
        </Typography>
        <Grid container justifyContent="center" spacing="15px">
          {similars.map((film) => (
            <Grid key={film.filmId} item> 
              <Card sx={{ width: 200, height: '100%'}}>
                <CardActionArea sx={{display: "grid", height: "100%", alignItems: "start"}}>
                  <img
                    src={film.posterUrl}
                    height='300'
                    width='100%'
                  />
                  <CardContent>
                    <Typography gutterBottom variant="subtitle2" component="div" marginBottom="1em" color="#4c495d">
                      {film.nameRu}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    )
  }
}

const drawerWidth = "18%";

export default function Film() {
  const location = useLocation()
  const { film } = location.state

  const [anchorEl, setAnchorEl] = useState(null);
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
      <Grid>
        <Toolbar/>
        {loadFilms(film)}
        {loadSimilars(film)}
      </Grid>
      <Box sx={{ transform: 'translateZ(0px)', position: 'fixed', bottom: 0, right: 0, margin: "0 15px 15px 0"}}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          FabProps={{ color: "secondary" }}
          icon={<AddIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
    </Box>
  );
}