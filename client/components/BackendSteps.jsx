import React, { useState, useEffect, Fragment } from 'react';

function BackendSteps() {
  const createdDivs = [];
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api/backend")
      .then((res) => res.json())
      .then((result) => {
          console.log('result: ', result)
          setBackendData(result);
        },
          (error) => {
            console.log(error);
        })
  }, [])

  for (let i = 0; i < backendData.length; i+=1) {
    createdDivs.push(
      <div key={`key${i}`} id={backendData[i].id}>
      <h1>{backendData[i].title}</h1>
      <p>{backendData[i].description}</p>
      <a href={backendData[i].resources}>Documentation</a>
      <input type="checkbox" name={backendData[i].iscompleted ? "true" : "false"}></input>
      </div>
    )
  }

  return (
    <Fragment>
      <h3>Backend Steps</h3>
      {createdDivs}
    </Fragment>
  );
}
export default BackendSteps;
