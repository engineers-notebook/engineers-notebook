import React, { useState, useEffect, Fragment } from 'react';

function AppConfigSteps() {
  const createdDivs = [];
  const [appConfigData, setAppConfigData] = useState([]);

  useEffect(() => {
    fetch("/api/frontend")
      .then((res) => res.json())
      .then((result) => {
          console.log('result: ', result)
          setAppConfigData(result);
        },
          (error) => {
            console.log(error);
        })
  }, [])

  for (let i = 0; i < appConfigData.length; i+=1) {
    createdDivs.push(
      <div className="cards" key={`key${i}`} id={appConfigData[i].id}>
      <h1>{appConfigData[i].title}</h1>
      <p>{appConfigData[i].description}</p>
      <a href={appConfigData[i].resources}>Documentation</a>
      <input type="checkbox" name={appConfigData[i].iscompleted ? "true" : "false"}></input>
      </div>
    )
  }

  return (
    <Fragment>
      <h3>AppConfig Steps</h3>
      {createdDivs}
    </Fragment>
  );
}
export default AppConfigSteps;