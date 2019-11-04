import { SET_MESSAGE_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    messages: [
        {id: 1, userId: 0, message: 'Hello'}
    ],
    user: null
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_MESSAGE_USER:
            return {
                messages:action.messages,
                user:action.user
            }
        default: 
            return state;
    }
}