import React, { useContext } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { useEthers } from '@usedapp/core';
import { toast } from 'react-toastify';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import { EtherContext } from '../../Context';

const SearchBar = () => {
  const {
    sortByOrder,
    loggedIn,
    setLoggedIn,
    setShowRanking,
    nftContractAddress,
    setNftContractAddress,
  } = useContext(EtherContext);

  const { account, activateBrowserWallet } = useEthers();

  const handleChange = (e) => {
    setNftContractAddress(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleClick();
  };

  const handleClick = async () => {
    if (nftContractAddress) {
      await activateBrowserWallet();

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });

      sessionStorage.clear();
      try {
        account &&
          window.location.pathname.indexOf('search') >= 0 &&
          (await axios
            .get(`https://api.xflipper.io/user/${accounts[0]}`)
            .then(async (response) => {
              const { message, signature } = await getSignature({
                message: response.data.nonce,
              });

              console.log("SORTBYORDER", sortByOrder);
              // Set the auth-token on sessionStorage
              sessionStorage.setItem('signature', signature);
              setLoggedIn(true);
              setShowRanking(true);
            })
            .catch((error) => {
              setLoggedIn(false);

              if (error.response) {
                console.log('Error', error.response.status);
                toast.error('API not found', {
                  appearance: 'error',
                });
              }
            }));
      } catch (e) {
        setLoggedIn(false);

        if (e.code === 401) {
          toast.warning('User rejected request', {
            appearance: 'warning',
          });
        }
        console.log(e);
      }
    }
  };

  // Get the signature using ether.js
  const getSignature = async ({ message }) => {
    try {
      if (!window.ethereum)
        throw new Error('No crypto wallet found. Please install it.');

      await window.ethereum.send('eth_requestAccounts');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);

      return {
        message,
        signature,
      };
    } catch (err) {
      // setLoading(false);

      toast.error(err.message, {
        appearance: 'error',
      });
    }
  };

  return (
    <div className='search-bar'>
      <InputField
        type='text'
        name='nftContractAddress'
        value={nftContractAddress}
        placeholder={'Enter NFT contract address'}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
      >
        <div className='input-alert'>
          How to find NFT contract address?{' '}
          <a href='https://www.youtube.com/watch?v=lWlAj_YIKVg' target='_blank'>
            Click here
          </a>
        </div>
      </InputField>
      <Button
        className='btn-primary'
        title='Show Ranking'
        handleClick={handleClick}
      />
    </div>
  );
};

export default SearchBar;
