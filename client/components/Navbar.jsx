import React, { useState, useEffect } from 'react';
import '../styles/index.css';
import Webpack from './Webpack.jsx';
import Frontend from './Frontend.jsx';
import Backend from './Backend.jsx';
import WebpackSteps from './WebpackSteps.jsx';
import FrontendSteps from './FrontendSteps.jsx';
import BackendSteps from './BackendSteps.jsx';
import AppConfig from './AppConfig.jsx'
import AppConfigSteps from './AppConfigSteps.jsx'

const Navbar = () => {
  /* create different state hooks */
  const [webpackState, toggleWebpackState] = useState(false);
  const [frontendState, toggleFrontendState] = useState(false);
  const [backendState, toggleBackendState] = useState(false);
  const [appConfigState, toggleAppConfigState] = useState(false);
  const [cookieState, setCookieState] = useState('');

  /* on page load, we create a cookie with the users name that stays persistent and use it to check against backend */
  useEffect(() => {
    fetch('/api/getCookie')
      .then(res => res.json())
      .then(data => setCookieState(data.username));
  }, []);

  /* check to see which navbar item is currently selected */
  const webpackChecker = () => {
    webpackState ? toggleWebpackState(false) : toggleWebpackState(true);
    toggleBackendState(false);
    toggleFrontendState(false);
    toggleAppConfigState(false)
  }

  const frontEndChecker = () => {
    frontendState ? toggleFrontendState(false) : toggleFrontendState(true);
    toggleWebpackState(false);
    toggleBackendState(false);
    toggleAppConfigState(false)
  }

  const backendChecker = () => {
    backendState ? toggleBackendState(false) : toggleBackendState(true);
    toggleFrontendState(false);
    toggleWebpackState(false);
    toggleAppConfigState(false)
  }
  const AppConfigChecker = () => {
    appConfigState ? toggleAppConfigState(false) : toggleAppConfigState(true);
    toggleFrontendState(false);
    toggleWebpackState(false);
    toggleBackendState(false);
  }
  /*
    * cookieState is the username which is eventually passed down
    * stays persistent so the frontend can keep track of the current logged in user
  */
  return (
    <div>
      <div className="welcome">Welcome {cookieState}</div>
      <div className="container">
        <div>
          <h1 onClick={AppConfigChecker}>
            <AppConfig />
          </h1>
        </div>
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
        {webpackState ? <WebpackSteps cookieState={cookieState}/> : null}
        {frontendState ? <FrontendSteps cookieState={cookieState}/> : null}
        {backendState ? <BackendSteps cookieState={cookieState}/> : null}
        {appConfigState ? <AppConfigSteps /> : null}
      </div>
    </div>
  )
}


export default Navbar;
