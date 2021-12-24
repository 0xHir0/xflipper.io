import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import { EtherContext } from './Context';

const RootPage = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [isMainnet, setIsMainnet] = useState(true);
  const [status, setStatus] = useState();
  const [tokenId, setTokenId] = useState('');
  const [sortByOrder, setSortByOrder] = useState('Rank-High to Low');
  const [showPerPage, setShowPerPage] = useState('30');
  const [page, setPage] = useState('1');
  const [nftContractAddress, setNftContractAddress] = useState(''); // NFT contract search bar of Search Page

  const [pageOptions, setPageOptions] = useState(
    Array.from({ length: 500 }, (_, i) => (i + 1).toString())
  );
  const [totalCount, setTotalCount] = useState(0);

  return (
    <EtherContext.Provider
      value={{
        isMainnet,
        loggedIn,
        status,
        nftContractAddress,
        showRanking,
        tokenId,
        sortByOrder,
        showPerPage,
        page,
        pageOptions,
        totalCount,
        setIsMainnet,
        setLoggedIn,
        setStatus,
        setNftContractAddress,
        setShowRanking,
        setTokenId,
        setSortByOrder,
        setShowPerPage,
        setPage,
        setPageOptions,
        setTotalCount,
      }}
    >
      <Header />
      {children}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        autoDismiss={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        icon={true}
        theme={'dark'}
        pauseOnHover={false}
        rtl={false}
      />
    </EtherContext.Provider>
  );
};

export default RootPage;
