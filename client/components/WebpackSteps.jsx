import React, { useState, useEffect, Fragment } from 'react';

function WebpackSteps() {
  const createdDivs = [];

  const valueArray = ['1', '2', '3']

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
        }
        )
  }, [])
      console.log('webpackdata ', webpackData);

  return (
    <Fragment>
      <div>
        <h4>AAAAA</h4>
      </div>
      <div>
        <h4>Step2</h4>
      </div>
      <div>
        <h4>Step3</h4>
      </div>
      <div>
        <h4>Step4</h4>
      </div>
      <div>
        <h4>Step5</h4>
      </div>
      <div>
        <h4>Step6</h4>
      </div>
    </Fragment>
  );
}
export default WebpackSteps;
