import React, { useState } from 'react'
import { loginUser } from '../actions/userActions'
import { useDispatch, useSelector } from "react-redux";

export const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    // onSubmit(e) {
    //     e.preventDefault();

    //     const user = {
    //         username: this.state.username,
    //         password: this.state.password,
    //     }

    //     this.props.loginUser(user)

    // }

    const onSubmit = (e) => {
        e.preventDefault();
        const user = { username: username, password: password }
        dispatch(loginUser(user))
    }


    let header;
    // if (Object.keys(this.props.loginError).length !== 0 && this.props.loginError.constructor !== Object) {
    //     header = <h3>Please enter correct username and/or password</h3>;
    // }
    const style = {
        textAlign: "-webkit-center",
        marginTop: '180px'

    }
    return (
        <div className='login-form' style={style}>
            <h3 style={{fontSize: '2rem'}}>Login</h3>
            <form className="table-style" onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        name='username'
                        onChange={changeUsername}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password"
                        required
                        name='password'
                        onChange={changePassword}
                        className="form-control"
                    />
                </div>
                {header}
                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>
            </form>
        </div >
    )
}
