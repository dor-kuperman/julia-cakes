import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Navbar from './components/navbar/navbar.cmp'
import Header from './components/navbar/header'
import { Provider } from 'react-redux'
import store from './store'
import { HomePage } from './components/homePage.cmp'
import CakeCreate from './components/cakeCreate.cmp'
import { HooksRedux } from './components/hooksRedux.cmp'
import { SignIn } from './components/signIn.cmp'
import CakeEdit from './components/cakeEdit.cmp'
import AboutMe from './components/aboutMe.cmp'
import logo from '../src/pics/brooke-lark-pGM4sjt_BdQ-unsplash.jpg'
// import Header from './ui/header'
import theme from './components/navbar/theme'
import { ThemeProvider } from '@material-ui/core/styles';
// import Footer from './ui/footer'

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="container">
            <Header />
            <div className="main-container">
              <Route path="/" exact component={HomePage} />
              <Route path="/sign-in" exact component={SignIn} />
              <Route path="/create" exact component={CakeCreate} />
              <Route path="/edit/:id" exact component={CakeEdit} />
              <Route path="/redux" exact component={HooksRedux} />
              <Route path="/about" exact component={AboutMe} />
            </div>
          </div>
        </Router >
      </ThemeProvider>
    </Provider>
  )

}

export default App;