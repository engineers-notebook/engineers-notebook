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
      <div className="cards" key={`key${i}`} id={frontendData[i].id}>
      <h1>{frontendData[i].title}</h1>
      <p>{frontendData[i].description}</p>
      <a href={frontendData[i].resources}>Documentation</a>
      <input type="checkbox" name={frontendData[i].iscompleted ? "true" : "false"}></input>
      </div>
    )
  }
  const handleSubmit = () => {
    const title = document.querySelector('#title').value
    const description = document.querySelector('#description').value
    const resources = document.querySelector('#resources').value
    fetch('/api/frontend', {
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
      <h3>Frontend Steps</h3>
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
export default FrontendSteps;

