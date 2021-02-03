import React, { useState, useEffect } from 'react'
// import { connect } from 'react-redux'
import useForm from 'react-hook-form'
import { fetchCakes, deleteCake } from '../actions/cakeActions'
import { useDispatch, useSelector } from "react-redux";

export const HooksRedux = () => {

    // ! cheat sheet for set from input
    const [userName, setUserName] = useState('')

    const changeUserName = (e) => {
        setUserName(e.target.value)
    }
    // !

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCakes())
    }, []
    )

    const cakes = useSelector(state => state.cakes.cakes);

    return (
        <div>
            // ! cheat sheet for set from input
            <form>
                <input onChange={changeUserName} type='text' placeholder='Username'>
                </input>
            </form>
            {userName}
            // !

            {cakes.map(cake =>

                <div className="cakeCard" key={cake._id}>
                    <img className="cake-img" src={cake.imgURL} />
                    <div className="text-overlay">
                        <div className="img-text">Cake name: {cake.username}
                            <br>
                            </br>
            Cake description: {cake.description}
                            <br>
                            </br>
            Cake price: {cake.duration}
                        </div>
                        {(
                            <div className="btn-container">
                                <button className="buy-admin-button">Buy Now!
                </button>
                            </div>
                        )}
                    </div>

                </div >
            )}
        </div>
    )
}