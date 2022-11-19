import React, {useContext, useState } from 'react';
import AuthContext from '../auth';
import {Icon, Grid,AppBar, Toolbar, Container,Box, Link, IconButton, Menu, MenuItem, Avatar} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Button from './PillButton'
import AccountCircle from '@mui/icons-material/AccountCircle';
import {KeyboardArrowDown} from '@mui/icons-material';
import logo from '../images/playlister.svg'

export default function AppBanner(){
    const {auth} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = (event) => {
        setAnchorEl(null);
    }
    const handleLogOut = (event) => {
        
    }

    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <AccountCircle fontSize='large'/>;
    }

    let menuItems ="";
    if (!auth.loggedIn){
        menuItems = 
            <Box>
                <MenuItem onClick={handleMenuClose}><Link href="/login">Login</Link></MenuItem>
                <MenuItem onClick={handleMenuClose}><Link href="/register">Register</Link></MenuItem>
                <MenuItem onClick={handleMenuClose}><Link href="/">Use as Guest</Link></MenuItem>
            </Box>
    }else{
        menuItems=
        <Box>
            <MenuItem onClick={handleMenuClose}><Link href='/' onClick={handleLogOut}>Log Out</Link></MenuItem>
        </Box>
    }

    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Grid container sx={{justifyContent:'space-between'}}>
                        <Icon fontSize='large' sx={{fontSize:'4em'}}><Link href="/"><img src={logo} width={'100%'} height={'100%'}/></Link></Icon>
                        <Box>   
                            <Button pill variant="contained" onClick={handleMenuOpen} endIcon={<KeyboardArrowDown/>}>
                                <Avatar sx={{ width: 31, height: 31,bgcolor:'Gray'}}>{getAccountMenu(auth.loggedIn)}</Avatar>
                            </Button>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} MenuListProps={{ 'aria-labelledby': 'basic-button',}}>
                                {menuItems}
                            </Menu>
                        </Box>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

