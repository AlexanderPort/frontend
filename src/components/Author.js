import React from 'react';
import API from './REST-API/settings'


import {
  Typography,
  Container,
  Avatar,
  Paper,
  Grid,
  Tab,
  Tabs,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Editor from './Editor';
import {
  CardActionArea,
  IconButton,
} from '@material-ui/core'


import {
    useParams,
    Redirect
} from "react-router-dom";

import AddIcon from '@material-ui/icons/Add';


import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Preview2 from './Preview2'
import UserService from './REST-API/UserService';
import ArticleService from './REST-API/ArticleService';
import Follower from './Follower';
import Profile from './Profile';


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    align: 'center'
  },
  author: {
    alignContent: 'center'
  },
  content: {
    marginTop: theme.spacing(9),
  },
  grid: {
    marginTop: theme.spacing(3),
    maxWidth: '100%'
  },
  left: {
    position: 'fixed',
    left: 0,
    width: '20%',
    height: '100%',
    background: 'blue',
    overflow: 'auto',
  },
  right: {
    position: 'fixed',
    left: '20%',
    width: '80%',
    height: '100%',
    background: 'red',
    overflow: 'auto',
  },
}));

const userService = new UserService();
const articleService = new ArticleService();


export default function Author(props) {
  const classes = useStyles();
  const params = useParams();
  const pk = params.pk;
  const token = props.token;
  const setToken = props.setToken;
  const [value, setValue] = React.useState(0);
  const [user, setUser] = React.useState(false);
  const [follow, setFollow] = React.useState(undefined);
  const [redirect, setRedirect] = React.useState(false);
  const [articles, setArticles] = React.useState(false);
  const [followers, setFollowers] = React.useState(false);
  const avatar = `${API}/api/users/${pk}/images/avatar/`;
  if (!user) {
    const promise = userService.getUser(pk);
    promise.then(data => { setUser(data); });
  }
  if (!articles) {
    const promises = articleService.getArticles(pk);
    promises.then(data => { setArticles(data); });
  }
  if (!followers) {
    const promises = userService.getFollowers(pk);
    promises.then(data => { setFollowers(data); });
  }
  if (follow == undefined) {
    if (token && user) {
      const promise = userService.isFollower(user.pk, token);
      promise.then(follow => { setFollow(follow); });
    }
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (token) setOpen(true);
  };
  const createNewArticle = (event) => {
    setRedirect(`/editor/${pk}/`);
  };
  const handleOnChange = (event, value) => {
    setValue(value);
  }
  const addFollower = (event) => {
    if (token) {
      const promise = userService.addFollower(user.pk, token);
      promise.then(follow => { setFollow(follow); });
    }
  };
  if (!redirect) {
    return (
      <>
      <Header token={token} setToken={setToken} profile={true}></Header>
      <Container className={classes.content} maxWidth="lg">
      <Paper>
        <Tabs value={value} onChange={handleOnChange}
              indicatorColor="primary" textColor="primary" centered>
          <Tab label="Articles" />
          <Tab label="Followers" />
          <Tab label="Editor" />

        </Tabs>
      </Paper>
      </Container>
      <Grid container className={classes.grid} spacing={3}>
      <Profile user={user} setUser={setUser} open={open} setOpen={setOpen}/>
      <Grid item lg={4} xs={12}>
          <Card>

          <CardActionArea onClick={handleOpen}>
          <CardHeader
            avatar={<Avatar className={classes.avatar} src={avatar}></Avatar>}
            title={<Typography variant='h5'>{`${user.name} ${user.surname}`}</Typography>}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {user.description}
          </Typography>
          </CardContent>

        </CardActionArea>
        <CardActions>
          {
            (token == pk) &&
              <IconButton onClick={createNewArticle}>
                <AddIcon></AddIcon>
                <Typography>  Create new article</Typography>
              </IconButton>
          }
          {
            (token != pk && !follow) &&
              <IconButton onClick={addFollower}>
                <AddIcon></AddIcon>
                <Typography>  Follow</Typography>
              </IconButton>
          }
          {
            (token != pk && follow) &&
              <IconButton>
                <Typography>You are follower</Typography>
              </IconButton>
          }
        </CardActions>
        </Card>
      </Grid>
      <Grid item lg={8} xs={12}>
      <Container maxWidth="lg">
        {
          (articles && value == 0) &&
          <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item key={article.pk} lg={10}>
              <Preview2 article={{
                pk: article.pk,
                views: article.views,
                likes: article.likes,
                title: article.title,
                dislikes: article.dislikes,
                created_at: article.created_at,
                description: article.description}}>
              </Preview2>
            </Grid>
          ))}
        </Grid>
        }
        {
          (value == 2 && token == pk) && <Editor token={token} setToken={setToken} profile={true}></Editor>
        }
        {
          (value == 2 && token != pk) &&
          <Typography className={classes.content} color="secondary" variant='h4' align='center'>
          To create new article you should sign in</Typography>
        }
        {
          (followers && value == 1) &&
          <Grid container spacing={4}>
          {followers.map((follower) => (
            <Grid item key={follower.pk} xs={12}>
              <Card>
                <CardActionArea onClick={() => setRedirect(`/users/${follower.pk}/new`)}>
                  <CardHeader
                    avatar={<Avatar className={classes.avatar} src={`${API}/api/users/${follower.pk}/images/avatar/`}></Avatar>}
                    title={<Typography variant='h5'>{`${follower.name} ${follower.surname}`}</Typography>}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          </Grid>
        }
      </Container>
      </Grid>
      </Grid>
      </>
    );
  } else {
    return <Redirect to={redirect} />;
  }
}