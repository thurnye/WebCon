import React, {useState, useEffect} from 'react';
import styles from './Friend.module.css';
import { MdOutlinePersonAddAlt, MdPersonRemove } from "react-icons/md";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import FlexBetweenBox from '../../FlexBetweenBox/flexBetweenBox';
import Avatar from '../../Avatar/Avatar';
import services from 'util/services';
import { StatusCode } from 'util/common/enums';
import {authActions} from '../../../store/authSlice';
import {timeDifference} from 'util/common/general';

const Friend = (prop) => {
  const { _id, firstName, lastName, picture, location} = prop.friend;
  const navigate = useNavigate();
  const {state} = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const friendsList = useSelector((state) => state.friends);
  const diffUserFriend = useSelector((state) => state.myFriendFriends);
  const [friends, setFriends] = useState(friendsList)
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;



  //Update friends list
  useEffect(()=> {
    if(state?.friendId){
      setFriends(diffUserFriend);
    }else{
      setFriends(friendsList);
    }
  },[friendsList, diffUserFriend, state]);

  const checkFriend = () => {
    return friends.find((friend) => friend._id !== _id);
  };

  const AddRemoveFriend = async () => {
    const result = await services.postAddFriend(user._id, _id);
    if(result.status === StatusCode.success){
      console.log('incomingData', result.data.friends)
      dispatch(authActions.setFriends(result.data.friends));
    }
  };
  // console.log(_id)
  return (
    <div className={styles.Friend} data-testid="Friend">
      {prop.friend && 
        <FlexBetweenBox>
        <FlexBetweenBox gap="1rem">
          <Avatar image={picture} size="55px" />
          <Box
            onClick={() => {
              
              navigate(`/profile`, {state: {friendId: prop.friend._id}});
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {`${firstName} ${lastName}`}
              <span> {prop.time ? `@${ timeDifference(prop.time)}` : ''}</span>
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {location}
            </Typography>
          </Box>
        </FlexBetweenBox>
        <IconButton
          onClick={() => AddRemoveFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {checkFriend() ? (
            <MdPersonRemove sx={{ color: primaryDark }}/>
          ) : (
            <MdOutlinePersonAddAlt sx={{ color: primaryDark }}/>
          )}
        </IconButton>
        </FlexBetweenBox>
      }
    </div>
  )
};
export default Friend;
