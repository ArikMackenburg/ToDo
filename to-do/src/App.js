import React from 'react';
import './App.css';
import Header from './components/Header'
import { Switch,Route } from 'react-router-dom';
import Home from './Home'
import Footer from './components/Footer'
import Tasks from './Tasks';
import Nav from './components/Nav';


const taskList = [
  {task:"Do Stuff", complete:true},
  {task:"Do More Stuff", complete:true},
  {task:"Do Even More Stuff", complete:true},
  {task:"Do Even More More Stuff", complete:false}
]


function App() {
  return (
    <div>
      <Nav />
      <Header />
      <div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/Tasks">
            <Tasks tasks={ taskList } />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}



export default App;
