import React from 'react';
import styles from './ArticlesSection.module.css';
import { Box } from "@mui/material";
import Friends from '../../FriendContainer/Friends/Friends';
import Ads from '../../Ads/Ads';

const ArticlesSection = () => (
  <Box flexBasis="26%" className={styles.ArticlesSection} data-testid="ArticlesSection">
    <Ads/>

    <Box m="2rem 0" />
      <Friends/>
  </Box>
);


export default ArticlesSection;
