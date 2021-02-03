import React, { useEffect, } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchCakes, deleteCake } from '../actions/cakeActions'
import './homePage.css'

export const HomePage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCakes())
    }, []
    )

    const cakesState = useSelector(state => state.cakes.cakes);

    const isAdminOnline = (sessionStorage.getItem('loggedUser') === 'Julia') ? true : false
    const cakesToDisplay = cakesState.map(cake =>

        <div className="cakeCard" key={cake._id}>
            <img className="cake-img" src={cake.imgURL} />
            <div className="text-overlay">
                <div className="img-text">{cake.username}
                </div>
                {isAdminOnline ? (
                    <div className="buy-admin-button">
                        <Link to={"/edit/" + cake._id}>edit</Link> | <a href="#" id={cake._id} onClick={() => dispatch(deleteCake(cake._id))}>delete</a>
                    </div>
                ) : (
                        <div className="btn-container">
                            <button className="buy-admin-button">Buy Now!
                        </button>
                        </div>
                    )}
            </div>
        </div >
    )

    return (
        <div className="App">
            <div className="welcome-header">
                Welcome to Julia's Cakes
              </div>
            <div className="cakesTable">
                <div className="tbody">
                    {cakesToDisplay}
                </div>
            </div>
        </div >
    )
}