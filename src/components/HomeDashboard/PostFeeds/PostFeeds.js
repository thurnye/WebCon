import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router';
import styles from './PostFeeds.module.css';
import PostFeedContainer from '../../PostFeedContainer/PostFeedContainer';
import services from '../../../util/services';
import { StatusCode } from '../../../util/common/enums';
import {authActions} from '../../../store/authSlice';
import { getRandomInt } from 'util/common/general';

const PostFeeds = () => {
  const dispatch = useDispatch();
  const {state} = useLocation();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const feeds = useSelector((state) => state.feeds);
  const [loading, setLoading] = useState(true);

  console.log(state);

  useEffect(() => {
    
    
    const getUserFeeds = async () => {
      const id = state?.friendId ? state?.friendId : user._id;

      let result  = [];
      const friends = await services.getFriends(id);

      // Friends Page
      if(state?.friendId && state?.friendId !== user._id){
        console.log('calling post for users friend')
        result = await services.getUserPosts(state?.friendId);
        const friendInfo = await services.getUser(state?.friendId);
        if (friends.status === StatusCode.success) {
          console.log('setting friend for users friend')
          dispatch(authActions.setFriendFriends(friends.data));
          dispatch(authActions.setFriend(friendInfo.data));
        }
      }

      // Home Page
      if(!state?.friendId){
        console.log('calling post for homePage posts')
        result = await services.getUserFeeds(id); 
        if (friends.status === StatusCode.success) {
          dispatch(authActions.setFriends(friends.data));
          dispatch(authActions.setFriend(null));
        }
      }
      

      // Logged User
      if(state?.friendId.toString() === user._id){
        console.log('calling post for logged user');
        result = await services.getUserPosts(user._id);
        if (friends.status === StatusCode.success) {
          dispatch(authActions.setFriendFriends(friends.data));
          dispatch(authActions.setFriend(null));
        }
      }


      if (result.status === StatusCode.success) {
        dispatch(authActions.setFeeds({ posts: result.data }));
      }
    };
  
    if (user) {
      getUserFeeds();
      setLoading(false);
    }
  }, [user, dispatch, state, location]);
  
  return(
    <div className={styles.PostFeeds} data-testid="PostFeeds">
      {
        !loading ? 
        feeds.length > 0 ? feeds.map((post, i) => <React.Fragment key={`feeds_${getRandomInt()}`}>
          <PostFeedContainer post={post}/> 
        </React.Fragment>)
            : 
          'No Contents' 
        : 
        <>Loading...</>
      }
    </div>
  )
};

export default PostFeeds;
