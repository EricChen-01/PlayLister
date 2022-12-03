import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import Workspace from './Workspace';

import {Card,ListItem,Typography, Box, Grid,Collapse, IconButton, Container} from '@mui/material';
import {ThumbUpOffAlt,ThumbDownOffAlt, ThumbDown,ThumbUp, KeyboardDoubleArrowUp, KeyboardDoubleArrowDown} from '@mui/icons-material';


export default function ListCard(props) {
    const { idNamePair, changed, expanded, changeexpanded} = props;
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    
    let published = idNamePair.public;
    let ownerName = idNamePair.ownerName;
    let listName = idNamePair.name;
    let likes = idNamePair.likes;
    let dislikes = idNamePair.dislikes;
    let datePublished = idNamePair.datePublished;
    let dateObject = new Date(datePublished);
    let date = (dateObject) ?`${dateObject.toLocaleString('en-US', {month: 'short'})} ${dateObject.getMonth()+1}, ${dateObject.getFullYear()}` : '';
    
    const colors = {
        GOLD: 'rgb(212,212,145)',
        BLUEGRAY: 'rgb(212,212,245)',
        CREAM: '#FFFFEA'
    }

    const handleChange = (id) => (event) => {
        event.stopPropagation();
        handleLoadList(event,id);
        changeexpanded(id);
    }
    
    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0){
                _id = ("" + _id).substring("list-card-text-".length);
            }
            
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    let collapse = 
        <Box>
            <Collapse in={expanded === idNamePair._id} timeout="auto" unmountOnExit>
                <Workspace changed={changed} idNamePair={idNamePair}/>
            </Collapse>
        </Box>

    let publishedCard = 
        <ListItem disableGutters 
            id={idNamePair._id}
            key={idNamePair._id}
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}>
            <Card sx={{width:545, minHeight:100,backgroundColor: colors.BLUEGRAY, '&:hover':{border:'1px solid black'} }}>
                <Grid container direction='column'>
                    <Grid item width='100%'>
                        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                            <Grid item>
                                <Typography>{listName}</Typography>
                                <Typography>By: {ownerName}</Typography>
                                <Typography>published: {date}</Typography>
                            </Grid>
                            <Grid item direction='row'>
                                <Grid container>
                                    <ThumbUpOffAlt/>
                                    <Typography>{likes}</Typography>
                                    <ThumbDownOffAlt/>
                                    <Typography>{dislikes}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item width='100%'>
                        {collapse}
                    </Grid>
                    <Grid item width='100%'>
                        <Grid container direction='row' justifyContent='flex-end' alignItems='flex-end'>
                            <IconButton onClick={handleChange(idNamePair._id)}>
                                {expanded === idNamePair._id ? <KeyboardDoubleArrowUp/> : <KeyboardDoubleArrowDown/>}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </ListItem> 

    let unpublishedCard =     
        <ListItem disableGutters 
        id={idNamePair._id}
        key={idNamePair._id}
        onClick={(event) => {
            handleLoadList(event, idNamePair._id)
        }}>
           <Card sx={{ width: 545, minHeight:100,backgroundColor: colors.CREAM}}>
                <Grid container direction='column'>
                    <Grid item>
                        <Typography>{listName}</Typography>
                        <Typography>By: {ownerName}</Typography>
                    </Grid>
                    <Grid item >
                        {collapse}
                    </Grid>
                    <Grid item width='100%'>
                        <Grid container direction='row' justifyContent='flex-end' alignItems='flex-end'>
                            <IconButton onClick={handleChange(idNamePair._id)}>
                                {expanded === idNamePair._id ? <KeyboardDoubleArrowUp/> : <KeyboardDoubleArrowDown/>}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
           </Card>
        </ListItem> 
    let card = "";
    
    if(published){
        card = publishedCard;
    }else{
        card = unpublishedCard;
    }
    
    return( 
        card
    )
}
