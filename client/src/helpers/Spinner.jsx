import React from 'react';
import spinner from "../assets/spinner.gif";

function Spinner(props) {
    let {height, width} = props;
  return (
    <div className='flex justify-center items-center'>
        <img src={spinner} alt="loading" height={height} width={width}/>
    </div>
  )
}

export default Spinner