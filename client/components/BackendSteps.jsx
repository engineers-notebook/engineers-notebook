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
      <div className="cards" key={`key${i}`} id={backendData[i].id}>
      <h1>{backendData[i].title}</h1>
      <p>{backendData[i].description}</p>
      <a href={backendData[i].resources}>Documentation</a>
      <input type="checkbox" name={backendData[i].iscompleted ? "true" : "false"}></input>
      </div>
    )
  }
  const handleSubmit = () => {
    const title = document.querySelector('#title').value
    const description = document.querySelector('#description').value
    const resources = document.querySelector('#resources').value
    fetch('/api/backend', {
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
      <h3>Backend Steps</h3>
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
export default BackendSteps;
