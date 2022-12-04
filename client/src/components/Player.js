import YouTube from 'react-youtube';
import { useContext, useState, useEffect } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import {Box, Typography, IconButton, Card, Grid} from '@mui/material';
import {SkipPrevious,SkipNext, Pause, PlayArrow} from '@mui/icons-material';

export default function YouTubePlayerExample() {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [];
    if(store.currentList){
        //playlist = store.currentList.songs.map(song => song.youTubeId);
        playlist = store.currentList.songs;
    }
    /*
    let playlist = [
        "_2-Y2WbrKpw",
        "_m-gO0HSCYk",
        "_mVW8tgGY_w"
    ];
    */
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    //let [currentSongPlaying,setCurrentSongPlaying] = useState(0);
    let currentSongPlaying = store.currentSongPlaying;
    let setCurrentSongPlaying = store.setCurrentSongPlaying;
    
    let [player,setPlayer] = useState({});
    const playerOptions = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = (playlist[currentSongPlaying])?playlist[currentSongPlaying].youTubeId : null;
        player.loadVideoById(song);
        player.playVideo();
    }

    // INCREMENTS AND GOES TO NEXT SONG
    function nextSong() {
        let temp = currentSongPlaying;
        if (temp + 1 >= playlist.length) {
            setCurrentSongPlaying((temp + 1) % playlist.length);
        }else{
            setCurrentSongPlaying(temp + 1);

        }
    
    }
    // DECREMENTS AND GOES TO PREV SONG
    function prevSong() {
        let temp = currentSongPlaying;
        if (temp - 1 <= -1){
            setCurrentSongPlaying(playlist.length - 1);
        }else{
            setCurrentSongPlaying(temp - 1);
        }
        
    }
    // PAUSES A SONG
    function pauseSong(){
        player.player.pauseVideo();
    }
    // PLAY A SONG
    function playSong(){
        player.player.playVideo();
    }

    function onPlayerReady(event) {
        setPlayer({player: event.target});
        loadAndPlayCurrentSong(event.target);
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let status = event.data;
        let player = event.target;

        if (status === -1) {
            // - 1: VIDEO UNSTARTED
        } else if (status === 0) {
            // 0: THE VIDEO HAS COMPLETED PLAYING
            nextSong();
        } else if (status === 1) {
            // 1: THE VIDEO IS PLAYED
        } else if (status === 2) {
            // 2: THE VIDEO IS PAUSED
        } else if (status === 3) {
            // 3: THE VIDEO IS BUFFERING
        } else if (status === 5) {
            // 5: THE VIDEO HAS BEEN CUED
            loadAndPlayCurrentSong(player);
        }
        
    }


    let playlistDetails = 
        <Box>
            <Grid container direction="column">
                <Grid item paddingLeft={1}>
                    <Typography>Playlist: {(store.currentList)? store.currentList.name :''}</Typography> 
                </Grid>
                <Grid item paddingLeft={1}>
                    <Typography>Song #: {currentSongPlaying + 1}</Typography>
                </Grid>
                <Grid item paddingLeft={1}>
                    <Typography>Title: {(playlist[currentSongPlaying]) ? playlist[currentSongPlaying].title :''}</Typography>
                </Grid>
                <Grid item paddingLeft={1}>
                    <Typography>Artist: {(playlist[currentSongPlaying]) ? playlist[currentSongPlaying].artist :''}</Typography>
                </Grid>
            </Grid>
        </Box>

    let playControllers = 
        <Grid container justifyContent="center">
            <Grid item>
                <Card elevation={0}>
                    <IconButton onClick={prevSong}><SkipPrevious/></IconButton>
                    <IconButton onClick={pauseSong}><Pause/></IconButton>
                    <IconButton onClick={playSong}><PlayArrow/></IconButton>
                    <IconButton onClick={nextSong}><SkipNext/></IconButton>
                </Card>
            </Grid>
        </Grid>
    return (
        <Box>
            <YouTube
            videoId={(playlist[currentSongPlaying])? playlist[currentSongPlaying].youTubeId : null}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} />
            <Card height='100%'>
                {playControllers}
                {playlistDetails}
            </Card>
        </Box>
    )
}
