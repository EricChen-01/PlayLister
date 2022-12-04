import {useContext} from 'react';
import AuthContext from '../auth'
import {Container ,Grid, Typography, Box, TextField, FormControlLabel,Checkbox,Link} from '@mui/material'
import Button from './PillButton'
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ErrorRegister from './ErrorModals/ErrorRegister'

export default function RegisterScreen(){
    const {auth} = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
        auth.registerUser(
            data.get('firstName'),
            data.get('lastName'),
            data.get('email'),
            data.get('password'),
            data.get('passwordVerify')
        );
    };
    
    let registerScreen = "You are logged in. Unable to go to register screen";
    if (!auth.loggedIn){
        registerScreen = 
        <Container component="main" maxWidth="xs" style={{border: '5px solid black', borderRadius: '10px'}}>
            <CssBaseline />
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <ErrorRegister/>   
                </Box>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth name="passwordVerify" label="password Verify" type="password" id="passwordVerify" autoComplete="new-password"/>
                        </Grid>
                    </Grid>
                    <Button pill type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    }

    return(
        <Grid container className='Screen'>
            <Grid item style={{margin:'auto auto auto',backgroundColor:'rgb(240, 240, 240)', borderRadius: '10px'}}>
                {registerScreen}
            </Grid>
        </Grid>
        
    )
}
