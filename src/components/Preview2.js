import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import API from './REST-API/settings';
import ArticleService from './REST-API/ArticleService';

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
    width: '100%',
    height: 700
  },
  media: {
    height: 0,
    paddingTop: '60%'
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

const articleService = new ArticleService();

export default function Preview2(props) {
  const classes = useStyles();
  const article = props.article;
  const [redirect, setRedirect] = React.useState(false);
  const handleOnClick = (event) => {
    article.views += 1;
    articleService.updateArticle(article);
    setRedirect(true); 
  };
  let [date, time] = article.created_at.split('T');
  time = time.split('.')[0];
  const created_at = `${date} ${time}`;
  const description = `${article.description.slice(0, 300)}...`;
  const preview = `${API}/api/articles/${article.pk}/images/preview/`;
  if (!redirect) {
    return (
      <Card className={classes.root}>
        <CardActionArea onClick={handleOnClick}>
          <CardHeader
            title={article.title}
            subheader={created_at}
          />
          <CardContent>
            <Typography variant="body1" color="textPrimary" component="p">
              {description}
          </Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={preview}
            title={article.title}
          />
          
        </CardActionArea>
        
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  } else {
    return <Redirect to={`/articles/${article.pk}/`}/>;
  }
}