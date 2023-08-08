import React from 'react';
import PropTypes from 'prop-types';
import styles from './ArticlesSection.module.css';
import { Box, useMediaQuery } from "@mui/material";
import Friends from '../../Friends/Friends';

const ArticlesSection = () => (
  <Box flexBasis="26%" className={styles.ArticlesSection} data-testid="ArticlesSection">
    ArticlesSection Component

    <Box m="2rem 0" />
      <Friends/>
  </Box>
);

ArticlesSection.propTypes = {};

ArticlesSection.defaultProps = {};

export default ArticlesSection;
