import { FETCH_CAKES, NEW_CAKE, REMOVE_CAKE, EDIT_CAKE } from './types'
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://example.com";

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/cakes'
    : '//localhost:5050/cakes';
console.log(BASE_URL);
// C
export const createCake = (cakeData) => dispatch => {

    fetch(BASE_URL + '/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(cakeData),
    })
        .then(res => res.json())
        .then(cake => dispatch({
            type: NEW_CAKE,
            payload: cake
        }))
}

// R
export const fetchCakes = () => dispatch => {
    fetch(BASE_URL)
        .then(res => res.json())
        .then(cakes => dispatch({
            type: FETCH_CAKES,
            'Access-Control-Allow-Origin': '*',
            payload: cakes
        }))
}

// U
export const editCake = (cakeData) => dispatch => {
    fetch(BASE_URL + '/update' + cakeData._id, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(cakeData)
    })
        .then(res => res.json())
        .then(cake => dispatch({
            'Access-Control-Allow-Origin': '*',
            type: EDIT_CAKE,
            payload: cake
        }))
}

// D
export const deleteCake = (cakeID) => dispatch => {

    fetch(BASE_URL + cakeID, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json'
        },
    })
    dispatch({
        type: REMOVE_CAKE,
        payload: cakeID
    })
}