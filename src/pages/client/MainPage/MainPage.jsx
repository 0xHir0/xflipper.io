import React, { useState } from 'react';
import RootPage from '../RootPage';
import PageFooter from './partial/PageFooter';
import PageHeader from './partial/PageHeader';
import './MainPage.scss';

const MainPage = ({}) => {
  return (
    <RootPage>
      <div className='main-page'>
        <div className='page-container'>
          <PageHeader />
          <PageFooter />
        </div>
      </div>
    </RootPage>
  );
};

export default MainPage;
