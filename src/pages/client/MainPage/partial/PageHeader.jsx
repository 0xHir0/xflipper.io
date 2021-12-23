import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Button from '../../../../components/Button';
import { ReactComponent as ArrowForwardIcon } from '../../../../assets/icons/icon-arrow-forward.svg';
import { ReactComponent as DiscordIcon } from '../../../../assets/icons/icon-discord.svg';
import { ReactComponent as IconDoubleArrowIcon } from '../../../../assets/icons/icon-double-arrow-down.svg';

const PageHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='page-header'>
        <div className='grid-item max-w-554'>
          <div className='main-title'>
            Snipe the Rarest NFT's Before Anyone Else
          </div>
          <div className='description'>
            xFlipper is the fastest real-time metadata scraper.
            <br />
            Moments after an NFT collection is revealed, xFlipper calculates the
            ranking of NFTs, giving you the chance to snipe the rarest NFTs
            before the reveal on OpenSea.
          </div>
          <div className='btn-group'>
            <Button
              className='btn-secondary'
              title='Mint Membership Pass'
              handleClick={() => {
                navigate('/mint');
              }}
            />
            <Button
              className='btn-primary'
              title='Open App'
              handleClick={() => {
                navigate('/search');
              }}
            >
              <ArrowForwardIcon />
            </Button>
          </div>
          <div className='join-discord'>
            <Link
              to={{ pathname: 'https://discord.gg/DysAFMVM' }}
              target='_blank'
            >
              Join our Discord <DiscordIcon />
            </Link>
          </div>
        </div>
        <div className='grid-item'>
          <ReactPlayer
            url='https://assets.xflipper.io/token/xFlipper_3_2_600x600.mp4'
            loop={true}
            playing={true}
            muted={true}
            width='100%'
            height='100%'
          />
        </div>
        <div className='downArrow bounce'>
          <IconDoubleArrowIcon />
        </div>
      </div>
    </>
  );
};

export default PageHeader;
