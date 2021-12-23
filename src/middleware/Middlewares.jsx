import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Middlewares = (props) => {
  const [needLoginPage, setNeedLoginPage] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('authToken')) {
      setNeedLoginPage(true);
    } else {
      setNeedLoginPage(false);
    }
  }, []);

  return (
    <>
      {needLoginPage && <Navigate to='/main' />}
      {!needLoginPage && <>{props.children}</>}
    </>
  );
};

export default Middlewares;
