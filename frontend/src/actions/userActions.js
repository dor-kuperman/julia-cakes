import { LOGIN_USER } from './types'

export const loginUser = (userCreds) => dispatch => {

    fetch('http://localhost:5050/users/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userCreds)
    })
        .then(res => res.json())
        .then(user => dispatch({
            type: LOGIN_USER,
            payload: user
        }))
}