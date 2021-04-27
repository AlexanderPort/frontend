import React from 'react';
import API from './REST-API/settings';
import ArticleService from './REST-API/ArticleService';


import { 
  Button, 
  Typography, 
  Container, 
  Paper,
  Grid,
  makeStyles,
} from '@material-ui/core';

import {
    useParams,
    Redirect
  } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
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
      padding: theme.spacing(8),
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
}));


const articleService = new ArticleService();


export default function MainPreview(props) {
    const params = useParams();
    const classes = useStyles();
    const article = props.article;
    const [redirect, setRedirect] = React.useState(false);
    const description = article.description.slice(0, 100) + '...';
    const preview = `${API}/api/articles/${article.pk}/images/preview/`;
    const handleOnClick = (event) => {
        article.views += 1;
        articleService.updateArticle(article);
        setRedirect(true); 
    } 
    if (!redirect) {
    return (
    <Paper 
        className={classes.mainFeaturesPost}
        style={{backgroundImage: `url(${preview})`}}>
        <Container fixed>
        <div className={classes.overlay} style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}></div>
            <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainFeaturesPostContent}>
                        <Typography
                            component="h1"
                            variant="h5"
                            color="inherit">
                                {article.title}
                        </Typography>
                        <Typography
                            color="inherit"
                            paragraph>
                                {description}
                        </Typography>
                        <Button onClick={handleOnClick} variant="contained" color="secondary">
                            Learn more
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </Container>
    </Paper>
    );
    } else {
        return <Redirect to={`/articles/${article.pk}/`}/>;
    }
}