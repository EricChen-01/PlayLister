import { useContext, useState, useEffect} from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import Workspace from './Workspace';

import {Card,ListItem,Typography, Box, Grid,Collapse, IconButton, Divider, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';
import {ThumbUpOffAlt,ThumbDownOffAlt, KeyboardDoubleArrowUp, KeyboardDoubleArrowDown} from '@mui/icons-material';


export default function ListCard(props) {
    const { idNamePair, changed, expanded, changeexpanded, selected} = props;
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [listened, setListened] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [setting,setSetting] = useState('');
    let published = idNamePair.public;
    let ownerName = idNamePair.ownerName;
    let listName = idNamePair.name;
    let likes = idNamePair.likes;
    let dislikes = idNamePair.dislikes;
    let datePublished = idNamePair.datePublished;
    let dateObject = new Date(datePublished);
    let listens = idNamePair.listens;
    let date = (dateObject) ?`${dateObject.toLocaleString('en-US', {month: 'short'})} ${dateObject.getDate()}, ${dateObject.getFullYear()}` : '';
    
    let clickTimeout = null // for checking if double or single click
    const colors = {
        GOLD: 'rgb(212,212,145)',
        BLUEGRAY: 'rgb(212,212,245)',
        CREAM: '#FFFFEA'
    }

    const handleNewSetting = (event,newSetting) => {
        setSetting(newSetting)
    }

    const handleChange = (id) => (event) => {
        event.stopPropagation();
        //handleLoadList(event,id);
        changeexpanded(id);
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }
    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }
    
    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0){
                _id = ("" + _id).substring("list-card-text-".length);
            }
            if(published && !listened){
                store.addListen(id);
                setListened(true);
            }
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }
    function handleClick(event, id){

        if (clickTimeout !== null) {
            handleToggleEdit(event);
            clearTimeout(clickTimeout)
            clickTimeout = null
          } else { 
            clickTimeout = setTimeout(()=>{
            handleLoadList(event,id);
            clearTimeout(clickTimeout)
              clickTimeout = null
            }, 300)
          }
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let text = event.target.value;
            let id = idNamePair._id;
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleViewUser(event) {
        event.stopPropagation();
        store.viewUser(event.target.innerText);
        changed();
    }
    function handleLike(event) {
        event.stopPropagation();
        if(liked){
            console.log('handle like and liked')
            likes = likes - 1;
            setLiked(false);
        }else{
            if(disliked){
                likes = likes + 1;
                dislikes = dislikes - 1;
                setLiked(true);
                setDisliked(false);
            }else{
                likes = likes + 1;
                setLiked(true);
            }
        }
        store.updateRating(likes,dislikes,idNamePair._id);
    }
    function handleDislike(event){
        event.stopPropagation();
        if(disliked){
            dislikes = dislikes - 1;
            setDisliked(false);
        }else{
            if(liked){
                likes = likes - 1;
                dislikes = dislikes + 1;
                setLiked(false);
                setDisliked(true);
            }else{
                dislikes = dislikes + 1;
                setDisliked(true);
            }
        }
        store.updateRating(likes,dislikes,idNamePair._id);
    }
    
    let collapse = 
        <Box>
            <Collapse in={expanded === idNamePair._id} timeout="auto" unmountOnExit>
                <Workspace changed={changed} idNamePair={idNamePair}/>
            </Collapse>
        </Box>

    let publishedCard = 
        <ListItem 
            sx={{maxWidth:645}}
            disableGutters 
            id={idNamePair._id}
            key={idNamePair._id}
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
            >
            <Card sx={{width:645, minHeight:100,backgroundColor: (selected) ? colors.GOLD : colors.BLUEGRAY, '&:hover':{border:'1px solid black'} }}>
                <Grid container direction='column'>
                    <Grid item width='100%'>
                        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                            <Grid item>
                                <Typography fontWeight='bold'>{listName}</Typography>
                                <Typography>By: <Typography sx={{textDecoration:'underline'}} display='inline' onClick={handleViewUser}>{ownerName}</Typography></Typography>
                                <Typography>published: {date}</Typography>
                                <Typography>listens: {listens}</Typography>
                            </Grid>
                            <Grid item direction='row'>
                                <Grid container>
                                    <ToggleButtonGroup
                                        value={setting}
                                        exclusive
                                        onChange={handleNewSetting}
                                    >   
                                        <ToggleButton value='up' onClick={handleLike}><ThumbUpOffAlt/></ToggleButton>
                                        <Grid container alignItems='center'>
                                            <Typography>{likes}</Typography>
                                        </Grid>
                                        <ToggleButton value='down' onClick={handleDislike}>
                                            <ThumbDownOffAlt/>
                                        </ToggleButton>
                                        <Grid container alignItems='center'>
                                            <Typography>{dislikes}</Typography>
                                        </Grid>
                                    </ToggleButtonGroup>
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
        <ListItem 
            disableGutters 
            sx={{maxWidth:645}} 
            id={idNamePair._id} 
            key={idNamePair._id}
            onClick={(event) => {
                handleClick(event,idNamePair._id);
            }}>
           <Card sx={{ width: 645, minHeight:100,backgroundColor: (selected) ? colors.GOLD : colors.CREAM, '&:hover':{border:'1px solid black'}}}>
                <Grid container direction='column'>
                    <Grid item>
                        <Typography fontWeight='bold'>{listName}</Typography>
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
    
    if(editActive){
        card = 
        <ListItem disableGutters sx={{maxWidth:545}} >
           <Card sx={{ width: 545, minHeight:100,backgroundColor: colors.CREAM}}>
                <Typography>Edit list: {idNamePair.name}</Typography>
                <Divider/>
                <TextField sx={{width:'100%'}} onKeyPress={handleKeyPress}/>
           </Card>
        </ListItem> 
    }
    return( 
        card
    )
}
