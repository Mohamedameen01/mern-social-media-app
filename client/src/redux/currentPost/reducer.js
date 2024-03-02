import { FETCH_CURRENT_POST } from "./actionTypes";

const currentPostReducer = ((state = {} , action) => {
    switch(action.type) {
        case FETCH_CURRENT_POST:
            return action.payload
        default:
            return state; 
    }
})

export default currentPostReducer;