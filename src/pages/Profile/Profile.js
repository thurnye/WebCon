import React from 'react';
// import { useParams } from 'react-router';
import styles from './Profile.module.css';
import { Box, useMediaQuery } from "@mui/material";
import InfoSection from '../../components/HomeDashboard/InfoSection/InfoSection';
import FeedsSection from '../../components/HomeDashboard/FeedsSection/FeedsSection';
import Friends from '../../components/FriendContainer/Friends/Friends';

const Profile = () => {
  // const {userId} = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


  return(
    <Box className={styles.Profile} data-testid="Profile">
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <InfoSection/>
        <Box m="2rem 0" />
        <Friends/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <FeedsSection/>
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%" sx={{border: '2px dotted red'}}>
          </Box>}
      </Box>
    </Box>
  );
}

export default Profile;
