import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Selectbox.scss';

const Selectbox = ({ options, disabled, value, placeholder, handleChange }) => {
  return (
    <Dropdown
      className='selectbox'
      options={options}
      onChange={handleChange}
      value={value}
      disabled={disabled}
      arrowClosed={<span className='arrow-closed' />}
      arrowOpen={<span className='arrow-open' />}
      placeholder='Select an option'
    />
  );
};

export default Selectbox;
