import { createMuiTheme } from '@material-ui/core/styles';

const lightBrown = '#C5B9A0'
const arcOrange = '#FFBA60'


export default createMuiTheme({
    palette: {
        common: {
            blue: `${lightBrown}`,
            orange: `${arcOrange}`,
        },
        primary: {
            main: `${lightBrown}`
        },
        secondary: {
            main: `${arcOrange}`
        }
    },
    typography: {
        tab: {
            fontFamily: 'Raleway',
            textTransform: 'none',
            fontWeight: '700',
            fontSize: '7rem',
        },
        mobileMenu: {
            textTransform: 'none',
            fontWeight: '700',
            fontSize: '1.5rem',
        },
        mobileCreateCake: {
            textTransform: 'none',
            fontWeight: '700',
            fontSize: '1.5rem',
            color: 'white'
        },
        estimate: {
            fontSize: '1.5rem',
            textTransform: 'none',
            color: 'white'
        }
    }
});


