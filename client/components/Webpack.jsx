import React, { useState } from "react";
import "../styles/Webpack.css"
import useToggle from '../hooks/useToggle';

function Webpack () {
  const [theState, toggleIsTheState] = useToggle(true);
    return(
        <div className='webpack'>
            <h1 onClick={toggleIsTheState}>{theState ? 'true' : 'false'}</h1>
        </div>

    )
}
export default Webpack;