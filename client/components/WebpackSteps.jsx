import React, { useState, useEffect, Fragment } from 'react';

function WebpackSteps() {
  const createdDivs = [];
  const [webpackData, setWebpackData] = useState([]);

  useEffect(() => {
    fetch("/api/webpack")
      .then((res) => res.json())
      .then((result) => {
          console.log('result: ', result)
          setWebpackData(result);
        },
          (error) => {
            console.log(error);
        })
  }, [])

  for (let i = 0; i < webpackData.length; i+=1) {
    createdDivs.push(
      <div key={`key${i}`} id={webpackData[i].id}>
      <h1>{webpackData[i].title}</h1>
      <p>{webpackData[i].description}</p>
      <a href={webpackData[i].resources}>Documentation</a>
      <input type="checkbox" name={webpackData[i].iscompleted ? "true" : "false"}></input>
      </div>
    )
  }

  return (
    <Fragment>
      {createdDivs}
    </Fragment>
  );
}
export default WebpackSteps;
