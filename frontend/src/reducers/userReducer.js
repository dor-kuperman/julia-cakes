import { LOGIN_USER } from '../actions/types'

const initialState = {

    user: {},
    logingError: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            if (action.payload.name) {
                console.log('got error');
                return {
                    ...state,
                    logingError: 'login error'

                };

            } else {
                sessionStorage.setItem('loggedUser', action.payload[0].username);
                window.location = '/';

                return {
                    ...state,
                    user: action.payload

                };
            }


        default: return state;
    }

}