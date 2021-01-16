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
      <div className="cards" key={`key${i}`} id={webpackData[i].id}>
      <h1>{webpackData[i].title}</h1>
      <p>{webpackData[i].description}</p>
      <a href={webpackData[i].resources}>Documentation</a>
      <input type="checkbox" name={webpackData[i].iscompleted ? "true" : "false"}></input>
      </div>
    )
  }
  const handleSubmit = () => {
    const title = document.querySelector('#title').value
    const description = document.querySelector('#description').value
    const resources = document.querySelector('#resources').value
    fetch('/api/webpack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, resources, iscompleted: false })
    })
    .then(res => console.log('res: ', res))
    .catch(error => console.log('error: ', error))
    location.reload();
  }
  return (
    <Fragment>
      <h3>Webpack Steps</h3>
      {createdDivs}
      <div className="cards">
        <input id="title" placeholder="Title"></input>
        <input id="description" placeholder="Description"></input>
        <input id="resources" placeholder="Resources"></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </Fragment>
  );
}
export default WebpackSteps;
