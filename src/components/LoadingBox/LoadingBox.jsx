import React from 'react';
import './LoadingBox.scss';

const LoadingBox = ({ width, height, borderWidth }) => {
  return (
    <div className='loading-box'>
      <div
        className='loader'
        style={{ width: width, height: height, borderWidth: borderWidth }}
      >
        {/* <SpinnerIcon /> */}
      </div>
      <div className='text'>Loading ...</div>
    </div>
  );
};

export default LoadingBox;
