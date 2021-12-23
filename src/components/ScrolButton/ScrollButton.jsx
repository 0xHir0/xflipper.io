import React, { useState } from 'react';
import { ReactComponent as ArrowUpIcon } from '../../assets/icons/icon-arrow-up.svg';
import './ScrollButton.scss';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <div
      className='scroll-up'
      onClick={scrollToTop}
      style={{ display: visible ? 'flex' : 'none' }}
    >
      <ArrowUpIcon />
    </div>
  );
};

export default ScrollButton;
