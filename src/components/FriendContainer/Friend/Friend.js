import React, {useState} from 'react';
import styles from './Friend.module.css';
import { MdOutlinePersonAddAlt, MdPersonRemove } from "react-icons/md";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetweenBox from '../../FlexBetweenBox/flexBetweenBox';
import Avatar from '../../Avatar/Avatar';
import services from 'util/services';
import { StatusCode } from 'util/common/enums';
import {timeDifference} from 'util/common/general';

const Friend = (prop) => {
  const { _id, firstName, lastName, picture, location} = prop.friend;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [friends, setFriends] = useState(user.friends)
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  
  const checkFriend = () => {
    return friends.find((friend) => friend._id === _id);
  };

  const AddRemoveFriend = async () => {
    const result = await services.postAddFriend(user._id, _id);
    if(result.status === StatusCode.success){
      setFriends(result.data.user.friends);
    }
    console.log(result);
  };

  return (
    <div className={styles.Friend} data-testid="Friend">
      <FlexBetweenBox>
      <FlexBetweenBox gap="1rem">
        <Avatar image={picture} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${_id}`);
            navigate(0);
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
    </div>
  )
};
export default Friend;
