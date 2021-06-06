import React, { useState, useEffect } from 'react';
import APIURL from '../../Utilities/Environments';
import { RegisterDiv } from '../Styles/Index';

type Props = {
  token: string;
  fetchUsers: Function;
};

const Register = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');

  const handleUserSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetch(`${APIURL}/user/register`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          role: role,
          companyId: 1,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEmail(''),
          setPassword(''),
          setFirstName(''),
          setLastName(''),
          setRole('');
      })
      .then(() => {
        props.fetchUsers();
      })
      .catch((err) => console.log({ error: err }));
  };

  return (
    <RegisterDiv>
      <h1>Create Users</h1>
      <form onSubmit={handleUserSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            type='email'
            placeholder='email@test.com'
            value={email}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            type='password'
            minLength={5}
            placeholder='password'
            value={password}
            required
          />
        </div>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            name='firstName'
            minLength={1}
            placeholder='John'
            value={firstName}
            required
          />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            name='lastName'
            minLength={1}
            placeholder='Doe'
            value={lastName}
            required
          />
        </div>
        <div>
          <label htmlFor='role'>Role</label>
          <input
            onChange={(e) => setRole(e.target.value)}
            name='role'
            minLength={1}
            placeholder='Doe'
            value={role}
            required
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    </RegisterDiv>
  );
};

export default Register;
