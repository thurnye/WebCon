import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './PostFeeds.module.css';
import PostFeedContainer from '../../PostFeedContainer/PostFeedContainer';
import services from '../../../util/services';
import { StatusCode } from '../../../util/common/enums';
import {authActions} from '../../../store/authSlice';

const PostFeeds = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const feeds = useSelector((state) => state.feeds);
  const [loading, setLoading] = useState(true);

  const getUserFeeds = async () => {
    const result = await services.getUserFeeds(user._id);
    if(result.status === StatusCode.success){
      dispatch(authActions.setFeeds({posts: result.data}))
    }
  };

  useEffect(() => {
    if(user){
      getUserFeeds();
      setLoading(false);
    }
  }, [user])
  
  return(
    <div className={styles.PostFeeds} data-testid="PostFeeds">
      {
        !loading ? 
        feeds.length > 0 ? feeds.map((post, i) => <React.Fragment key={`feeds_${i}`}>
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
