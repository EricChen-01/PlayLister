import React, {useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth';
import {Icon, Grid,AppBar, Toolbar, Container,Box, Link, Typography, Menu, MenuItem, Avatar} from '@mui/material'
import Button from './PillButton'
import AccountCircle from '@mui/icons-material/AccountCircle';
import {KeyboardArrowDown} from '@mui/icons-material';
import logo from '../images/playlister.svg'

export default function AppBanner(){
    const {auth} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    const handleLogOut = () => {
        auth.logoutUser();
    }
    function getAccountAvatar(loggedIn) {
        let userInitials = auth.getUserInitials();
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <AccountCircle fontSize='large'/>;
    }
    function getAccountText(loggedIn){
        let userFirstName = auth.getUserFirstName();
        if (loggedIn) 
            return userFirstName
        else
            return 'GUEST'
    }

    let menuItems ="";
    if (!auth.loggedIn){
        menuItems = 
            <Box>
                <MenuItem onClick={handleMenuClose}><Link href="/login" color="inherit" underline="none">Login</Link></MenuItem>
                <MenuItem onClick={handleMenuClose}><Link href="/register" color="inherit" underline="none">Register</Link></MenuItem>
            </Box>
    }else{
        menuItems=
        <Box>
            <MenuItem onClick={handleMenuClose}><Link href="/" color="inherit" underline="none" onClick={handleLogOut}>Log Out</Link></MenuItem>
        </Box>
    }

    return(
        <AppBar position="static" style={{backgroundColor:"#f9f6f0"}} elevation='14'>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Grid container justifyContent='space-between' alignItems="center">
                        <Grid item>
                            <Icon fontSize='large' sx={{fontSize:'4em'}}><Link href="/"><img src={logo} width={'100%'} height={'100%'}/></Link></Icon>
                        </Grid>
                        <Grid item >
                            <Box >   
                                <Button pill variant="contained" onClick={handleMenuOpen} sx={{boxShadow:10}} endIcon={<KeyboardArrowDown/>}>
                                    <Avatar sx={{ width: 31, height: 31,bgcolor:'Gray'}}>{getAccountAvatar(auth.loggedIn)}</Avatar> 
                                    <Typography>{getAccountText(auth.loggedIn)}</Typography>
                                </Button>
                                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} MenuListProps={{ 'aria-labelledby': 'basic-button',}}>
                                    {menuItems}
                                </Menu>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

