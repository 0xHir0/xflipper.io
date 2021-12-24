import React, { useState, useEffect, useRef, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';
import {ReactComponent as LoadingIcon} from '../../../../assets/icons/icon-loading-svg.svg';
import Modal from '../../../../components/Modal';
import { EtherContext } from '../../Context';

const RankingItem = ({
  token_id,
  image,
  name,
  score,
  eth,
  bg,
  traits,
  delay,
  rank,
  collectionID,
  sell_orders,
  owner
}) => {
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState();
  const [auction, setAuction] = useState(false);
  const [notForSale, setNotForSale] = useState(false);

  const { nftContractAddress } = useContext(EtherContext);
  const unmounted = useRef(false);

  useEffect(() => {
    const tokenObj = JSON.parse(
      sessionStorage.getItem(nftContractAddress + '=>' + token_id)
    );

    if (tokenObj?.price) {
      setPrice(tokenObj.price);
      tokenObj.auction && setAuction(true);
      tokenObj.notForSale && setNotForSale(true);
    } else {
      //setTimeout(async () => await fetchPrice(sell_orders, owner, token_id), delay);
      fetchPrice(sell_orders, owner, token_id);
    }

    return () => {
      unmounted.current = true;
    };
  }, []);

  const fetchPrice = async (_orders, _owner, token_id) => {
        console.log("SELL_ORDERS:", _orders)
        console.log("OWNER:", _owner)
        const orders = sell_orders;
        const owner  = _owner;

        let on_sale = false;
        let on_auction = false;

        // First we check if item is for sale for wide audience (we don't count private listings)
        // Some items maybe both on sale and in auction, in that case we show only sale price

          if (
            // Check if there are some listings by creator
            orders &&
            orders.filter(function (el) {
              return el.maker.address == owner.address;
            }).length > 0
          ) {
            let smallest_curr = '';
            let smallest_price = 10 ** 31;

            for (let i = 0; i < orders.length; i++) {
              if (
                // Check if this is listing by creator and it is not private, and price is smaller than current smallest, and it is not auction
                parseInt(orders[i].base_price, 10) < smallest_price &&
                orders[i].maker.address == owner.address &&
                orders[i].taker.address ==
                  '0x0000000000000000000000000000000000000000' &&
                orders[i].v != null
              ) {
                smallest_price = parseInt(orders[i].base_price, 10);
                smallest_curr = orders[i].payment_token_contract.symbol;
              }
            }

            if (smallest_curr != '') {
              on_sale = true;
              const price = '' + smallest_price / 10 ** 18 + ' ' + smallest_curr;
              setPrice(price);
              sessionStorage.setItem(
                nftContractAddress + '=>' + token_id,
                JSON.stringify({ price: price })
              );
            }
          }

          // Check if item is in Auction
          if (
            !on_sale &&
            orders &&
            orders.filter(function (el) {
              return el.v == null;
            }).length > 0
          ) {
            // Auction
            on_auction = true;
            setAuction(true);
            sessionStorage.setItem('auction', true);

            let biggest_curr = '';
            let biggest_bid = 0;

            // Find the biggest bid
            for (let i = 0; i < orders.length; i++) {
              if (
                // Check if this is offer, and bid is bigger than current biggest
                parseInt(orders[i].base_price, 10) > biggest_bid &&
                orders[i].maker.address != owner.address
              ) {
                biggest_bid = parseInt(orders[i].base_price, 10);
                biggest_curr = orders[i].payment_token_contract.symbol;
              }
            }

            if (biggest_curr != '') {
              const price = '' + biggest_bid / 10 ** 18 + ' ' + biggest_curr;
              setPrice(price);
              sessionStorage.setItem(
                nftContractAddress + '=>' + token_id,
                JSON.stringify({ price: price, auction: true })
              );
            } else {
              setPrice('No bids');
              sessionStorage.setItem(
                nftContractAddress + '=>' + token_id,
                JSON.stringify({ price: 'No bids', auction: true })
              );
            }
          }

          // Not for sale
          if (!on_sale && !on_auction) {
            setNotForSale(true);
            setPrice('Not for sale');
            sessionStorage.setItem(
              nftContractAddress + '=>' + token_id,
              JSON.stringify({ price: 'Not for sale', notForSale: true })
            );
          }
  };

  const handleCloseBtn = () => {
    setShowModal(false);
  };

  const handleOpenSea = (collectionID, token_id) => {
    window.open(
      `https://opensea.io/assets/${collectionID}/${token_id}`,
      '_blank'
    );
  };

  const handleShowModal = () => {
    setShowModal(true);
    // window.scrollTo(0, 0);
  };

  const handleDna = () => {
    console.log('dna');
  };

  return (
    <>
      <div className='nft-item'>
        <div className='nft-image'>
          <div className='overlay' onClick={(e) => handleShowModal()}></div>
          {image ? (
            <LazyLoadImage alt={''} effect='blur' src={image} />
          ) : (
            <div className='loader'>
              <LoadingIcon />
            </div>
          )}

          <div className='dna' onClick={handleDna}>{`#${rank}`}</div>
          <div
            className='opensea'
            onClick={(e) => handleOpenSea(collectionID, token_id)}
          >
            <img src='../../../assets/icons/icon-opensea.svg' alt='Opensea' />
          </div>
        </div>
        <div className='nft-description'>
          <div className='name'>{name}</div>
          <div className='flex justify-between'>
            <div className='score'>{score}</div>
            {price ? (
              auction ? (
                <div className={`eth bg-purple`}>{price}</div>
              ) : notForSale ? (
                <div className={`eth bg-red`}>{price}</div>
              ) : (
                <div className={`eth bg-green`}>{price}</div>
              )
            ) : (
              <div className='loader'>
                <LoadingIcon />
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal size='modal-sm' handleCloseBtn={handleCloseBtn}>
          <div className='nft-modal'>
            <div className='name'>{name}</div>
            {image ? (
              <LazyLoadImage alt={''} effect='blur' src={image} />
            ) : (
              <div className='loader'>
                <LoadingIcon />
              </div>
            )}
            <div className='score'>
              <div className='text'>Total Rarity Score</div>
              <div className='value'>{score}</div>
            </div>
            <table className='table'>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Value (Total)</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {traits.length > 0 ? (
                  traits.map((trait, index) => {
                    return (
                      <tr key={index}>
                        <td>{trait.trait_type}</td>
                        <td>
                          {trait.value} ({trait.amount})
                        </td>
                        <td>{trait.score}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td></td>
                    <td>No traits</td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
            <div
              className='opensea'
              onClick={(e) => handleOpenSea(collectionID, token_id)}
            >
              <img src='../../../assets/icons/icon-opensea.svg' alt='Opensea' />
              OpenSea
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RankingItem;
