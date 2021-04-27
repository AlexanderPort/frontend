import React from 'react';
import ReactDOM from 'react-dom';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/third_party/image_tui.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/js/third_party/spell_checker.min.js';
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/js/third_party/font_awesome.min.js';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

import Header from './Header';
import ArticleService from './REST-API/ArticleService';
import {
  TextareaAutosize,
  TextField,
  IconButton,
  Typography, 
  Container, 
  Avatar,
  Grid,
  Box,
  makeStyles
} from '@material-ui/core';

import {
  useParams,
  Redirect
} from "react-router-dom";

import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(9),
  },
  titleArea: {
    maxWidth: "lg",
    rows: "12",
    variant: 'filled'
  },
  descriptionArea: {

  },

}));

const articleService = new ArticleService();

export default function Article(props) {
  const params = useParams();
  const classes = useStyles();
  const pk = params.pk;
  const token = props.token;
  const setToken = props.setToken;
  const [state, setState] = React.useState({});
  if (!('pk' in state)) {
    const promise = articleService.getArticle(pk);
    promise.then((article) => {
      setState({pk: article.pk, title: article.title,
                description: article.description,
                author: article.author, model: article.text});
    });
  }
  
  return (
  <>
    <Header token={token} setToken={setToken}></Header>
    <Container className={classes.content} maxWidth="lg">
        <FroalaEditorView model={state.model} />
    </Container>
  </>
  );
}