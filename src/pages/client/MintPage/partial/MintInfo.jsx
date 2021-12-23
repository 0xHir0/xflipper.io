import React, { useContext, useState } from 'react';
import Selectbox from '../../../../components/Selectbox';
import Button from '../../../../components/Button';
import { EtherContext } from '../../Context';
import SoldoutInfo from './SoldoutInfo';
import { useEthers } from '@usedapp/core';

const options = ['1', '2', '3'];
const defaultOption = options[0];

const MintInfo = ({}) => {
  const { account } = useEthers();

  const [mintNFT, setMintNFT] = useState(false);

  const handleMintButton = () => {
    setMintNFT(true);
  };

  return (
    <div className='mint-page'>
      <div className='title'>Mint a Membership Pass</div>
      <div className='mint-info'>
        {!mintNFT ? (
          <>
            <div className='step'>32/50</div>
            <div className='sub-title'>
              1 Lifetime xFlipper Membership Pass = 0.5 ETH
            </div>
            <div className='purchase-count'>
              How many passes do you want to purchase? (max 3)
            </div>
            <Selectbox options={options} value={defaultOption} />
            <Button
              className='btn-primary'
              title='Mint'
              disabled={!account && true}
              handleClick={handleMintButton}
            />
            <div className='trade-text'>
              A Membership Pass is an NFT token and can be traded in OpenSea.
            </div>
          </>
        ) : (
          <SoldoutInfo />
        )}
      </div>
    </div>
  );
};

export default MintInfo;
