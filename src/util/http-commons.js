
import axios from "axios";
import store from "../store/store"; // Replace with the actual path to your Redux store

//     console.log(store.getState());
// const token = store.getState().token;
//     console.log({token});

const http = axios.create({
  baseURL: "http://localhost:9000/",
  headers: {
    "Content-type": "application/json",
    // ...token ? {"Authorization": `Bearer ${token}`} : {}
  },
});

// Add an Axios interceptor to set the authorization header for each outgoing request
http.interceptors.request.use(
  (config) => {
    const token = store.getState().token;
    console.log({token})
    if (token && config.url !== '/uploadImage') {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log({config});
    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
