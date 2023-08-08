import React from 'react';
import styles from './FeedsSection.module.css';
import WritePost from '../WritePost/WritePost';
import PostFeeds from '../PostFeeds/PostFeeds';

const FeedsSection = () => {
  return(
    <div className={styles.FeedsSection} data-testid="FeedsSection">
      <WritePost/>
      <PostFeeds/>
    </div>
  )
};


export default FeedsSection;
