import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../pics/logo2.jpeg'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
// import Menu from '@material-ui/core/Menu'
// import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import theme from './theme';
// import { SentimentVerySatisfiedOutlined } from '@material-ui/icons';

const currUser = sessionStorage.getItem('loggedUser');

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolBarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '4.8rem',
        [theme.breakpoints.down('md')]: {
            marginBottom: '74px'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '2em'
        },
    },
    logo: {
        height: '6em',
        [theme.breakpoints.down('md')]: {
            height: '6em'
        },
        [theme.breakpoints.down('xs')]: {
            height: '4.5em'
        },
    },
    logoContainer: {
        '&:hover': {
            backgroundColor: 'transparent'
        },
        padding: '0'
    },
    hamburgerIconContainer: {
        marginLeft: 'auto',
        '&:hover': {
            backgroundColor: 'transparent'
        },
    },
    tabContainer: {
        marginLeft: 'auto',
        marginRight: '2rem'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '1.5rem',
    },
    mobileMenu: {
        ...theme.typography.mobileMenu,
        minWidth: 10,
        marginLeft: '1.5rem',
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '50px',
        marginLeft: '50px',
        marginRight: '50px',
        height: '4rem',
    },
    createCakeButtonContainer: {
        backgroundColor: theme.palette.common.orange,
    },
    mobileCreateCake: {
        ...theme.typography.mobileMenu,
        color: 'white',
    },

    // * menu from hover
    // menu: {
    //     backgroundColor: theme.palette.common.blue,
    //     color: 'white',
    //     borderRadius: '0'
    // },
    // menuItem: {
    //     ...theme.typography.tab,
    //     opacity: 0.7,
    //     '&:hover:': {
    //         opacity: 1
    //     }
    // },
    hamburgerIcon: {
        height: '50px',
        width: '50px'
    },
    drawer: {
        backgroundColor: theme.palette.common.blue,
    },
    drawerItem: {
        ...theme.typography.mobileMenu,
        color: 'white',
        opacity: 0.7
    },
    drawerItemSelected: {
        '& .MuiListItemText-root': {
            opacity: 1
        },
    },
    appbar: {
        zIndex: theme.zIndex.modal + 1,
        maxHeight: '8rem',
    }
}))

function Header(props) {
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null)
    const theme = useTheme()
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
        setOpenMenu(true)
    }

    const signOut = () => {
        sessionStorage.removeItem('loggedUser');
        window.location = '/'
    }

    const routes = [
        { name: 'Home', link: '/', activeIndex: 0 },
        // { name: 'Catalog', link: '/catalog', activeIndex: 1 },
        { name: 'About me', link: '/about', activeIndex: 1 },
    ]

    useEffect(() => {
        [
            ...routes].forEach(route => {
                switch (window.location.pathname) {
                    case `${route.link}`:
                        if (value !== route.activeIndex) {
                            setValue(route.activeIndex)
                            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
                                setSelectedIndex(route.selectedIndex)
                            }
                        }
                        break
                    default:
                        break
                }
            })

    }, [value,
        selectedIndex, routes])

    const createCakeTab = (
        <Button
            className={classes.button}
            component={Link}
            to={'/create'}
            variant='contained' color='secondary'>
            Create Cake
        </Button>
    )

    const userSignedInTab = (
        <Tab disabled style={{ opacity: '0.7' }} className={classes.tab} label={`Hello, ${currUser}`} />
    )

    const userNotSignedInTab = (
        <Tab className={classes.tab} component={Link} to={'/sign-in'} label='Sign In' />
    )

    const logOutButtonTab = (
        <Tab
            className={classes.tab}
            color='secondary'
            label='Logout'
            onClick={signOut}>
        </Tab>
    )

    const tabs = (
        <React.Fragment>
            <Tabs value={value} onChange={handleChange} indicatorColor='primary' className={classes.tabContainer}>
                {routes.map((route) => (
                    <Tab key={route.name} className={classes.tab} component={Link} to={route.link} label={route.name} />
                )
                )}
                {currUser ? userSignedInTab && logOutButtonTab : userNotSignedInTab}
            </Tabs>
            {currUser === 'Julia' ? createCakeTab : null}
        </React.Fragment>
    )

    const createCakeDrawer = (
        <ListItem selected={value === 5} classes={{ root: classes.createCakeButtonContainer, selected: classes.drawerItemSelected }} onClick={() => { setOpenDrawer(false); setValue(5) }} divider button component={Link} to='/create'>
            <ListItemText className={classes.createCakeButtonText} disableTypography>
                Create Cake
            </ListItemText>
        </ListItem >
    )

    const userSignedInDrawer = (
        <ListItem divider classes={{ selected: classes.drawerItemSelected }}>
            <ListItemText className={classes.drawerItem} disableTypography>
                {`Hello, ${currUser}`}
            </ListItemText>
        </ListItem>
    )

    const userNotSignedInDrawer = (
        // <Tab className={classes.tab} component={Link} to={'/sign-in'} label='Sign In' />
        <ListItem divider button component={Link} classes={{ selected: classes.drawerItemSelected }} to={'/sign-in'} selected={value === 3} onClick={() => { setOpenDrawer(false); setValue(3) }}>
            <ListItemText className={classes.drawerItem} disableTypography>
                Sign In
            </ListItemText>
        </ListItem>
    )

    const logOutButtonDrawer = (

        <ListItem button divider classes={{ selected: classes.drawerItemSelected }}>
            <ListItemText
                className={classes.drawerItem} disableTypography
                color='secondary'
                onClick={signOut} >
                Sign Out
            </ListItemText>
        </ListItem >
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer classes={{ paper: classes.drawer }} disableBackdropTransition={!iOS} disableDiscovery={iOS}
                open={openDrawer} onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)}>
                <div className={classes.toolBarMargin}>
                </div>
                <List disablePadding>
                    {routes.map(route =>
                        (
                            <ListItem key={route.name} divider button component={Link} classes={{ selected: classes.drawerItemSelected }} to={route.link} selected={value === route.activeIndex} onClick={() => { setOpenDrawer(false); setValue(route.activeIndex) }}>
                                <ListItemText className={classes.drawerItem} disableTypography>
                                    {route.name}
                                </ListItemText>
                            </ListItem>
                        ))}
                    {currUser ? userSignedInDrawer && logOutButtonDrawer : userNotSignedInDrawer}
                    {currUser === 'Julia' ? createCakeDrawer : null}
                </List>
            </SwipeableDrawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)} disableRipple
                className={classes.hamburgerIconContainer}>
                <MenuIcon className={classes.hamburgerIcon} />
            </IconButton>
        </React.Fragment >
    )

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button component={Link} to='/' className={classes.logoContainer} disableRipple onClick={() => setValue(0)}>
                            <img alt="company logo" className={classes.logo} src={logo} />
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolBarMargin} />
        </React.Fragment>
    )
}

export default Header
