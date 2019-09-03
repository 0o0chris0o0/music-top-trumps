import React from 'react';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { symbols } from '../../utils/importAllImages';

import styles from './_SocialShare.scss';

function SocialShare({ link, twitterText, className }) {
  return (
    <div className={className}>
      <a
        className={`${className} ${styles.link}`}
        href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
        target="_blank"
        data-event-label="share_playlist_facebook"
      >
        <SVGInline
          component="div"
          svg={symbols['./facebook.svg']}
        />
      </a>
      <a
        className={`${className} ${styles.link}`}
        href={`https://www.twitter.com/intent/tweet?url=${link}&text=${twitterText}`}
        target="_blank"
        data-event-label="share_playlist_twitter"
      >
        <SVGInline
          component="div"
          svg={symbols['./twitter.svg']}
        />
      </a>
    </div>
  );
}

SocialShare.defaultProps = {
  className: 'social-share'
};

SocialShare.propTypes = {
  link: PropTypes.string.isRequired,
  twitterText: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default SocialShare;
