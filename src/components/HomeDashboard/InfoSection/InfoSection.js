import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from './InfoSection.module.css';
import { MdOutlineManageAccounts, MdOutlineModeEditOutline, MdOutlineWorkOutline, MdOutlineLocationOn } from 'react-icons/md';
import { Box, Typography, Divider, useTheme } from '@mui/material'
import Avatar from '../../Avatar/Avatar'
import FlexBetweenBox from '../../FlexBetweenBox/flexBetweenBox'
import WidgetWrapper from "../../WidgetWrapper/WidgetWrapper";
import { useLocation } from 'react-router';


const InfoSection = () => {
  const authUser = useSelector((state) => state.user);
  const friend = useSelector((state) => state.friend);
  const {state} = useLocation()
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(authUser);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const isUser = friend ? false : true;
  // const isUser = friend ? false : true;


  useEffect(() => {
    setLoading(true);
    console.log(friend)
    if(!friend){
      setLoading(false);
      setUser(authUser);
    }
    if(friend){
      console.log(friend);
      setUser(friend);
      setLoading(false);
    };
  },[authUser, isUser, state, user, friend]);

  console.log(isUser);

  return(
    <div className={styles.InfoSection} data-testid="InfoSection">
      <WidgetWrapper>
        {!loading ? <>
          <FlexBetweenBox
            gap="0.5rem"
            pb="1.1rem"
            // onClick={() => navigate(`/profile`)}
          >
            <FlexBetweenBox gap="1rem">
              <Avatar image={user.picture} />
              <Box>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography color={medium}>{user.friends.length} friends</Typography>
              </Box>
            </FlexBetweenBox>
            {isUser && <MdOutlineManageAccounts />}
            
          </FlexBetweenBox>

          <Divider />

          {/* location/Job */}
          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <MdOutlineLocationOn fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{user.location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
              <MdOutlineWorkOutline fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{user?.occupation}</Typography>
            </Box>
          </Box>

          <Divider />

          {/* Views/Impressions */}
          <Box p="1rem 0">
            <FlexBetweenBox mb="0.5rem">
              <Typography color={medium}>Who's viewed your profile</Typography>
              <Typography color={main} fontWeight="500">
                {user?.viewedProfile}
              </Typography>
            </FlexBetweenBox>
            <FlexBetweenBox>
              <Typography color={medium}>Impressions of your post</Typography>
              <Typography color={main} fontWeight="500">
                {user?.impressions}
              </Typography>
            </FlexBetweenBox>
          </Box>

          <Divider />

          {/* SocialMedia */}
          <Box p="1rem 0">
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
              Social Profiles
            </Typography>

            <FlexBetweenBox gap="1rem" mb="0.5rem">
              <FlexBetweenBox gap="1rem">
                <img src="../assets/twitter.png" alt="twitter" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    Twitter
                  </Typography>
                  <Typography color={medium}>Social Network</Typography>
                </Box>
              </FlexBetweenBox>
              {isUser && <MdOutlineModeEditOutline sx={{ color: main }} />}
            </FlexBetweenBox>

            <FlexBetweenBox gap="1rem">
              <FlexBetweenBox gap="1rem">
                <img src="../assets/linkedin.png" alt="linkedin" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    Linkedin
                  </Typography>
                  <Typography color={medium}>Network Platform</Typography>
                </Box>
              </FlexBetweenBox>
              {isUser && <MdOutlineModeEditOutline sx={{ color: main }} />}
            </FlexBetweenBox>
          </Box>
        </> 
        :
        <>
        Loading...
        </>}
    </WidgetWrapper>
    </div>
  )
};



export default InfoSection;
