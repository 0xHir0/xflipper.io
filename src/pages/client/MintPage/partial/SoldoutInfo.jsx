import React from 'react';
import { Link } from 'react-router-dom';

const SoldoutInfo = () => {
  return (
    <>
      <div className='step sold'>SOLD OUT</div>
      <div className='purchase-count'>
        Don't worry, you can find a Membership Pass on{' '}
        <Link to='' target='_blank'>
          Opensea
        </Link>
      </div>
    </>
  );
};

export default SoldoutInfo;
