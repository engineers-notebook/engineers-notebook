import React, { useState, useEffect } from 'react';

/* Title within navbar */
const TaskCategory = (props) => {

  return (
    <main>
      <div className={props.type}>
        <h1 id={props.type} className="navbarTitle">{props.type}</h1>
      </div>
    </main>
  );
}
export default TaskCategory;