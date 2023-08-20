import React, { useEffect, useState } from 'react';
import parser from 'html-react-parser';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import {getCommentCounts, getRandomInt, timeDifference} from '../../util/common/general';
import FlexBetweenBox from '../FlexBetweenBox/flexBetweenBox';
import {
    MdOutlineChatBubbleOutline,
    MdOutlineFavoriteBorder,
    MdOutlineFavorite,
    MdReply
} from "react-icons/md";
import services from '../../util/services';
import {StatusCode} from '../../util/common/enums';
import CommentEditor from 'components/CommentEditor/CommentEditor';
import Avatar from 'components/Avatar/Avatar';

// Recursive component to render comments and replies
const Comment = ({ comment, commentReply, setShowAddComment}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [showReplies, setShowReplies] = useState(false);
  const [showAddReplies, setShowAddReplies] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [userLikedComments, setUserLikedComments] = useState(user.likedComments);


  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const showAddRepliesInput = () => {
    setShowAddReplies(!showAddReplies);
    setShowAddComment(false)   //remove the comment reply from the ui
  };

    //Check if a comment is like by the user
    const checkLikes = () => {
        return userLikedComments.includes(comment._id);
    };

    // Add user comment
    const likeComment = async () => {
        const result = await services.getLikedComment(user._id, comment._id);
        if(result.status === StatusCode.success){
            setLikes(result.data.likes);
            setUserLikedComments(result.data.user.likedComments);
        }
    }

    //don't show the replies reply if comment reply is active
    useEffect(()=> {
        if(commentReply){
            setShowReplies(false);
        }
    }, [commentReply])

  return (
    <div>
      <Box  style={{ cursor: 'pointer' }}>
        <Box>
            <Divider/>
            <Box sx={{mt: '1rem', ml: '1rem'}}>
              <Box sx={{display: 'flex'}} onClick={() => {
                    navigate(`/profile`, {state: {friendId: comment.user._id}});
                  }}>
                  <Avatar 
                  image={comment.user.picture} 
                  size="35px" 
                  />
                  <Box sx={{ml: `2rem`}}>
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
                          {`${comment.user.firstName} ${comment.user.lastName}`}
                          <span> @ {timeDifference(comment.createdAt)}</span>
                      </Typography>
                      <Typography color={medium} fontSize="0.75rem">
                          {comment.user.location}
                      </Typography>
                  </Box>
              </Box>
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem", ml: '3rem' }} onClick={toggleReplies}>
                  {parser(comment.comment)}
              </Typography>
            </Box>
            <Box sx={{display: 'flex', ml: '4.5rem'}}>
            <FlexBetweenBox gap="0.3rem">
                {checkLikes() ? (
                  <IconButton
                  onClick={() => likeComment()}
                  >
                  <MdOutlineFavorite sx={{ color: primary }} />
                  </IconButton>
                ) : (
                <IconButton onClick={() => likeComment()}>
                  <MdOutlineFavoriteBorder />
                </IconButton>
                  )}

              <Typography>{likes > 0 && likes}</Typography>
            </FlexBetweenBox>

            <FlexBetweenBox gap="0.3rem" sx={{ml: '1rem'}}>
              <IconButton
              onClick={toggleReplies}
              >
                <MdOutlineChatBubbleOutline />
              </IconButton>
              <Typography>{getCommentCounts(comment.replies)}</Typography>
            </FlexBetweenBox>


            <FlexBetweenBox gap="0.3rem" sx={{ml: '1rem'}}>
              <IconButton onClick={showAddRepliesInput}>
                <MdReply/>
              </IconButton>
            </FlexBetweenBox>
          </Box>
        </Box>
      </Box>
      {showReplies && comment.replies && (
        <Box style={{ marginLeft: '5px' }}>
          {comment.replies.map((reply) => (
            <Comment key={reply._id} comment={reply} />
          ))}
        </Box>
      )}
      {showAddReplies && (
        <Box>
          <CommentEditor 
          commentId={comment._id}
          postId={comment.post}
          />
        </Box>
      )}
    </div>
  );
};


// Main component to render comments container
const CommentContainer = ({ comments, commentReply, setShowAddComment }) => {
    return (
      <div>
        {comments.map((comment) => (
          <Comment 
          key={getRandomInt()} 
          comment={comment} 
          commentReply={commentReply}
          setShowAddComment={setShowAddComment}
          />
        ))}
      </div>
    );
  };

export default CommentContainer;