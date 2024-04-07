import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchUserPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost)
export const removePost = (postId) => API.delete(`/posts?id=${postId}`);
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
export const togglePostLike = (postId) => API.patch(`/posts/toggle-like/${postId}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const userSignup = (data) => API.post("/user/signup", data);
export const userSignin = (data) => API.post("/user/signin", data);

export const updateProfile = (data) => API.patch('/user/update-profile', data);
export const removeProfile = (data) => API.patch('/user/remove-profile', data);
