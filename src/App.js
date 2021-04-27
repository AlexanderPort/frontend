
import logo from './logo.svg';
import './App.css';
import React from 'react';
import Main from './components/Main';
import Author from './components/Author';
import Editor from './components/Editor';
import Article from './components/Article';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";


const history = createBrowserHistory();
 
function App() {
  const [token, setToken] = React.useState(0);
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path='/users/:pk/' exact={true}><Author token={token} setToken={setToken} exact={true}/></Route>
          <Route path='/editor/:pk/' exact={true}><Editor token={token} setToken={setToken} exact={true}/></Route>
          <Route path='/articles/:pk/' exact={true}><Article token={token} setToken={setToken} exact={true}/></Route>
          <Route path='/' exact={true}><Main token={token} setToken={setToken}/></Route>
        </Switch>
      </div>
      
    </Router>
    );
}

export default App;
