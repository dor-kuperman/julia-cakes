import React, { Component } from 'react'
import { menuItems } from './menu-items.cmp'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../button.js'

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.signOut = this.signOut.bind(this);
        this.createButton = this.createButton.bind(this);
        this.state = {
            clicked: false,
            isAdminOnline: (sessionStorage.getItem('loggedUser') === 'Julia') ? true : false
        }
    }
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    signOut = (e) => {
        console.log(e.target.id);
        if (e.target.id === '3') {
            sessionStorage.removeItem('loggedUser');
            window.location = '/'
        }
    }

    createCakeClicked = () => {
        window.location = '/create';
    }

    backToHomePage = () => {
        window.location = '/'

    }
    createButton = () => {

        const createButton = (< Button onClick={this.createCakeClicked} > Create Cake
        </Button >)

        if (this.state.isAdminOnline) {
            return createButton


        }

        // return isAdminOnline ? (
        //     <Button onClick={this.createCakeClicked} > Create Cake
        //     </Button >
        // ) : (
        //         <td>

        //         </td>
        //     )

    }

    render() {

        const timesIcon = <FontAwesomeIcon icon={faTimes} />
        const hamburgerIcon = <FontAwesomeIcon icon={faBars} />

        return (
            <nav className="navbar-items" >
                <h1 onClick={this.backToHomePage} className="navbar-logo">Julia</h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <p className='hamburger'>{this.state.clicked ? timesIcon : hamburgerIcon}
                    </p>

                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {menuItems.map((item) => {
                        return (
                            <li key={item.id}>
                                <a onClick={this.signOut} id={item.id} className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                {this.createButton()}
            </nav >
        )
    }
}
