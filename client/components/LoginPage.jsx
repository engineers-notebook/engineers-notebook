import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function validate() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    console.log('log in button clicked');
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;
    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('result: ', result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className="outerContainer">
      <div className="loginContainer">
        <input id="name" placeholder="username"></input>
        <input id="password" placeholder="password"></input>
        <button onClick={handleSubmit}>Log in</button>
      </div>
    </div>
  );
}

export default LoginPage;
