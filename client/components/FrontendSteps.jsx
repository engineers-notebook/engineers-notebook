import React, { useState, useEffect, Fragment } from 'react';

function FrontendSteps() {
  const createdDivs = [];
  const [frontendData, setfrontendData] = useState([]);

  useEffect(() => {
    fetch("/api/frontend")
      .then((res) => res.json())
      .then((result) => {
          console.log('result: ', result)
          setfrontendData(result);
        },
          (error) => {
            console.log(error);
        })
  }, [])

  for (let i = 0; i < frontendData.length; i+=1) {
    createdDivs.push(
      <div key={`key${i}`} id={frontendData[i].id}>
      <h1>{frontendData[i].title}</h1>
      <p>{frontendData[i].description}</p>
      <a href={frontendData[i].resources}>Documentation</a>
      <input type="checkbox" name={frontendData[i].iscompleted ? "true" : "false"}></input>
      </div>
    )
  }

  return (
    <Fragment>
      <h3>Frontend Steps</h3>
      {createdDivs}
    </Fragment>
  );
}
export default FrontendSteps;