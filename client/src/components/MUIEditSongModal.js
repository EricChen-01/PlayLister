import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    //p: 4,
};

const XStyle = {
    display: 'flex',
    flexDirection: 'column',
}

const inputStyle = {
    display: 'flex'
}

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {
        let newSongData = {
            title: (title == '') ? "Untitled" : title,
            artist: (artist == '') ? "?": artist,
            youTubeId: (youTubeId == '') ? "dQw4w9WgXcQ" : youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
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
        <Modal
            open={store.currentModal == "EDIT_SONG"}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                    <header>
                        Edit Song
                    </header>
                    <Box sx={XStyle}>
                        <div id="title-prompt" className="modal-prompt">Title:</div>
                        <TextField 
                            margin="normal" 
                            fullWidth 
                            name="Title"
                            defaultValue={title}  
                            onChange={handleUpdateTitle}
                        />
                        <div id="artist-prompt" className="modal-prompt">Artist:</div>
                        <TextField 
                            margin="normal" 
                            fullWidth 
                            name="Artist"
                            defaultValue={artist}  
                            onChange={handleUpdateArtist}/>
                        <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
                        <TextField 
                            margin="normal" 
                            fullWidth 
                            name="YouTube ID" 
                            defaultValue={youTubeId}  
                            onChange={handleUpdateYouTubeId}/>
                    </Box>
                    <div className="modal-south">
                        <Button
                            id="edit-song-confirm-button"
                            className="modal-button"
                            onClick={handleConfirmEditSong}
                            variant='outlined'
                        >
                            Confirm
                        </Button>
                        <Button
                            id="edit-song-cancel-button"
                            className="modal-button"  
                            onClick={handleCancelEditSong}
                            variant='outlined'
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

/*
<input 
    type="button" 
    id="edit-song-confirm-button" 
    className="modal-button" 
    value='Confirm' 
    onClick={handleConfirmEditSong} />
<input 
    type="button" 
    id="edit-song-cancel-button" 
    className="modal-button" 
    value='Cancel' 
    onClick={handleCancelEditSong} />
*/

/*
        <Modal
            open={store.currentModal == "EDIT_SONG"}
        >
            <Box sx={style}>
                <div
                    id="edit-song-modal"
                    className="modal is-visible"
                    data-animation="slideInOutLeft"
                >
                    <div
                        id='edit-song-root'
                        className="modal-root"
                    >
                        <div
                            id="edit-song-modal-header"
                            className="modal-north"
                        >
                            Edit Song
                        </div>
                        <div
                            id="edit-song-modal-content"
                            className="modal-center">
                            <div id="title-prompt" className="modal-prompt">Title:</div>
                            <input 
                                id="edit-song-modal-title-textfield" 
                                className='modal-textfield' 
                                type="text" 
                                defaultValue={title} 
                                onChange={handleUpdateTitle} />
                            <div id="artist-prompt" className="modal-prompt">Artist:</div>
                            <input 
                                id="edit-song-modal-artist-textfield" 
                                className='modal-textfield' 
                                type="text" 
                                defaultValue={artist} 
                                onChange={handleUpdateArtist} />
                            <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
                            <input 
                                id="edit-song-modal-youTubeId-textfield" 
                                className='modal-textfield' 
                                type="text" 
                                defaultValue={youTubeId} 
                                onChange={handleUpdateYouTubeId} />
                        </div>
                        <div className="modal-south">
                            <Button
                                id="edit-song-confirm-button"
                                className="modal-button"
                                onClick={handleConfirmEditSong}
                                variant='outlined'
                            >
                                Confirm
                            </Button>
                            <Button
                                id="edit-song-cancel-button"
                                className="modal-button"  
                                onClick={handleCancelEditSong}
                                variant='outlined'
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    */