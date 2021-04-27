import React from 'react';

import { 
  Button, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Dialog,
  Input,
} from '@material-ui/core';


import UserService from './REST-API/UserService'

const userService = new UserService();

export default function Profile(props) {
  const user = props.user;
  const setUser = props.setUser;
  const open = props.open;
  const setOpen = props.setOpen;
  const [isSelected, setIsSelected] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState();

  const handleChangeName = (event) => {
    user.name = event.target.value;
    setUser(user);
  };
  const handleChangeEmail = (event) => {
    user.email = event.target.value;
    setUser(user);
  };
  const handleChangeLogin = (event) => {
    user.login = event.target.value;
    setUser(user);
  };
  const handleChangeSurname = (event) => {
    user.surname = event.target.value;
    setUser(user);
  };
  const handleChangePassword = (event) => {
    user.password = event.target.value;
    setUser(user);
  };
  const handleChangeDescription = (event) => {
    user.description = event.target.value;
    setUser(user);
  };
  const handleCancel = (event) => {
    setOpen(false);
  };
  const handleChange = (event) => {
    let data = new FormData();
    data.append('pk', user.pk);
    data.append('name', user.name);
    data.append('email', user.email);
    data.append('login', user.login);
    data.append('avatar', selectedFile);
    data.append('surname', user.surname);
    data.append('password', user.password);
    data.append('description', user.description);
    userService.updateUser(data);
    setOpen(false);
  };
  const handleChangeFile = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };


  return (
    <Dialog open={open} aria-labeledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            Change
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Change
            </DialogContentText>
            <TextField defaultValue={user.name} onChange={handleChangeName} 
                       autoFocus margin="dense" id="name" label="Name" type="text" fullWidth/>
            <TextField defaultValue={user.surname} onChange={handleChangeSurname} 
                       autoFocus margin="dense" id="surname" label="Surname" type="text" fullWidth/>
            <TextField defaultValue={user.email} onChange={handleChangeEmail} 
                       autoFocus margin="dense" id="email" label="Email Address" type="text" fullWidth/>
            <TextField defaultValue={user.email} onChange={handleChangeLogin} 
                       autoFocus margin="dense" id="login" label="Login" type="text" fullWidth/>
            <TextField defaultValue={user.password} onChange={handleChangePassword} 
                       autoFocus margin="dense" id="password" label="Password" type="text" fullWidth/>
            <TextField defaultValue={user.description} onChange={handleChangeDescription} 
                       autoFocus margin="dense" id="description" label="Description" type="text" fullWidth
                       multiline rowsMax={5}/>
            <input type="file" name="file" onChange={handleChangeFile} />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={handleChange} color="primary">
                Change
            </Button>
        </DialogActions>
    </Dialog>
    );
}