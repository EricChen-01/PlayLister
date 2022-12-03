import {Box, Grid, Typography, List, ListItem, Card} from '@mui/material';
import {useContext} from 'react'
import Button from './PillButton';
import GlobalStoreContext from '../store';
import AuthContext from '../auth'

export default function EditToolbar(props){
    const {changed, idNamePair} = props;
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    const buttonStyle = {
        toolbar:{
            '&:hover': {backgroundColor:'#DDDDDD'},backgroundColor:'#DDDDDD'
        }
    }

    const handleAddSong = (event) => {
        event.stopPropagation();
    }
    const handlePublishList = (event) => {
        event.stopPropagation();
        console.log('publishing list.')
        store.publishList();
        changed();
    }
    const handleDeleteList = (event) => {
        event.stopPropagation();
    }
    const handleUndo = (event) => {
        event.stopPropagation();
    }
    const handleRedo = (event) => {
        event.stopPropagation();
    }
    const handleDuplicateList = (event) => {
        event.stopPropagation();
    }

    let showDelete = () => {
        if(auth.user && !(auth.user.email === idNamePair.email)){
            return('')
        }
        return (
            <Grid item>
                <Button pill variant='contained' size='small' sx={buttonStyle.toolbar}><Typography color='black'>Delete</Typography></Button>
            </Grid>
        )
    }

    let publishedToolBar =
        <Box>
            <Grid container justifyContent="flex-end">
                {showDelete()}
                <Grid item>
                    <Button pill variant='contained' size='small' sx={buttonStyle.toolbar}><Typography color='black'>Duplicate</Typography></Button>
                </Grid>
            </Grid>
        </Box>  
    
    let unpublishedToolbar = 
        <Box>
            <Grid container>
                <Grid item>
                    <Button pill variant='contained' size='small' sx={buttonStyle.toolbar}><Typography color='black'>Redo</Typography></Button>
                    <Button pill variant='contained' size='small' sx={buttonStyle.toolbar}><Typography color='black'>Undo</Typography></Button>
                </Grid>
                <Grid item>
                    <Button pill variant='contained' size='small' sx={buttonStyle.toolbar}><Typography color='black'>Add</Typography></Button>
                    <Button pill variant='contained' size='small' sx={buttonStyle.toolbar} onClick={handlePublishList}><Typography color='black'>Publish</Typography></Button>
                    <Button pill variant='contained' size='small' sx={buttonStyle.toolbar}><Typography color='black'>Delete</Typography></Button>
                    <Button pill variant='contained' size='small' sx={buttonStyle.toolbar}><Typography color='black'>Duplicate</Typography></Button>
                </Grid>
            </Grid>
        </Box>  

    let toolbar = '';
    if(auth.loggedIn){
        if(store.currentList){
            if(store.currentList.isPublished){
                toolbar = publishedToolBar;
            }else{
                toolbar = unpublishedToolbar;
            }
        }
    }
    return(
        <Box border={2} width='100%'>
            {toolbar}
        </Box>
    )
}