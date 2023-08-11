import React,{ useState, useEffect } from 'react';
import styles from './Friends.module.css';
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Friend from "../Friend/Friend";
import WidgetWrapper from "../../WidgetWrapper/WidgetWrapper";
import { getRandomInt } from 'util/common/general';
import { useLocation } from 'react-router';




const Friends = () => {
  const {state} = useLocation();
  const { palette } = useTheme();
  const friendsList = useSelector((state) => state.friends);
  const diffUserFriend = useSelector((state) => state.myFriendFriends);
  const [friends, setFriends] = useState(friendsList);

  // Update friends list
  useEffect(()=> {
    if(state?.friendId){
      setFriends(diffUserFriend);
    }else{
      setFriends(friendsList);
    }
  },[friendsList, diffUserFriend, state]);

    
  return(
    <div className={styles.Friends} data-testid="Friends">
      <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend friend={friend} key={`friend_${getRandomInt()}`}/>
        ))}
      </Box>
    </WidgetWrapper>
    </div>
  )
};


export default Friends;
