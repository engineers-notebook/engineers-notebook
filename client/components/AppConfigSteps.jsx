import React, { useState, useEffect, Fragment } from 'react';

const AppConfigSteps = () => {
  /* variable and state declaration */
  const createdDivs = [];
  const [appConfigData, setAppConfigData] = useState([]);

  /*
    * similar to component life cycle method.
    * onload, the page will make a fetch request, and set it as state under appConfigData
  */
  useEffect(() => {
    fetch('/api/appconfig')
      .then((res) => res.json())
      .then(
        (result) => {
          setAppConfigData(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  /* iterating through the appConfigData to create the divs */
  for (let i = 0; i < appConfigData.length; i += 1) {
    createdDivs.push(
      <div className="cards" key={`key${i}`} id={appConfigData[i].id}>
        <div className="innerContainer">
          <div className="completedCheckboxParent">
            <label>Complete</label>
            <input
              type="checkbox"
              name={appConfigData[i].iscompleted ? 'true' : 'false'}
            ></input>
          </div>

          <h1 className="innerContainerH1">{appConfigData[i].title}</h1>
          <p>{appConfigData[i].description}</p>
          <img
            id="pointer"
            src="https://cdn.iconscout.com/icon/free/png-256/right-arrow-1438234-1216195.png"
          />
        </div>
      </div>
    );
  }

  return <Fragment>{createdDivs}</Fragment>;
}
export default AppConfigSteps;
