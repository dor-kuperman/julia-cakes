const currUser = sessionStorage.getItem('loggedUser');

export const menuItems = [
    {
        title: 'About Me',
        url: 'about-me',
        cName: 'nav-links',
        id: 0
    },
    {
        title: 'Catalog',
        url: '#',
        cName: 'nav-links',
        id: 1
    },
    {
        title: 'Login',
        url: 'sign-in',
        cName: 'nav-links',
        id: 2
    },

]

const signOutObj = {
    title: 'Logout',
    cName: 'nav-links cursor',
    id: 3
}

if (currUser) {
    menuItems[2].title = ` Hello, ${currUser}`
    menuItems[2].url = null
    menuItems.push(signOutObj)
}