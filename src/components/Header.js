import React from "react"
import Jumbotron from 'react-bootstrap/Jumbotron'
import { useAuth } from './auth/auth';


export default function Header() {
  const { user } = useAuth();
  return (
    <div>
      <Jumbotron className='jumbo'>
        <h1>To Do App! {user ? `Welcome, ${user.username.toUpperCase()}` : ''}</h1>
      </Jumbotron>
    </div>
    
   
  );
}
