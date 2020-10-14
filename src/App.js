import React from 'react';
import './App.css';
import Header from './components/Header'
import { Switch,Route } from 'react-router-dom';
import Home from './Home'
import Footer from './components/Footer'
import Tasks from './Tasks';
import Nav from './components/Nav';





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
            <Tasks />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}



export default App;
