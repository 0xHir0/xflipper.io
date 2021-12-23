import React, { useContext } from 'react';
import RootPage from '../RootPage';
import MintInfo from './partial/MintInfo';
import './MintPage.scss';

const MintPage = () => {
  return (
    <RootPage>
      <MintInfo />
    </RootPage>
  );
};

export default MintPage;
