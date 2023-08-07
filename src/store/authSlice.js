import  {createSlice} from '@reduxjs/toolkit'


const initialState = {
    mode: 'light',
    user: null,
    token: null,
    feeds: []
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
       login(state, action){
        console.log({action});
           state.user = action.payload.user;
           state.token = action.payload.token;
        },
        logout(state){
            state.user = null;
            state.token = null;
       },
       setFeeds(state, action){
        state.feeds = action.payload.posts
       }
    }
});

export default authSlice.reducer;
export const authActions = authSlice.actions