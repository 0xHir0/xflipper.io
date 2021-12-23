import React from 'react';
import './Tooltip.scss';

const Tooltip = ({ children, title, text, ...rest }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className='tooltip-container'>
      <div className={show ? 'tooltip-box visible' : 'tooltip-box'}>
        <div className='tooltip-content'>
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
        <span className='tooltip-arrow' />
      </div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
