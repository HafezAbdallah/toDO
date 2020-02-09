import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import ToDo from '../components/ToDO/toDo';
import Posts from '../components/Posts/posts';
function App() {
  return (
    <Router>

        <Switch>
                  <Route exact path="/">
                    <ToDo/>
                  </Route>
                  <Route exact path="/Posts">
                  <Posts/>
                  </Route>
                
                 
         </Switch>


    </Router>
  );
}

export default App;
