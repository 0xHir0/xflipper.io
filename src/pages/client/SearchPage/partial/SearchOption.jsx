import React, { useContext, useEffect, useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import InputField from '../../../../components/InputField';
import Selectbox from '../../../../components/Selectbox';
import Button from '../../../../components/Button/Button';
import { EtherContext } from '../../Context';
import { ReactComponent as InfoCircleIcon } from '../../../../assets/icons/icon-info-circle.svg';

const sortOptions = ['Rank-High to Low', 'Rank-Low to High'];
const defaultSortOption = 'Rank-High to Low';

const showOptions = ['5', '10', '30'];
const defaultShowOption = '10';

const SearchOption = () => {
  const {
    loggedIn,
    tokenId,
    page,
    totalCount,
    pageOptions,
    nftContractAddress,
    showRanking,
    setTokenId,
    setSortByOrder,
    setShowPerPage,
    setPageOptions,
    setPage,
  } = useContext(EtherContext);

  const [contractAddress, setContractAddress] = useState('');

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: 'top' });

  useEffect(() => {
    setContractAddress(nftContractAddress);
  }, [showRanking]);

  const handleTokenChange = (e) => {
    setTokenId(e.target.value);
  };

  const handleSortByOrder = (option) => {
    setSortByOrder(option.value);
  };

  const handleShowPerPage = (option) => {
    setShowPerPage(option.value);
    setPageOptions(
      Array.from(
        { length: Math.ceil(totalCount / parseInt(option.value)) },
        (_, i) => (i + 1).toString()
      )
    );
    setPage('1');
  };

  const handlePage = (option) => {
    setPage(option.value);
  };

  const handleContractAddrChange = (e) => {};

  return (
    <div className='search-option-panel'>
      <div className='search-option-item'>
        <div className='token'>
          <div className='title'>Token</div>
          <InputField
            type='text'
            name='tokenId'
            value={tokenId}
            disabled={!loggedIn}
            placeholder={'ID'}
            handleChange={handleTokenChange}
          />
        </div>
        <div className='sort-by'>
          <div className='title'>Sort By</div>
          <Selectbox
            options={sortOptions}
            value={defaultSortOption}
            disabled={!loggedIn}
            handleChange={handleSortByOrder}
          />
        </div>
        {/* <div className='show-per-page'>
          <div className='title'>Show per page</div>
          <Selectbox
            options={showOptions}
            value={defaultShowOption}
            disabled={!loggedIn}
            handleChange={handleShowPerPage}
          />
        </div> */}
        <div className='page'>
          <div className='title'>Page</div>
          <div className='grid-column-2'>
            <Selectbox
              options={pageOptions}
              value={page}
              disabled={!loggedIn}
              handleChange={handlePage}
            />
            <div className='title'>of {pageOptions.length}</div>
          </div>
        </div>
        <div className='refresh'>
          <Button
            className='btn-dark'
            title='Refresh Traits'
            disabled={!loggedIn}
            // handleClick={handleClick}
          />

          <div className='info-icon' ref={setTriggerRef}>
            <InfoCircleIcon />
          </div>

          {visible && (
            <div
              ref={setTooltipRef}
              {...getTooltipProps({ className: 'tooltip-container' })}
            >
              Change screen mode based on your preference by toggling the switch
              below.
              <div {...getArrowProps({ className: 'tooltip-arrow' })} />
            </div>
          )}
        </div>
        <div className='contract-address'>
          <div className='title'>Contract Address</div>
          <InputField
            type='text'
            name='contractAddress'
            value={contractAddress}
            handleChange={handleContractAddrChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchOption;
