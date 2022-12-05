import { useContext, useState, useEffect} from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';


import {Card,ListItem,Typography, Box, Grid,Collapse, IconButton, Divider, TextField, Container} from '@mui/material';
import {Close} from '@mui/icons-material';


export default function SongCard(props) {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const {song, index} = props;

    const colors = {
        GOLD: 'rgb(212,212,145)',
        BLUEGRAY: 'rgb(212,212,245)',
        CREAM: '#FFFFEA'
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);
        console.log('from: ' + sourceIndex + " to " + targetIndex);
        
        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
        
        
    }
    function handleRemoveSong(event) {
        event.stopPropagation();
        event.preventDefault();
        store.markSongForDelete(index, song);
    }

    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        event.stopPropagation();
        if (event.detail === 2) {
            //store.showEditSongModal(index, song);
        }
    }

    let isCurrentSong = store.currentSongPlaying === index;
    let published = store.currentList.isPublished;

    let publishedCard = 
        <ListItem 
            disableGutters>
            <Card sx={{width:'100%',border: '1px solid black', backgroundColor: (isCurrentSong) ? colors.GOLD : colors.BLUEGRAY}}>
                <Container>
                    <Box width='100%'>
                        <Typography>{index + 1}. {song.title} by {song.artist}</Typography>
                    </Box>
                </Container>
            </Card>
        </ListItem> 

    let unpublishedCard =     
        <ListItem disableGutters >
           <Card sx={{width:'100%',border: '1px solid black',backgroundColor: (isCurrentSong) ? colors.GOLD : colors.BLUEGRAY}}>
                <Container>
                    <Grid container width='100%' alignItems="center" justifyContent="space-between">
                        <Grid item width='80%'>
                            <Box>
                                <Typography>{index + 1}. {song.title} by {song.artist}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleRemoveSong}><Close/></IconButton>
                        </Grid>
                    </Grid>
                </Container>
            </Card>
        </ListItem> 

    let card = "";
    if(published){
        card = publishedCard;
    }else{
        card = unpublishedCard;
    }
    
    return(
        <Box
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
        >
            {card}
        </Box>
    )
}
