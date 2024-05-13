import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Grid from '@mui/material/Grid'; 

import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import CircularProgress from '@mui/material/CircularProgress';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';

const actions = [
  { icon: <AddIcon />, name: 'Добавить' },
  { icon: <EditOutlinedIcon />, name: 'Редактировать' },
  { icon: <DeleteOutlineOutlinedIcon />, name: 'Удалить' },
];

function loadFilms(request) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [films, setItems] = useState([]);

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
    fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=" + request + page, {
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

  const changePage = (numberPage) => {
    fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=" + request + numberPage, {
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
          <Grid container justifyContent="center" spacing="15px">
            {films.items.map((film) => (
              <Grid key={film.kinopoiskId} item> 
                <Link to="/Фильм" state={{film: film.kinopoiskId}}>
                  <Card sx={{ width: 200, height: '100%'}}>
                    <CardActionArea sx={{display: "grid", height: "100%", alignContent: "space-between"}}>
                      <img
                        src={film.posterUrl}
                        height='300'
                        width='100%'
                      />
                      <CardContent>
                        <Typography gutterBottom variant="subtitle2" component="div" marginBottom="1em" color="#4c495d">
                          {film.nameRu}
                        </Typography>
                        {film.genres.map((element) => (
                          <Typography color="text.secondary" 
                                      variant="caption" component="div" 
                                      display="inline-block" margin="0 5px 5px 0">
                            {element.genre}
                          </Typography>
                        ))}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Stack padding="50px 70px" alignItems="flex-end">
          <Pagination count={films.totalPages} page={page} onChange={pageChange}
                      variant="outlined" shape="rounded" color="secondary"
                      showFirstButton showLastButton />
        </Stack>
      </Grid>
    )
  }
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
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

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
      <Box sx={{ width: '100%' }}>
        <Toolbar />
        <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: '50px 0 20px 0' }}>
          <Tabs value={value} onChange={handleChange} 
                textColor="secondary" indicatorColor="secondary" centered>
            <Tab label="ВАМПИРЫ" {...a11yProps(0)} />
            <Tab label="ЗОМБИ" {...a11yProps(1)} />
            <Tab label="СЕМЬЯ" {...a11yProps(2)} />
            <Tab label="ЛЮБОВЬ" {...a11yProps(3)} />
            <Tab label="ФИЛЬМЫ-КАТАСТРОФЫ" {...a11yProps(4)} />
            <Tab label="ПО КОМИКСАМ" {...a11yProps(5)} />
            <Tab label="АНИМАЦИЯ" {...a11yProps(6)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {loadFilms("VAMPIRE_THEME&page=")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {loadFilms("ZOMBIE_THEME&page=")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {loadFilms("FAMILY&page=")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {loadFilms("LOVE_THEME&page=")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          {loadFilms("CATASTROPHE_THEME&page=")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          {loadFilms("COMICS_THEME&page=")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          {loadFilms("KIDS_ANIMATION_THEME&page=")}
        </CustomTabPanel>
      </Box>
      <Box sx={{ transform: 'translateZ(0px)', position: 'fixed', bottom: 0, right: 0, margin: "0 15px 15px 0"}}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          FabProps={{ color: "secondary" }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.name == "Добавить" && handleClickOpen}
            />
          ))}
        </SpeedDial>
      </Box>
      <Box>
        <Dialog
          open={open}
          onClose={handleClickClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              handleClickClose();
            },
          }}
        >
          <DialogTitle>Добавить новую коллекцию</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Название"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Описание"
              fullWidth
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox color="secondary" />
              }
              label="Приватная коллекция"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose} color="secondary">Отмена</Button>
            <Button type="submit" color="secondary" onClick={handleClickSnackbar}>Добавить</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Коллекция добавлена!"
          action={action}
        />
      </Box>
    </Box>
  );
}