import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import { Switch,Route } from 'react-router-dom';
import Home from './pages/Home'
import Footer from './components/Footer'
import Tasks from './pages/Tasks';



function App() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route path="/pages/Home">
            <Home />
          </Route>
          <Route path="/pages/Tasks">
            <Tasks />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}



export default App;
