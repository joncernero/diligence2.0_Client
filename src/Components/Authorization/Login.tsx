import React, { useState, useEffect } from 'react';
import APIURL from '../../Utilities/Environments';
import { useHistory } from 'react-router-dom';
import { LoginDiv } from '../Styles/Index';

type Props = {
  updateToken: (newToken: string) => void;
};

const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sessionToken) {
          props.updateToken(data.sessionToken);
          localStorage.setItem('token', data.sessionToken);
          if (data.user.role === 'admin') {
            history.push('/admin');
            return;
          }
          history.push('/dashboard');
          // localStorage.setItem('role', data.user.role);
        } else {
          resetState();
        }
      })
      .catch((err) => console.log({ error: err }));
  };

  const resetState = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <LoginDiv>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
          <button type='submit'>Login</button>
        </div>
      </form>
    </LoginDiv>
  );
};

export default Login;
