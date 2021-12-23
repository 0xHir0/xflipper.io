import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../../../components/Modal';

const MemebershipModal = ({ handleCloseBtn }) => {
  return (
    <Modal
      message={'Ops...'}
      name={`It looks like you don't have a Membership Pass in your wallet`}
      description={`Don't worry! You can purchase it here: `}
      handleCloseBtn={handleCloseBtn}
    >
      <Link to='https://opensea.io/collection/rarityranker' target='_blank'>
        Download Metamask
      </Link>
    </Modal>
  );
};

export default MemebershipModal;
