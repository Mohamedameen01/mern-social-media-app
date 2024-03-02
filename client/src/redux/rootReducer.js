import { combineReducers } from 'redux';
import postReducer from './post/postReducer';
import currentPostReducer from './currentPost/reducer';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
    posts: postReducer,
    updatePost: currentPostReducer,
    googleAuth: authReducer
})

export default rootReducer;