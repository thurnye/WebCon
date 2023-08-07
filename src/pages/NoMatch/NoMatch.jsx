import React from 'react';
import styles from './NoMatch.module.css';
import { Navigate} from 'react-router-dom';

const NoMatch = () => {
  return(
    <div className={styles.NoMatch} data-testid="NoMatch">
      <div>
        <h2>Get the Hell Out of Here!</h2>
        <p>
          <Navigate to="/">Go to the home page</Navigate>
        </p>
      </div>
    </div>
  )
};

export default NoMatch;
