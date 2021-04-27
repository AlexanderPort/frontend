import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';

import { 
  Button,
  Avatar, 
  Typography, 
  AppBar, 
  Toolbar, 
  Container, 
  IconButton,
  makeStyles,
} from '@material-ui/core';

import SignIn from './SignIn';
import SignUp from './SignUp';
import API from './REST-API/settings'


import {
  useParams,
  Redirect
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1
    },
    mainFeaturesPost: {
      position: "relative",
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    mainFeaturesPostContent: {
      position: "relative",
      padding: theme.spacing(10),
      marginTop: theme.spacing(8)
    },
    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundOverlay: "rgba(0, 0, 0, .3)"
    },
    cardMedia: {
      paddingTop: "60%"
    },
    cardContent: {
      flexGrow: 1,
    },
    cardGrid: {
      marginTop: theme.spacing(4)
    },
    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    }
}));


export default function Header(props) {
  const classes = useStyles();
  const token = props.token;
  const setToken = props.setToken;
  const [redirect, setRedirect] = React.useState(false);
  const handleOnClick = (event) => {
    setRedirect(true);
  }
  const SignInSignUp = () => {
    if (token) {
      const avatar = `${API}/api/users/${token}/images/avatar/`;
      return (<Button onClick={handleOnClick}><Avatar className={classes.avatar} src={avatar}/></Button>);
    } else {
      return (<SignIn token={token} setToken={setToken}/>);
    }
  }
 if (!redirect) {
  return (
    <AppBar>
      <Container fixed>
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography variant="h6" className={classes.title}>Web developer blog</Typography>
          <SignInSignUp></SignInSignUp>
        </Toolbar>
      </Container>
    </AppBar>
    );
        } else {
          return <Redirect to={`/users/${token}/`}/>;
        }
}