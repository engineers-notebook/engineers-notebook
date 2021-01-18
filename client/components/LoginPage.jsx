import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function validate() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    return event.preventDefault();
  }

  return (
    <div className="outerContainer">
      <div className="loginContainer">
        <input id="username" placeholder="username"></input>
        <input id="password" placeholder="password"></input>
        <button onClick={handleSubmit}>Log in</button>
      </div>
    </div>
  );
}

export default LoginPage;
