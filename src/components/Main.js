import React from 'react';

import { 
  Button, 
  Typography, 
  Container, 
  Grid, makeStyles,
  Paper,
} from '@material-ui/core';

import Preview1 from './Preview1'
import Header from './Header';
import MainPreview from './MainPreview';
import ArticleService from './REST-API/ArticleService';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1)
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
  spacing2: {
    marginTop: theme.spacing(2)
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
  }
}));
 

const articleService = new ArticleService();

 
export default function Main(props) {
  const classes = useStyles();
  const token = props.token;
  const setToken = props.setToken;
  const [articles, setArticles] = React.useState(false);
  if (!articles) {
    const promises = articleService.getMostPopular();
    promises.then(data => { setArticles(data); });
  }
  return (
    <>
      <Header token={token} setToken={setToken}></Header>
      {
        articles && <MainPreview article={articles[0]}></MainPreview>
      }
      <div className={classes.mainContent} >
        <Paper style={{backgroundColor: "rgba(0, 0, 0, 0.05)", padding: "20px"}}>
          <Typography variant="h2" align="center" color="textPrimary">
            Web developer blog
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary">
            Read and share new perspectives on just about any topic. Everyone’s welcome.
          </Typography>
          <div className={classes.spacing2}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">Start now</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">Learn more</Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
        <Container maxWidth="lg">
          
          <Typography className={classes.spacing2} variant="h4" align="center" color="textPrimary">
            Most popular articles
          </Typography>
          <Container className={classes.cardGrid} maxWidth="lg">{
              articles &&
              <Grid container spacing={4}>{
                articles.map((article) => (
                <Grid item key={article.pk} xs={12} sm={12} md={4}>
                  <Preview1 article={{
                    pk: article.pk,
                    views: article.views,
                    likes: article.likes,
                    title: article.title,
                    dislikes: article.dislikes,
                    author_id: article.author_id,
                    created_at: article.created_at,
                    description: article.description}}>
                  </Preview1>
                </Grid>))}
              </Grid>
            }</Container>
        </Container>
      </div>
    <footer></footer>
    </>
  );
}