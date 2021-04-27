import React from 'react';

import { 
  Card,
  CardHeader,
  CardActionArea,
  Avatar,
  Typography,
  makeStyles
} from '@material-ui/core';

import {
    useParams,
    Redirect
  } from "react-router-dom";


import API from './REST-API/settings'


const useStyles = makeStyles((theme) => ({
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      align: 'center'
    },
  }));

export default function Follower(props) {
  const follower = props.follower;
  const classes = useStyles();
  const [redirect, setRedirect] = React.useState(false);
  const avatar = `${API}/api/users/${follower.pk}/images/avatar/`;

  const handleOnClick = (event) => { setRedirect(true); }

  if (!redirect) {
    return (
        <Card>
            <CardActionArea onClick={handleOnClick}>
              <CardHeader
                avatar={<Avatar className={classes.avatar} src={avatar}></Avatar>}
                title={<Typography variant='h5'>{`${follower.name} ${follower.surname}`}</Typography>}
              />
            </CardActionArea>
        </Card>
    );
  } else {
      return <Redirect to={`/users/${follower.pk}/`}></Redirect>
  }
  
}