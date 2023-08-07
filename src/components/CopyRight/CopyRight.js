import React from 'react';
import { Typography, Link } from '@mui/material';
import styles from './CopyRight.module.css';

const CopyRight = (props) => (
    <Typography variant="body2"
    color="text.secondary" 
    align="center" 
    className={styles.CopyRight} 
    data-testid="CopyRight"
    {...props} 
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        WebCom
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
);


export default CopyRight;
