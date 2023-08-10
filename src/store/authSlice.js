import  {createSlice} from '@reduxjs/toolkit'


const initialState = {
    mode: 'dark',
    user: null,
    token: null,
    feeds: [],
    friends: []
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
       login(state, action){
           state.user = action.payload.user;
           state.token = action.payload.token;
        },
        logout(state){
            state.user = null;
            state.token = null;
       },
       setFeeds(state, action){
        state.feeds = action.payload.posts
       },
       setFriends(state, action){
        state.friends = action.payload
       }
    }
});

export default authSlice.reducer;
export const authActions = authSlice.actions