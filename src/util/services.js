import http from './http-commons';

class StuffDataService {

  // signup
  register(data) {
    return http.post("/auth/register", data);
  }

  // login
  postLogin(data) {
    return http.post(`/auth/login`, data);
  }

  // get user
  getUser(id) {
    return http.get(`/user/${id}`);
  }
  
  // get user
  getUserRecipes(id, data) {
    return http.post(`/user/${id}`, data);
  }

  //add a friend
  postAddFriend(userId, friendId) {
    return http.patch(`/user/${userId}/${friendId}`);
  }

  // create new post
  postPost(data) {
    return http.post("/post", data);
  }
  
  // news feeds
  getUserFeeds(id) {
    return http.get(`/postFeed/${id}`);
  }
  
  // like or save post
  getLikeSavePost(id, postId, actionType) {
    return http.get(`/user/${id}/${postId}/${actionType}`);
  }

  // like or save post
  postComment(data) {
    return http.post(`/post/comment`, data);
  }

  postImage(data) {
    return http.post('/uploadImage', data);
  }

}

export default new StuffDataService();