import { FETCH_CURRENT_POST } from "./actionTypes";

export const getCurrentPost = ( post ) => async(dispatch) => {
    try {
        dispatch({
            type: FETCH_CURRENT_POST,
            payload: {id : post._id, currentPost: post}
        })
    } catch (error) {
        console.log(error);
    }
}

