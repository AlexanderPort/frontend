import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import API from './REST-API/settings';
import UserService from './REST-API/UserService';
import ArticleService from './REST-API/ArticleService';
import VisibilityIcon from '@material-ui/icons/Visibility';


import {
    CardActionArea,
    Typography,
    IconButton,
    Avatar,
    CardActions,
    CardContent,
    CardMedia,
    CardHeader,
    Card,
} from '@material-ui/core'

import {
  useParams,
  Redirect
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 600
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const userService = new UserService();
const articleService = new ArticleService();

export default function Preview1(props) {
  const classes = useStyles();
  const article = props.article;
  const [user, setUser] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const handleOnContentClick = (event) => {
    article.views += 1;
    articleService.updateArticle(article);
    setRedirect('article'); 
  };
  const handleOnAvatarClick = (event) => {
    setRedirect('author'); 
  };
  let [date, time] = article.created_at.split('T');
  time = time.split('.')[0];
  const created_at = `${date} ${time}`;
  const title = article.title.slice(0, 50);
  const description = `${article.description.slice(0, 200)}...`;
  const avatar = `${API}/api/users/${article.author_id}/images/avatar/`;
  const preview = `${API}/api/articles/${article.pk}/images/preview/`;
  if (!user) {
    const promise = userService.getUser(article.author_id);
    promise.then(data => { setUser(data); });
  }
  

  if (!redirect) {
  return (
    <Card className={classes.root}>
      
        <CardHeader
          avatar={<Avatar onClick={handleOnAvatarClick} src={avatar} className={classes.avatar}/>}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`${user.name} ${user.surname}: ${title}`}
          subheader={created_at}
        />
      <CardActionArea onClick={handleOnContentClick}>
        <CardMedia
          className={classes.media}
          image={preview}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
        </Typography>
        </CardContent>
      </CardActionArea>
      
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <VisibilityIcon />
          <Typography>{article.views}</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
        } else {
          if (redirect == 'article') return <Redirect to={`/articles/${article.pk}/`}/>;
          else if (redirect == 'author') return <Redirect to={`/users/${article.author_id}/`}/>;
        }
}