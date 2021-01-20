import React, { useState, useEffect } from 'react';
import '../styles/index.css';
// import Webpack from './Webpack.jsx';
// import Frontend from './Frontend.jsx';
// import Backend from './Backend.jsx';
// import WebpackSteps from './WebpackSteps.jsx';
// import FrontendSteps from './FrontendSteps.jsx';
// import BackendSteps from './BackendSteps.jsx';
import TaskCategory from './TaskCategory.jsx'
import TaskCategorySteps from './TaskCategorySteps.jsx'

const Navbar = () => {
  /* create different state hooks */
  // const [webpackState, toggleWebpackState] = useState(false);
  // const [frontendState, toggleFrontendState] = useState(false);
  // const [backendState, toggleBackendState] = useState(false);
  // const [appConfigState, toggleAppConfigState] = useState(false);
  const [taskCategories, setTaskCategories] = useState(['AppConfig', 'Webpack', 'Backend', 'Frontend']);
  const [currentTaskCat, toggleCurrentTask] = useState('')
  const [cookieState, setCookieState] = useState('');

  /* on page load, we create a cookie with the users name that stays persistent and use it to check against backend */
  useEffect(() => {
    fetch('/api/getCookie')
      .then(res => res.json())
      .then(data => setCookieState(data.username));
  }, []);

  /* check to see which navbar item is currently selected */
  // const webpackChecker = () => {
  //   webpackState ? toggleWebpackState(false) : toggleWebpackState(true);
  //   toggleBackendState(false);
  //   toggleFrontendState(false);
  //   toggleAppConfigState(false)
  // }

  // const frontEndChecker = () => {
  //   frontendState ? toggleFrontendState(false) : toggleFrontendState(true);
  //   toggleWebpackState(false);
  //   toggleBackendState(false);
  //   toggleAppConfigState(false)
  // }

  // const backendChecker = () => {
  //   backendState ? toggleBackendState(false) : toggleBackendState(true);
  //   toggleFrontendState(false);
  //   toggleWebpackState(false);
  //   toggleAppConfigState(false)
  // }
  const taskChecker = (e) => {
    console.log(e.target, 'maybe?')
    toggleCurrentTask(e.target.id)
  }
  /*
    * cookieState is the username which is eventually passed down
    * stays persistent so the frontend can keep track of the current logged in user
  */
  const catButtons = [];
  taskCategories.forEach((category, index) => {
    catButtons.push(<div>
      <h1 id={category} onClick={taskChecker}>
        <TaskCategory key={`button${category}${index}`} type={category} />
      </h1>
    </div>)
  });
const currentTaskShow = [];
  if (currentTaskCat.length > 1) {
    currentTaskShow.push(<div className="grid-container">
        <TaskCategorySteps key={`Steps${currentTaskCat}`} cookieState={cookieState} type={currentTaskCat}/>
    </div>)
  }
  return (
    <div>
      <div className="welcome">Welcome {cookieState}</div>
      <div className="container">
        {catButtons}
        {/* <div>
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
        </div> */}
      </div>
        {currentTaskShow}
      {/* <div className="grid-container">
        {webpackState ? <WebpackSteps cookieState={cookieState}/> : null}
        {frontendState ? <FrontendSteps cookieState={cookieState}/> : null}
        {backendState ? <BackendSteps cookieState={cookieState}/> : null}
        {appConfigState ? <AppConfigSteps /> : null}
      </div> */}
    </div>
  )
}


export default Navbar;
