import React from 'react';
import ReactPlayer from 'react-player/youtube';
import Accordion from '../../../../components/Accordion';
import { faqData } from '../../../../utils/faq';
import { ReactComponent as PointdownIcon } from '../../../../assets/icons/icon-point-down.svg';

const PageFooter = () => {
  return (
    <div className='page-footer'>
      <div className='video-wrapper'>
        <div className='video-panel'>
          <div className='point-video-text'>
            Check how it works <PointdownIcon className='mirror-transform' />
          </div>
          <div className='player-wrapper'>
            <ReactPlayer
              url='https://www.youtube.com/watch?v=lkCl548HAwE'
              loop={true}
              playing={true}
              controls={true}
              light={true}
              width='100%'
              height='100%'
            />
          </div>
        </div>
      </div>
      <div className='faq'>
        <div className='faq-title'>faq</div>
        <Accordion faqs={faqData} />
      </div>
      <div className='copyright'>
        xFlipper @ 2022{' '}
        <a className='twitter' href='https://twitter.com/xflipper_nft'>
          Twitter
        </a>
      </div>
    </div>
  );
};

export default PageFooter;
