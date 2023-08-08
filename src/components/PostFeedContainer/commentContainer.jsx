import React, { useState } from 'react';
import { Box, Divider, IconButton, Typography, useTheme, ImageList,  ImageListItem } from "@mui/material";
import {getCommentCounts} from '../../util/common/general';
import FlexBetweenBox from '../FlexBetweenBox/flexBetweenBox';
import {
    MdOutlineChatBubbleOutline,
    MdOutlineFavoriteBorder,
    MdOutlineFavorite,
  } from "react-icons/md";

// Recursive component to render comments and replies
const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const toggleReplies = () => {
    console.log(comment._id);
    setShowReplies(!showReplies);
  };

    //Check if a comment is like by the user
    const checkLikes = () => {
        return true;
    };
    const likeComment = () => {
        console.log('likedComment',comment._id);
    }

  return (
    <div>
      <Box onClick={toggleReplies} style={{ cursor: 'pointer' }}>
        <Box>
            <Divider/>
            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.comment} {getCommentCounts(comment.replies)}
            </Typography>
            <Box sx={{display: 'flex', ml: '0.5rem'}}>
            <FlexBetweenBox gap="0.3rem">
              <IconButton 
              onClick={() => likeComment()}
              >
                {checkLikes() ? (
                  <MdOutlineFavorite sx={{ color: primary }} />
                ) : (
                  <MdOutlineFavoriteBorder />
                )}
              </IconButton>
              <Typography>{comment?.likes ? comment.likes : 0}</Typography>
            </FlexBetweenBox>

            <FlexBetweenBox gap="0.3rem" sx={{ml: '1rem'}}>
              <IconButton 
              // onClick={() => setIsComments(!isComments)}
              onClick={toggleReplies}
              >
                <MdOutlineChatBubbleOutline />
              </IconButton>
              <Typography>{getCommentCounts(comment.replies)}</Typography>
            </FlexBetweenBox>
          </Box>
        </Box>
      </Box>
      {showReplies && comment.replies && (
        <Box style={{ marginLeft: '5px' }}>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </Box>
      )}
    </div>
  );
};


// Main component to render comments container
const CommentContainer = ({ comments }) => {
    return (
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    );
  };

export default CommentContainer;