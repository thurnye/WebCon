import React from 'react';
import styles from './Home.module.css';
import { Box, useMediaQuery } from "@mui/material";
import InfoSection from '../../components/HomeDashboard/InfoSection/InfoSection';
import FeedsSection from '../../components/HomeDashboard/FeedsSection/FeedsSection';
import ArticlesSection from '../../components/HomeDashboard/ArticlesSection/ArticlesSection';

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return(
    <Box className={styles.Home} data-testid="Home">
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <InfoSection/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <FeedsSection/>
        </Box>
        {isNonMobileScreens && <ArticlesSection />}
      </Box>
    </Box>
  )
};
export default Home;
