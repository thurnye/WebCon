import React from 'react';
import styles from './FeedsSection.module.css';
import WritePost from '../WritePost/WritePost';

const FeedsSection = () => (
  <div className={styles.FeedsSection} data-testid="FeedsSection">
    FeedsSection Component
    <WritePost/>
  </div>
);


export default FeedsSection;
