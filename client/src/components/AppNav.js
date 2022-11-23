import { useContext, useState} from 'react'
import GlobalStoreContext from '../store'
import AuthContext from '../auth'
import {IconButton,Icon, Grid,AppBar, Toolbar, Container,Box, Link, Typography, Menu, MenuItem, Avatar, InputBase,Paper} from '@mui/material'
import {Home, Groups, Person, Sort, SortByAlpha, DateRange, Replay, RecommendOutlined} from '@mui/icons-material';
export default function AppNav(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const {auth} = useContext(AuthContext);
    const {store} = useContext(GlobalStoreContext);
    const {changed} = props


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleSearch = (event) =>{
        if(event.key === 'Enter'){
            console.log('value', event.target.value);
         }
    }
    const handleHome = () => {
        store.changeSelectionToHome();
        changed();
    }

    const handleAllLists = () => {
        
    }

    const handleUsers = () => {
        //TODO
    }
    
    const handleSortByName = () => {}
    const handleSortByPublishDate = () => {}
    const handleSortByListens = () => {}
    const handleSortByLikes = () => {}
    const handleSortByDislikes = () => {}


    const menu =     
        <Box>
            <MenuItem onClick={handleMenuClose}><SortByAlpha/><Typography onClick={null}>Name (A-Z) </Typography></MenuItem>
            <MenuItem onClick={handleMenuClose}><DateRange/><Typography onClick={null}>Publish Date (Newest)</Typography></MenuItem>
            <MenuItem onClick={handleMenuClose}><Replay/><Typography onClick={null}>Listens (High - Low)</Typography></MenuItem>
            <MenuItem onClick={handleMenuClose}><RecommendOutlined/><Typography onClick={null}>Likes (High - Low)</Typography></MenuItem>
            <MenuItem onClick={handleMenuClose}><RecommendOutlined style={{transform: 'scaleY(-1)'}}/><Typography onClick={null}>Dislikes (High - Low)</Typography></MenuItem>
        </Box>
    return(
        <AppBar position="static" elevation='0' style={{backgroundColor:"rgba(255, 0, 0, 0)"}}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Grid container columnSpacing={2}>
                                <Grid item>
                                    <IconButton disabled={auth.guest} onClick={handleHome}>
                                        <Home/>
                                    </IconButton>    
                                </Grid>
                                <Grid item>
                                    <IconButton>
                                        <Groups/>
                                    </IconButton> 
                                </Grid>
                                <Grid item>
                                    <IconButton> 
                                        <Person/>
                                    </IconButton> 
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8} md={10}>
                            <Paper>
                                <InputBase onKeyDown={handleSearch} sx={{pl: 1, flex: 1 }} fullWidth placeholder="Search"/>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Box >  
                                <IconButton>
                                    <Sort onClick={handleMenuOpen}/>
                                </IconButton> 
                                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} MenuListProps={{ 'aria-labelledby': 'basic-button',}}>
                                    {menu}
                                </Menu>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}