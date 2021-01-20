import React, { useState, useEffect, Fragment } from 'react';


const BackendSteps = (props) => {
  /* variable and state declaration */
  const createdDivs = [];
  const [backendData, setBackendData] = useState([]);
  const [userData, setUserData] = useState([]);

  /*
    * similar to component life cycle method.
    * onload, the page will make a fetch request, and set it as state under backendData
  */
  useEffect(() => {
    fetch(`/api/backend/${props.cookieState}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('result: ', result);
          setBackendData(result[0]);
          setUserData(result[1]);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  /* iterating thorough backendData to create the divs  */

  for (let i = 0; i < backendData.length; i += 1) {
    createdDivs.push(
      <div className="cards" key={`key${i}`} id={backendData[i].id}>
        <div className="innerContainer">
          <div className="completedCheckboxParent">
            <label>Complete</label>
            <input
              className="checkbox"
              type="checkbox"
              name={backendData[i].iscompleted ? 'true' : 'false'}
            ></input>
          </div>
          <h1 className="innerContainerH1">{backendData[i].title}</h1>
          <p>{backendData[i].description}</p>
          <a href={backendData[i].resources} target="_blank">
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
  /* creating user data  */
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

  /* creates a new card on submit */

  const handleSubmit = () => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const resources = document.querySelector('#resources').value;
    fetch('/api/backend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        resources,
        iscompleted: false,
        type: 'Backend',
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
          <h1 className="addYourOwn">Add Your Own Card</h1>
          <input id="title" placeholder="Title"></input>
          <input id="description" placeholder="Description"></input>
          <input id="resources" placeholder="Resources"></input>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </Fragment>
  );
}
export default BackendSteps;
