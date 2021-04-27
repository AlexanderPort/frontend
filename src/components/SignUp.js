import React from 'react';

import { 
  Button, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Dialog,
  Box,
} from '@material-ui/core';



import UserService from './REST-API/UserService'

const userService = new UserService();

export default function SignUp(props) {
    const token = props.token;
    const setToken = props.setToken;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [password, setPassword] = React.useState('');

  const handleChangeName = (event) => {
      setName(event.target.value);
  };
  const handleChangeEmail = (event) => {
      setEmail(event.target.value);
  };
  const handleChangeLogin = (event) => {
      setLogin(event.target.value);
  };
  const handleChangeSurname = (event) => {
      setSurname(event.target.value);
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
  const handleSignUp = (event) => {
    const user = {
        name: name, surname: surname, description: '',
        email: email, login: login, password: password,
    };
    const promise = userService.createUser(user);
    promise.then(pk => { setToken(pk); });

    setOpen(false);
  };

  return (
  <Box mr={3}>
    <Button color="secondary" variant="contained"
            onClick={handleOpen}>
      Sign Up
    </Button>
    <Dialog open={open} aria-labeledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            Sign Up
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Sign Up
            </DialogContentText>
            <TextField onChange={handleChangeName} autoFocus margin="dense" id="name" label="Name" type="text" fullWidth/>
            <TextField onChange={handleChangeSurname} autoFocus margin="dense" id="surname" label="Surname" type="text" fullWidth/>
            <TextField onChange={handleChangeEmail} autoFocus margin="dense" id="email" label="Email Address" type="email" fullWidth/>
            <TextField onChange={handleChangeLogin} autoFocus margin="dense" id="login" label="Login" type="login" fullWidth/>
            <TextField onChange={handleChangePassword} autoFocus margin="dense" id="password" label="Password" type="password" fullWidth/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSignUp} color="primary">
                Sign Up
            </Button>
        </DialogActions>
    </Dialog>
    </Box>
    );
}