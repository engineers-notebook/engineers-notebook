import React, { useState, useEffect, Fragment } from 'react';
import '../styles/Webpack.css';

const WebpackSteps = () => {
  const createdDivs = [];
  const [webpackData, setWebpackData] = useState([]);

  useEffect(() => {
    fetch('/api/webpack')
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('result: ', result);
          setWebpackData(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  for (let i = 0; i < webpackData.length; i += 1) {
    createdDivs.push(
      <div className="cards" key={`key${i}`} id={webpackData[i].id}>
        <div className="innerContainer">
          <div className="completedCheckboxParent">
            <label>Complete</label>
            <input
              className="checkbox"
              type="checkbox"
              name={webpackData[i].iscompleted ? 'true' : 'false'}
            ></input>
          </div>
          <h1 className="innerContainerH1">{webpackData[i].title}</h1>
          <p>{webpackData[i].description}</p>
          <a href={webpackData[i].resources} target="_blank">
            Documentation
          </a>
          <img
            id="pointer"
            src="https://cdn.iconscout.com/icon/free/png-256/right-arrow-1438234-1216195.png"
          />
        </div>
      </div>
    );
  }
  const handleSubmit = () => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const resources = document.querySelector('#resources').value;
    fetch('/api/webpack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        resources,
        iscompleted: false,
      }),
    })
      .then((res) => console.log('res: ', res))
      .catch((error) => console.log('error: ', error));
    location.reload();
  };
  return (
    <Fragment>
      {createdDivs}
      <div className="cards">
        <div className="inputForm">
          <p>Add Your Own Card</p>
          <input id="title" placeholder="Title"></input>
          <input id="description" placeholder="Description"></input>
          <input id="resources" placeholder="Resources"></input>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </Fragment>
  );
}
export default WebpackSteps;
