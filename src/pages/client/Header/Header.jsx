import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import { Mainnet, useEthers } from '@usedapp/core';
import axios from 'axios';
import { EtherContext } from '../Context';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { ReactComponent as TwitterIcon } from '../../../assets/icons/icon-twitter.svg';
import { ReactComponent as DiscordIcon } from '../../../assets/icons/icon-discord.svg';
import { truncate } from '../../../utils';
import './Header.scss';

const Header = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(true);
  const [showMainnetModal, setShowMainnetModal] = useState(false);
  const { account, activateBrowserWallet } = useEthers();
  const { setLoggedIn, setIsMainnet } = useContext(EtherContext);

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });

  useEffect(() => {}, []);

  const handleCloseBtn = () => {
    setHasMetamask(true);
  };

  // Connect Metamask and get
  const connectMetamask = async () => {
    await activateBrowserWallet();

    sessionStorage.clear();
  };

  // Check whether Metamask exists or not. If exists, connect to Metamask
  const loadMetamask = async () => {
    if (window.location.pathname === '/') return;
    if (window.location.pathname.indexOf('/mint') >= 0) {
      if (typeof web3 !== 'undefined') {
        connectMetamask();
      } else {
        setHasMetamask(false);
      }
    } else if (window.location.pathname.indexOf('search') >= 0) {
      if (typeof web3 !== 'undefined') {
        const networkId = window.ethereum.chainId;

        if (networkId === Mainnet.chainId) {
          setLoggedIn(true);
          setIsMainnet(true);
          setShowMainnetModal(false);
          connectMetamask();
        } else {
          setIsMainnet(false);
          setShowMainnetModal(true);
        }
      } else {
        setHasMetamask(false);
      }
    }
  };

  const handleShowWallet = () => {
    setShowWalletModal(true);
  };

  const handleCloseWalletModal = () => {
    setShowWalletModal(false);
  };

  const handleClipboard = () => {
    navigator.clipboard.writeText(account);
    toast.info('Wallet Address Copied', {
      appearance: 'info',
    });
  };

  // const handleDisconnect = async () => {
  //   deactivate();
  //   setShowRanking(false);
  //   setShowWalletModal(false);
  // };

  return (
    <>
      <div className='header'>
        <div className='logo'>
          <Link to='/'>
            <img src={'../../../assets/images/logo.png'} alt='RarityRanker' />
          </Link>
        </div>
        <div className='navbar'>
          <div className='navitem'>
            <Link
              to={{ pathname: 'https://twitter.com/xflipper_nft' }}
              target='_blank'
            >
              <TwitterIcon />
            </Link>
          </div>
          <div className='navitem'>
            <Link
              to={{ pathname: 'https://discord.gg/DysAFMVM' }}
              target='_blank'
            >
              <DiscordIcon />
            </Link>
          </div>
          <div className='navitem'>
            {!account ? (
              <Button
                className='btn-dark'
                title='Connect Wallet'
                handleClick={loadMetamask}
              />
            ) : (
              <Button
                className='btn-dark wallet-address'
                title={truncate(account)}
                handleClick={handleShowWallet}
              />
            )}
          </div>
        </div>
      </div>
      {!hasMetamask && (
        <Modal
          message={'Ops...'}
          name={'No Metamask found'}
          description={
            'This site requires the Metamask Plugin for Google Chrome:'
          }
          handleCloseBtn={handleCloseBtn}
        >
          <Link to={{ pathname: 'https://metamask.io' }} target='_blank'>
            Download Metamask
          </Link>
        </Modal>
      )}
      {showMainnetModal && (
        <Modal
          name={'Error'}
          description={'Please connect to Ethereum network'}
          handleCloseBtn={() => setShowMainnetModal(false)}
        ></Modal>
      )}
      {showWalletModal && (
        <Modal
          type={'info'}
          size={'modal-sm'}
          message={'Connected with'}
          name={truncate(account)}
          handleCloseBtn={handleCloseWalletModal}
        >
          <div className='modal-link'>
            <Link to='#' onClick={handleClipboard}>
              Copy to clipboard
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
