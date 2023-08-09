import React, { useState } from 'react';
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
import { useSelector } from "react-redux";
import styles from './PostFeedContainer.module.css';
import Friend from '../FriendContainer/Friend/Friend';
import {StatusCode, postActionTypes} from '../../util/common/enums';
import services from '../../util/services';
import {  getCommentCounts} from '../../util/common/general'

import CommentContainer from './commentContainer'
import CommentEditor from '../CommentEditor/CommentEditor';

const PostFeedContainer = ({post}) => {
  const [showReplies, setShowReplies] = useState(false);
  const user = useSelector((state) => state.user);
  const [likes, setLikes] = useState(post.likes);
  const [userLikes, setUserLikes] = useState(user.likedPosts);
  const [userSaves, setUserSaves] = useState(user.savedPosts);
  const [showAddComment, setShowAddComment] = useState(false);
  const [comments, setComments] = useState(post.comments);

  

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
  setShowAddComment(!showAddComment);
};



  

  return(
    <div className={styles.PostFeedContainer} data-testid="PostFeedContainer">
      <WidgetWrapper m="2rem 0">
        <Friend friend={post.author} time={post.createdAt}/>
        <Box color={main} sx={{ mt: "1rem", ml: '4.5rem'}}>
          {parser(post.post)}
          {post.images.length > 0 && <Box sx={{margin: 'auto'}}>
            <ImageList cols={post.images.length > 2 ? 3 : post.images.length === 2 ? 2 : 1}>
            {post.images?.map((item, i) => (
              <ImageListItem key={`${item?.name}_${i}`}>
                <img
                src={item.image}
                alt={item.name}
                  loading="lazy"
                  width='164px'
                  height='164px'
                />
              </ImageListItem>
            ))}
            </ImageList>
          </Box>
          }
        </Box>

        <FlexBetweenBox mt="0.25rem" ml= '4rem'>
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
        <Box mt="0.5rem" ml='1rem'>
          <CommentContainer 
          comments={comments} 
          commentReply={showAddComment}
          setShowAddComment={setShowAddComment}
          />
          <Divider />
        </Box>
      )}
      {showAddComment && (
        <Box>
          <CommentEditor 
          postId={post._id}
          setComments={setComments}
          />
        </Box>
      )}
      </WidgetWrapper>
    </div>
  )
};

export default PostFeedContainer;
