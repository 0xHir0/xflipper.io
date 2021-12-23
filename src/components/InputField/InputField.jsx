import React from 'react';
import './InputField.scss';

const InputField = ({
  type,
  name,
  value,
  placeholder,
  handleChange,
  handleKeyPress,
  children,
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        autoComplete={'off'}
      />
      {children}
    </div>
  );
};

export default InputField;
