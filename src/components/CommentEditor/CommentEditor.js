import React, { useState } from 'react';
import styles from './CommentEditor.module.css';
import { useDispatch, useSelector } from "react-redux";
import services from '../../util/services';
import {authActions} from '../../store/authSlice';
import {
  Box,
  useTheme,
  Button
} from "@mui/material";
import Avatar from '../Avatar/Avatar'
import WidgetWrapper from '../WidgetWrapper/WidgetWrapper';
import CompTextEditor from '../CompTextEditor/CompTextEditor';
import { StatusCode } from '../../util/common/enums';


const CommentEditor = ({commentId, postId, setComments}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);

  const handleComment = async () => {
    const newComment = {
      comment,
      postId,
      userId: user._id,
      ...(commentId ? {commentId} : {})
    };
    const result = await services.postComment(newComment);
    if(result.status === StatusCode.success){
      dispatch(authActions.setFeeds({posts: result.data}))
      setComment('');    // An update is required here
    }
  };
  return(
    <div className={styles.CommentEditor} data-testid="CommentEditor">
      <WidgetWrapper>
        <Box sx={{display: "flex"}}>
          <Avatar image={user.picture} size='45'/>
          <Box sx={{
            backgroundColor: palette.neutral.light,
            marginLeft: "1rem",
            flexGrow: 1,
            
          }}>
            <CompTextEditor 
            setEditorData={setComment} 
            show={false} placeholder='Reply...'
            height= '60px'
            />
          </Box>
        </Box>

      <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: '1rem'}}>
        <Button
          disabled={!comment}
          onClick={handleComment}
          sx={{
            color: palette.background.alt,
            borderColor: palette.primary.main,
            borderRadius: "1rem",
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          Post
        </Button>
      </Box>
      </WidgetWrapper>
    </div>
  )
};



export default CommentEditor;
