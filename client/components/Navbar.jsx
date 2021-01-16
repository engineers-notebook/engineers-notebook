import React, { useState } from 'react';
import '../styles/Navbar.css';
import Webpack from './Webpack.jsx';
import Frontend from './Frontend.jsx';
import Backend from './Backend.jsx';
import WebpackSteps from './WebpackSteps.jsx';

// import hook
import useToggle from '../hooks/useToggle';

function Navbar() {
  const [theState, toggleIsTheState] = useToggle();

  return (
    <div>
      <div className="container">
        {/* <div if webpack is clicked, then change the state of webpack to true and then display component> */}
        <div>
          <h1 onClick={toggleIsTheState}>
            <Webpack />
          </h1>
        </div>
        <div>
          <h1 onClick={toggleIsTheState}>
            <Frontend />
          </h1>
        </div>
        <div>
          <h1 onClick={toggleIsTheState}>
            <Backend />
          </h1>
        </div>
      </div>
      <div className="grid-container">
        {/* {if state is true => display / wrap in css grid } */}
        {theState ? <WebpackSteps /> : null}
      </div>
    </div>
  );
}
export default Navbar;
