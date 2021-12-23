import React, { useContext, useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { EtherContext } from '../Context';
import RootPage from '../RootPage';
import RankingPanel from './partial/RankingPanel';
import SearchBar from './partial/SearchBar';
import SearchOption from './partial/SearchOption';
import './SearchPage.scss';

const SearchPage = ({}) => {
  const { account } = useEthers();
  const [membershipPass, setMembershipPass] = useState(false);

  const handleCloseBtn = () => {
    setMembershipPass(true);
  };

  useEffect(() => {
    setMembershipPass(false);
  }, []);

  return (
    <RootPage>
      <div className='search-page'>
        <SearchBar />
        <SearchOption />
        {account && <RankingPanel />}
        {/* {membershipPass ? <NoContractPanel /> : <RankingPanel />} */}
      </div>
      {/* {!membershipPass && <MemebershipModal handleCloseBtn={handleCloseBtn} />} */}
    </RootPage>
  );
};

export default SearchPage;
