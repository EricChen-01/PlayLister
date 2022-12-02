import {Box, Grid, Typography, List, ListItem, Card} from '@mui/material';
import {useContext} from 'react'
import Button from './PillButton';
import GlobalStoreContext from '../store';
import AuthContext from '../auth'

export default function EditToolbar(props){
    const {changed} = props;
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    let publishedToolBar =
        <Box>
            <Button pill>Delete</Button>
            <Button pill>Duplicate</Button>
        </Box>    
    
    const handlePublishList = () => {
        console.log('publishing list.')
        store.publishList();
        changed();
    }

    let unpublishedToolbar = 
        <Box border={1} width='100%'>
            <Button pill>Redo</Button>
            <Button pill>Undo</Button>
            <Button pill>Add</Button>
            <Button pill onClick={handlePublishList}>Publish</Button>
            <Button pill>Delete</Button>
            <Button pill>Duplicate</Button>
        </Box>  

    let toolbar = '';
    if(store.currentList){
        if(store.currentList.isPublished){
            toolbar = publishedToolBar;
        }else{
            toolbar = unpublishedToolbar;
        }
    }
    return(
        <Box>
            {toolbar}
        </Box>
    )
}