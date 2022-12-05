import {Card,Box,Modal, Typography, Grid, Divider, TextField} from '@mui/material'
import Button from '../PillButton'
import { useContext, useState, useRef} from 'react'
import GlobalStoreContext from '../../store'

export default function EditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleConfirm(){
        let newSongData = {
            title: (title == '') ? "Untitled" : title,
            artist: (artist == '') ? "?": artist,
            youTubeId: (youTubeId == '') ? "dQw4w9WgXcQ" : youTubeId
        }
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);   
    }
    function handleCancel(){
        store.hideModals(); 
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }


    return (
        <Modal open={store.currentModal == "EDIT_SONG"} onClose={handleCancel}>
            <Card sx={style}>
                <Grid container justifyContent='center'>
                    <Grid item>
                        <Typography>Edit Song: </Typography>
                        <Typography fontWeight='bold' >{store.currentSong.title}</Typography>
                    </Grid>
                </Grid>
                <Box paddingTop={2} paddingBottom={2}><Divider padding={2}/></Box>
                <Grid container>
                    <Grid item>
                        <Grid container alignItems='center' justifyContent='space-between'>
                            <Box paddingRight><Typography variant='h5'>Title:</Typography></Box>
                            <TextField value={title} onChange={handleUpdateTitle}/>
                        </Grid>
                        <Divider/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                            <Box paddingRight><Typography variant='h5'>Artist:</Typography></Box>
                            <TextField value={artist} onChange={handleUpdateArtist}/>
                        </Grid>
                        <Divider/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                            <Box paddingRight><Typography variant='h5'>YouTubeId:</Typography></Box>
                            <TextField value={youTubeId} onChange={handleUpdateYouTubeId}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction='row' justifyContent='space-between'>
                    <Grid item>
                        <Button pill variant='contained' onClick={handleConfirm}>Confirm</Button>
                    </Grid>
                    <Grid item>
                        <Button pill variant='contained' onClick={handleCancel}>Cancel</Button>
                    </Grid>
                </Grid>
            </Card>
        </Modal>
    )
}
