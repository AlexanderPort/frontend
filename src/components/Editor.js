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
  Button,
  TextField,
  IconButton,
  Typography, 
  Container, 
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
  editor: {
    marginTop: theme.spacing(3),
  }

}));

const articleService = new ArticleService();

export default function Editor(props) {
  const params = useParams();
  const classes = useStyles();
  const pk = params.pk;
  const profile = props.profile;
  const token = props.token;
  const setToken = props.setToken;
  const [state, setState] = React.useState(
    {title: '', description: '', model: '', images: [], preview: undefined});
  
  function handleModelChange(model) {
    setState({model: model,
              title: state.title, 
              images: state.images,
              preview: state.preview,
              description: state.description});
  }
  const createNewArticle = () => {
    const data = new FormData();
    const promises = Promise.all(
      state.images.map(
        item => fetch(item.src)
          .then(response => response.blob())
          .then(blob => {
            const name = `${item.src}.${blob.type.split('/')[1]}`;
            const file = {
              image: new File([blob], name, {type: blob.type}),
              src: item.src, type: blob.type, name: name};
            return file;
          }
        )
      )
    )
    promises.then(values => {
      let model = state.model;
      values.forEach((value) => {
        data.append('images', value.image);
        model = model.replaceAll(value.src, value.name);
      });
      data.append('pk', pk);
      data.append('model', model);
      data.append('title', state.title);
      data.append('preview', state.preview);
      data.append('description', state.description);
      articleService.createArticle(data);
    });    
  }
  const config = {
    imageUpload: true,
    imageDefaultAlign: 'left',
    imageMaxSize: 1024 * 1024 * 1024,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    events: {
      'image.inserted': function(images) {
        for (let i = 0; i < images.length; i++) {
          state.images.push(images[i]);
        }
      }
    }
  }
  const handleChangeTitle = (event) => {
    setState({model: state.model,
              images: state.images,
              preview: state.preview,
              title: event.target.value,
              description: state.description});
  }
  const handleChangeDescription = (event) => {
    setState({model: state.model,
              title: state.title, 
              images: state.images,
              preview: state.preview,
              description: event.target.value});
  }
  const handleChangePreview = (event) => {
    setState({model: state.model,
              title: state.title, 
              images: state.images,
              preview: event.target.files[0],
              description: state.description});
  }
  return (
    <>
    {
      !profile && 
      <>
      <Header token={token} setToken={setToken}></Header>
      <Container className={classes.content}></Container>
      </>
    }
    {
      (token == pk) && 
      <>
      <Container maxWidth="md">
      <IconButton onClick={createNewArticle}><AddIcon></AddIcon><Typography>  Create new article</Typography></IconButton>
      <TextField type='text' variant='filled' rowsMax="1" label="Title" fullWidth multiline onChange={handleChangeTitle}/>
      <TextField type='text' variant='filled' rowsMax="3" label="Description" fullWidth multiline onChange={handleChangeDescription}/>
      <Button variant="contained" component="label" fullWidth>
        Upload preview image<input type="file" hidden onChange={handleChangePreview}/>
      </Button>
      </Container>
      <Container className={classes.editor} maxWidth="md">
        <FroalaEditor tag='textarea' config={config} onModelChange={handleModelChange}/>
      </Container>
      </>
    }
    {
      (token != pk) && <Typography variant='h3' align='center'>
        To create new article you should sign in</Typography>
    }
    </>
  )
}