import React from 'react';
import styles from './ArticlesSection.module.css';
import { Box } from "@mui/material";
import Friends from '../../Friends/Friends';

const ArticlesSection = () => (
  <Box flexBasis="26%" className={styles.ArticlesSection} data-testid="ArticlesSection">
    ArticlesSection Component

    <Box m="2rem 0" />
      <Friends/>
  </Box>
);


export default ArticlesSection;
