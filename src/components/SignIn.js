import React from 'react';

import { 
  Button, 
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Dialog,
  Box, Grid,
  makeStyles,
} from '@material-ui/core';

import SignUp from './SignUp';

import UserService from './REST-API/UserService'

const userService = new UserService();

const useStyles = makeStyles((theme) => ({
    spacing2: {
      marginTop: theme.spacing(2)
    },
  }));

export default function SignIn(props) {
    const classes = useStyles();
    const token = props.token;
    const setToken = props.setToken;
    const [login, setLogin] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState();
    
    const handleChangeLogin = (event) => {
        setLogin(event.target.value);
    };
    const handleChangePassword = (event) => {
      setPassword(event.target.value);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleCancel = (event) => {
        setOpen(false);
    };
    const handleSignIn = (event) => {
        const promise = userService.signIn(login, password);
        promise.then(pk => { setToken(pk); if (!pk) alert('Cannot sign in') });
        setOpen(false);
    };

  return (
  <Box mr={3}>
    <Button color="secondary" variant="contained"
            onClick={handleOpen}>
      Sign In
    </Button>
    <Dialog open={open} aria-labeledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            Sign In
        </DialogTitle>
        <DialogContent>
            <TextField onChange={handleChangeLogin} autoFocus margin="dense" id="login" label="Login" type="login" fullWidth/>
            <TextField onChange={handleChangePassword} autoFocus margin="dense" id="password" label="Password" type="password" fullWidth/>
            <Grid container className={classes.spacing2} spacing={1} align="center">
                <Grid item><Typography variant="h6">If you do not have account please</Typography></Grid>
                <Grid item><SignUp token={token} setToken={setToken}></SignUp></Grid>
            </Grid>
            
            
            
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSignIn} color="primary">
                Sign In
            </Button>
        </DialogActions>
    </Dialog>
    </Box>
    );
}