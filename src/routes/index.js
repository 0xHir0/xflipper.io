import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DAppProvider } from '@usedapp/core';
import ScrollButton from '../components/ScrolButton';
import retry from '../utils/retry';

const MainPage = lazy(() => retry(() => import('../pages/client/MainPage')));
const MintPage = lazy(() => retry(() => import('../pages/client/MintPage')));
const SearchPage = lazy(() =>
  retry(() => import('../pages/client/SearchPage'))
);

const AppRoutes = () => {
  return (
    <DAppProvider>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/mint' element={<MintPage />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
      <ScrollButton />
    </DAppProvider>
  );
};

export default AppRoutes;
