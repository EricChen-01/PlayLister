import {useContext} from 'react';
import AuthContext from '../auth';
import GlobalStoreContext from '../store';
import {Container ,Grid, Typography, Box, TextField, FormControlLabel,Checkbox,Link} from '@mui/material'
import Button from './PillButton'
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ErrorLogin from './ErrorModals/ErrorLogin'

export default function LoginScreen(){
    const { auth } = useContext(AuthContext);
    const {store} = useContext(GlobalStoreContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        auth.loginUser(
            data.get('email'),
            data.get('password')
        );
        
    };
    

    let loginScreen = "You are logged in. Please log out to login"
    if(!auth.loggedIn) {        
        loginScreen = 
        <Container component="main" maxWidth="xs" style={{border: '5px solid black', borderRadius: '10px'}}>
            <CssBaseline />
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'space-between'}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <ErrorLogin/>   
                </Box>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password"/>
                        </Grid>
                    </Grid>
                    <Button pill type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/register" variant="body2">
                            Don't have an account? Create an account
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    }

    return(
        <Grid container className='Screen'>
            <Grid item style={{margin:'auto auto auto',backgroundColor:'rgb(240, 240, 240)', borderRadius:'10px'}}>
                {loginScreen}
            </Grid>
        </Grid>
        
    )
}
