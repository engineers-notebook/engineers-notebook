import React, { useState, useEffect, Fragment } from 'react';

const FrontendSteps = (props) => {
  const createdDivs = [];
  const [frontendData, setfrontendData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`/api/frontend/${props.cookieState}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setfrontendData(result[0]);
          setUserData(result[1]);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  for (let i = 0; i < frontendData.length; i += 1) {
    createdDivs.push(
      <div className="cards" key={`key${i}`} id={frontendData[i].id}>
        <div className="innerContainer">
          <div className="completedCheckboxParent">
            <label>Complete</label>
            <input
              type="checkbox"
              name={frontendData[i].iscompleted ? 'true' : 'false'}
            ></input>
          </div>
          <h1 className="innerContainerH1">{frontendData[i].title}</h1>
          <p>{frontendData[i].description}</p>
          <a href={frontendData[i].resources} target="_blank">
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

  for (let i = 0; i < userData.length; i += 1) {
    createdDivs.push(
      <div className="cards" key={`key${i}`} id={userData[i].id}>
      <div className="innerContainer">
        <div className="completedCheckboxParent">
          <label>Complete</label>
          <input
            className="checkbox"
            type="checkbox"
            name={userData[i].iscompleted ? 'true' : 'false'}
            ></input>
        </div>
        <h1 className="innerContainerH1">{userData[i].title}</h1>
        <p>{userData[i].description}</p>
        <a href={userData[i].resources} target="_blank">
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
    fetch(`/api/frontend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        resources,
        iscompleted: false,
        type: 'Frontend',
        name: props.cookieState
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
export default FrontendSteps;
