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

export default function Change(props) {
  const user = props.user;
  const setUser = props.setUser;
  const open = props.open;
  const setOpen = props.setOpen;
  const USER = {
      name: user.name, 
      surname: user.surname, 
      email: user.email, 
      password: user.password, 
      pk: user.pk
    };

  const handleChangeName = (event) => {
    USER.name = event.target.value;
  };
  const handleChangeEmail = (event) => {
    USER.email = event.target.value;
  };
  const handleChangeSurname = (event) => {
    USER.surname = event.target.value;
  };
  const handleChangePassword = (event) => {
    USER.password = event.target.value;
  };
  const handleCancel = (event) => {
      setOpen(false);
  };
  const handleChange = (event) => {
    let data = new FormData();
    data.append('pk', user.pk);
    data.append('name', USER.name);
    data.append('email', USER.email);
    data.append('images', selectedFile);
    data.append('surname', USER.surname);
    data.append('password', USER.password);
    userService.updateUser(data);
    setUser(USER);
    setOpen(false);
  };
  const [isSelected, setIsSelected] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState();
  
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
            <TextField defaultValue={user.name} onChange={handleChangeName} autoFocus margin="dense" id="name" label="Name" type="text" fullWidth/>
            <TextField defaultValue={user.surname} onChange={handleChangeSurname} autoFocus margin="dense" id="surname" label="Surname" type="text" fullWidth/>
            <TextField defaultValue={user.email} onChange={handleChangeEmail} autoFocus margin="dense" id="email" label="Email Address" type="text" fullWidth/>
            <TextField defaultValue={user.password} onChange={handleChangePassword} autoFocus margin="dense" id="password" label="Password" type="text" fullWidth/>
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