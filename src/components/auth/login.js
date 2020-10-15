import React from 'react';
import { useAuth } from './auth';
import {
 Form,
 Button,
} from 'reactstrap';

export default function Login() {
  const { user, login, logout } = useAuth();

  if (user) {
    function handleLogout() {
      logout();
    }

    return (
      <Button color="primary" onClick={handleLogout}>Log Out</Button>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Pull value out so we can access form after the await
    const { target } = e;

    const { username, password } = target.elements;

    if (!await login(username.value, password.value))
    {
      target.reset();
    }
  }

  return (
    <Form className="login" onSubmit={handleSubmit}>
      <label>Username <input type="text" name="username" /></label>
      <label>Password <input type="password" name="password" /></label>
      <Button color="primary">Log In</Button>
    </Form>
  )
}


