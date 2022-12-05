import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import GlobalStoreContext from '../store'
import AuthContext from '../auth'
import { Typography, Box, Grid, Link} from '@mui/material';
import Button from './PillButton'
import CopyrightIcon from '@mui/icons-material/Copyright';

const styles = {
    logoText: {
        fontFamily: 'Apple Chancery',
        textDecoration: 'underline ',
        textUnderlineOffset: '4%',
        color: 'red',
        float: 'left'
    },
    content: {
        height:'100%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    copyright: {
        float:'right',
        color:'red',
        position:'relative',
        top:'20px',
        fontSize:'16px'
    },
    author: {
        float:'left',
        position:'relative',
        bottom:'15px',
        fontSize:'10px'
    },
    boxShadow: {
        boxShadow:'23'
    }
}

export default function SplashScreen() {
    const { auth} = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const history = useHistory();
    const handleContinueAsGuest = (event) => {
        auth.useAsGuest();
        history.push('/');
    };
 

    const main = 
    <Grid container direction="column">
        <Grid item sx={styles.content}>
            <Box sx={styles.content}>
                <CopyrightIcon sx={styles.copyright}/>
                <Box sx={{width:'100%'}}>
                    <Typography variant='h1' sx={styles.logoText}>PLAYLISTER</Typography>
                </Box>
                <Typography sx={styles.author}>By Eric Chen</Typography>
            </Box>
        </Grid>

        <Grid item sx={styles.content}>
            <Box>
                <Typography variant="h4">Welcome, Guest</Typography> 
                <Box>
                    <Typography variant="body1" >Please sign in or continue as guest </Typography>
                    <Typography variant="body1">Don't have an account? Register <Link href='/register'>here</Link></Typography>
                </Box>
            </Box>
        </Grid>
        
        <Grid item sx={styles.content}>
            <Box sx={{marginTop:'25%',marginBottom:'25%'}}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button pill variant='contained' href='/login' sx={{boxShadow:23}}>
                            Log in
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button pill variant='contained' onClick={handleContinueAsGuest} sx={{boxShadow:23}}>
                            Continue As Guest
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
        
        <Grid item>
            <Box>
                <Typography variant="body1" >PlayLister. Sharing at your fingertips.</Typography>
                <Typography variant="body2" align='center'> PlayLister is a music streaming platform that enables users to create, edit, and share their personal playlists</Typography>
            </Box>
        </Grid>
    </Grid>

    return(
        <Box className='SplashScreen'>
            <Box sx={styles.content}>
                {main}
            </Box>
        </Box>
    )
}
           
            
