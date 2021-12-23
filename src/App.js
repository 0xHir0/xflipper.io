import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import Middlewares from './middleware';
import ErrorPage from './components/ErrorPage';
import SuspenseFallback from './components/SuspenseFallback';
import AppRoutes from './routes';
import './styles/app.scss';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      {/* <Middlewares> */}
      <BrowserRouter>
        <Suspense fallback={<SuspenseFallback />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
      {/* </Middlewares> */}
    </ErrorBoundary>
  );
};

export default App;
