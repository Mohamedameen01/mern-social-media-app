import {
  FETCH_ALL_POST,
  CREATE_NEW_POST,
  DELETE_POST,
  UPDATE_POST,
  LIKE_POST,
} from "./postType";
import * as api from "../../api/index";

export const getUserPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUserPosts();
    dispatch({
      type: FETCH_ALL_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createNewPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    console.log(data);
    dispatch({
      type: CREATE_NEW_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await api.removePost(postId);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    await api.updatePost(id, post);
    dispatch({
      type: UPDATE_POST,
      payload: post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.togglePostLike(postId);
    dispatch({
      type: LIKE_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
