import React from 'react';
import { useAuth } from './auth';
import {
 Form,
 Button,
} from 'reactstrap';


export default function Register() {
  const { user, register, login, logout } = useAuth();

  if (user) {
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { target } = e;

    const { email, username, password } = target.elements;

    if (!await register(email.value, username.value, password.value))
    {
      target.reset();
    }
  }

  return (
    <Form className="register" onSubmit={handleSubmit}>
      <label>Email <input type="email" name="email" /></label>
      <label>Username <input type="text" name="username" /></label>
      <label>Password <input type="password" name="password" /></label>
      <button>Register</button>
    </Form>
  )
}