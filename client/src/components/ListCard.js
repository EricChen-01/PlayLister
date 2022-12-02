import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth'
import Workspace from './Workspace'

import {Card,ListItem,Typography, Box, Grid,Collapse, IconButton} from '@mui/material';
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
        <Collapse in={expanded === idNamePair._id} timeout="auto" unmountOnExit>
            <Workspace changed={changed}/>
        </Collapse>

    let publishedCard = 
        <ListItem disableGutters 
            id={idNamePair._id}
            key={idNamePair._id}
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}>
            <Card sx={{width:345, minHeight:100}}>
                <Grid container>
                    <Grid item width='100%'>
                        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                            <Grid item >
                                <Typography>{listName}</Typography>
                                <Typography>By: {ownerName}</Typography>
                                <Typography>published: {datePublished}</Typography>
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
                    <Grid item>
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
           <Card sx={{ width: 345, minHeight:100}}>
                <Grid container>
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

/*
sx={{position:'relative',width:'100%',minHeight:134, '&:hover':{border:'2px solid black'}}}
*/

/*
unpublished
 <Card elevation={1} sx={{position:'relative',width:'100%',minHeight:134, '&:hover':{border:'2px solid black'}}}>
                <Grid container position='absolute' direction='column' height='100%'>
                    <Grid item border={1}>
                        <Grid container>
                            <Grid item>
                                <Typography>{listName}</Typography>
                                <Typography>By: {ownerName}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {collapse}
                    </Grid>
                    <Grid item border={1}>
                        <Grid container height='100%' justifyContent='flex-end' alignItems='flex-end'>
                            <Grid item>
                                <IconButton onClick={handleChange(idNamePair._id)}>
                                    {expanded === idNamePair._id ? <KeyboardDoubleArrowUp/> : <KeyboardDoubleArrowDown/>}
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            */



            
/*
published
<Card elevation={1} sx={{width:'100%',minHeight:134, '&:hover':{border:'2px solid black'}}}>
                <Grid container justifyContent="space-between">
                    <Grid item border={2}>
                        <Typography>{listName}</Typography>
                        <Typography>By: {ownerName}</Typography>
                        <Typography>published: {}</Typography>
                    </Grid>
                    <Grid item border={2}>
                        <Grid container>
                            <Grid item>
                                <Grid container>
                                    <Grid item>
                                        <ThumbUpOffAlt/>
                                    </Grid>
                                    <Grid item>
                                        <Typography>{likes}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item>
                                        <ThumbDownOffAlt/>
                                    </Grid>
                                    <Grid item>
                                        <Typography>{dislikes}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            */