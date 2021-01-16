import React, { useState } from 'react';
import '../styles/Navbar.css';
import Webpack from './Webpack.jsx';
import Frontend from './Frontend.jsx';
import Backend from './Backend.jsx';
import WebpackSteps from './WebpackSteps.jsx';
import FrontendSteps from './FrontendSteps.jsx';
import BackendSteps from './BackendSteps.jsx';

// import hook
import useToggle from '../hooks/useToggle';

function Navbar() {
  const [webpackState, toggleWebpackState] = useState(false);
  const [frontendState, toggleFrontendState] = useState(false);
  const [backendState, toggleBackendState] = useState(false);

  const webpackChecker = () => {
    webpackState ? toggleWebpackState(false) : toggleWebpackState(true);
    toggleBackendState(false);
    toggleFrontendState(false);
  }

  const frontEndChecker = () => {
    frontendState ? toggleFrontendState(false) : toggleFrontendState(true);
    toggleWebpackState(false);
    toggleBackendState(false);
  }

  const backendChecker = () => {
    backendState ? toggleBackendState(false) : toggleBackendState(true);
    toggleFrontendState(false);
    toggleWebpackState(false);

  return (
    <div>
      <div className="container">
        {/* <div if webpack is clicked, then change the state of webpack to true and then display component> */}
        <div>
          <h1 onClick={webpackChecker}>
            <Webpack />
          </h1>
        </div>
        <div>
          <h1 onClick={frontEndChecker}>
            <Frontend />
          </h1>
        </div>
        <div>
          <h1 onClick={backendChecker}>
            <Backend />
          </h1>
        </div>
      </div>
      <div className="grid-container">
        {/* {if state is true => display / wrap in css grid } */}
        {webpackState ? <WebpackSteps /> : null}
        {frontendState ? <FrontendSteps /> : null}
        {backendState ? <BackendSteps /> : null}
      </div>
    </div>
  );
}
export default Navbar;
