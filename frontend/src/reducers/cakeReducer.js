import { FETCH_CAKES, NEW_CAKE, REMOVE_CAKE, EDIT_CAKE } from '../actions/types'

const initialState = {
    cakes: [],
    cake: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CAKES:
            return {
                ...state,
                cakes: action.payload
            };
        case NEW_CAKE:
            console.log(action.payload);
            return {
                ...state,
                cake: action.payload
            };
        case REMOVE_CAKE:
            return {
                ...state,
                cakes: state.cakes.filter(cakes => cakes._id !== action.payload)
            };

        case EDIT_CAKE:
            return {
                ...state,
                cake: action.payload
            };

        default: return state;
    }

}