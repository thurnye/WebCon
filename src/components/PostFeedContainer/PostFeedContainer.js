import React, { useState, useEffect } from 'react';
import parser from 'html-react-parser';
import { Box, Divider, IconButton, Typography, useTheme, ImageList,  ImageListItem } from "@mui/material";
import FlexBetweenBox from '../FlexBetweenBox/flexBetweenBox';
import WidgetWrapper from '../WidgetWrapper/WidgetWrapper';
import {
  MdOutlineChatBubbleOutline,
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineShare,
  MdOutlineBookmark,
  MdOutlineBookmarkBorder
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import styles from './PostFeedContainer.module.css';
import Friend from '../FriendContainer/Friend/Friend';
import {StatusCode, postActionTypes} from '../../util/common/enums';
import services from '../../util/services';
import { getRandomInt, getCommentCounts} from '../../util/common/general'
import { authActions } from '../../store/authSlice';
import CommentContainer from './commentContainer'

const PostFeedContainer = ({post}) => {
  const [showReplies, setShowReplies] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [likes, setLikes] = useState(post.likes);
  const [userLikes, setUserLikes] = useState(user.likedPosts);
  const [userSaves, setUserSaves] = useState(user.savedPosts);
  const [friends, setFriends] = useState(user.friends)
  // const [repliesCount, setRepliesCount] = useState();

  // const comments = true;
  // console.log(post)


  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  //Check if a post is like by the user
  const checkLikes = (type) => {
    if(type === postActionTypes.like){
      return userLikes.includes(post._id);
    };
    if(type === postActionTypes.save){
      return userSaves.includes(post._id);
    };
  };

  const comments = post.comments

  // Like or Save Post
  const likeOrSavePost = async (type) => {
      const result = await services.getLikeSavePost(
        user._id, post._id, type
      );
      if(result.status === StatusCode.success){
        setLikes(result.data.likes);
        if(type === postActionTypes.like){
          setUserLikes(result.data.user.likedPosts);
        }
        if(type === postActionTypes.save){
          setUserSaves(result.data.user.savedPosts);
        }
      }
  }

// Toggle Comments
const toggleReplies = () => {
  console.log(post._id);
  setShowReplies(!showReplies);
};




console.log("Total Count:", getCommentCounts(comments));








  

  return(
    <div className={styles.PostFeedContainer} data-testid="PostFeedContainer">
      <WidgetWrapper m="2rem 0">
        <Friend friend={post.author}/>
        <Box color={main} sx={{ mt: "1rem" }}>
          {parser(post.post)}
        </Box>
        {post.images.length > 0 && 
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {post.images?.map((item, i) => (
            <ImageListItem key={`${item?.name}_${i}`}>
              <img
                src={`${item?.image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item?.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item?.name}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        }

  <FlexBetweenBox mt="0.25rem">
          <FlexBetweenBox gap="1rem">
            <FlexBetweenBox gap="0.3rem">
              <IconButton 
              onClick={() => likeOrSavePost(postActionTypes.like)}
              >
                {checkLikes(postActionTypes.like) ? (
                  <MdOutlineFavorite sx={{ color: primary }} />
                ) : (
                  <MdOutlineFavoriteBorder />
                )}
              </IconButton>
              <Typography>{likes}</Typography>
            </FlexBetweenBox>

            <FlexBetweenBox gap="0.3rem">
              <IconButton 
              onClick={toggleReplies}
              >
                <MdOutlineChatBubbleOutline />
              </IconButton>
              <Typography>{getCommentCounts(post.comments)}</Typography>
            </FlexBetweenBox>
          </FlexBetweenBox>
          
          <FlexBetweenBox gap="0.3rem">
            <IconButton>
              <MdOutlineShare />
            </IconButton>
            <IconButton 
              onClick={() => likeOrSavePost(postActionTypes.save)}
              >
                {checkLikes(postActionTypes.save) ? (
                  <MdOutlineBookmark sx={{ color: primary }} />
                ) : (
                  <MdOutlineBookmarkBorder />
                )}
              </IconButton>
          </FlexBetweenBox>
        </FlexBetweenBox>
        {showReplies && comments.length > 0 && (
        <Box mt="0.5rem">
          {/* {comments.map((comment, i) => (
            <Box key={`${getRandomInt()}_${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
              </Typography>
            </Box>
          ))} */}
          <CommentContainer comments={comments} />
          <Divider />
        </Box>
      )}

      </WidgetWrapper>
    </div>
  )
};

export default PostFeedContainer;
