import React, { useState } from 'react';
import { ReactComponent as SpinnerIcon } from '../../assets/icons/icon-spinner.svg';
import './Suspense.scss';

const SuspenseFallback = () => {
  return (
    <div className='spinner-container'>
      <SpinnerIcon />
    </div>
  );
};

export default SuspenseFallback;
