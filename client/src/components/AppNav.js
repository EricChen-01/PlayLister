import { useContext, useState} from 'react'
import GlobalStoreContext from '../store'
import AuthContext from '../auth'
import {IconButton, Grid,AppBar, Toolbar, Container,Box, Typography, Menu, MenuItem, InputBase,Paper} from '@mui/material'
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
    const handleTextChange = (event) =>{
        let text = event.target.value;
        console.log('current text is: '+text);
        store.setSearchText(text);
    }
    const handleSearch = (event) =>{
        if(event.key === 'Enter'){
            let text = event.target.value;
            console.log('You search is: ' + event.target.value + 'Selection is: ' + store.currentSelection);
            store.search(text);
        }
    }
    const handleHome = () => {
        store.changeSelectionToHome();
        changed();
    }

    const handleAllLists = () => {
        store.changeSelectionToAllLists();
        changed();
    }

    const handleUsers = () => {
        store.changeSelectionToUsers();
        changed();
    }
    
    const handleSortByName = () => {
        store.sortByName();
        changed();
    }
    const handleSortByPublishDate = () => {
        store.sortByPublishDate();
        changed();
    }
    const handleSortByListens = () => {
        store.sortByListens();
        changed();
    }
    const handleSortByLikes = () => {
        store.sortByLikes();
        changed();
    }
    const handleSortByDislikes = () => {
        store.sortByDislikes();
        changed();
    }


    const menu =     
        <Box>
            <MenuItem onClick={handleMenuClose}><SortByAlpha/><Typography onClick={handleSortByName}>Name (A-Z) </Typography></MenuItem>
            <MenuItem onClick={handleMenuClose}><DateRange/><Typography onClick={handleSortByPublishDate}>Publish Date (Newest)</Typography></MenuItem>
            <MenuItem onClick={handleMenuClose}><Replay/><Typography onClick={handleSortByListens}>Listens (High - Low)</Typography></MenuItem>
            <MenuItem onClick={handleMenuClose}><RecommendOutlined/><Typography onClick={handleSortByLikes}>Likes (High - Low)</Typography></MenuItem>
            <MenuItem onClick={handleMenuClose}><RecommendOutlined style={{transform: 'scaleY(-1)'}}/><Typography onClick={handleSortByDislikes}>Dislikes (High - Low)</Typography></MenuItem>
        </Box>
    return(
        <AppBar position="static" elevation='0' style={{backgroundColor:"rgba(255, 0, 0, 0)"}}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Grid container columnSpacing={2}>
                                <Grid item>
                                    <IconButton color={(store.currentSelection === 'HOME')? 'info' : 'default'} disabled={auth.guest} onClick={handleHome}>
                                        <Home/>
                                    </IconButton>    
                                </Grid>
                                <Grid item>
                                    <IconButton color={(store.currentSelection === 'ALL_LISTS')? 'info' : 'default'} onClick={handleAllLists}>
                                        <Groups/>
                                    </IconButton> 
                                </Grid>
                                <Grid item>
                                    <IconButton color={(store.currentSelection === 'USERS')? 'info' : 'default'} onClick={handleUsers}> 
                                        <Person/>
                                    </IconButton> 
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8} md={10}>
                            <Paper>
                                <InputBase onChange={handleTextChange} onKeyDown={handleSearch} sx={{pl: 1, flex: 1 }} fullWidth placeholder="Search"/>
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