import YouTube from 'react-youtube';
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import {Box, Typography, Button} from '@mui/material';

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
        playlist = store.currentList.songs.map(song => song.youTubeId);
    }
    /*
    let playlist = [
        "_2-Y2WbrKpw",
        "_m-gO0HSCYk",
        "_mVW8tgGY_w"
    ];
    */
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let [currentSong,setCurrentSong] = useState(0);
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
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // INCREMENTS AND GOES TO NEXT SONG
    function nextSong() {
        setCurrentSong(prevCurrentSong => prevCurrentSong + 1);
        setCurrentSong(prevCurrentSong => prevCurrentSong % playlist.length);
    }
    // DECREMENTS AND GOES TO PREV SONG
    function prevSong() {
        if (currentSong - 1 <= -1){
            setCurrentSong(playlist.length - 1);
        }else{
            setCurrentSong(prevCurrentSong => prevCurrentSong - 1);
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

        console.log('state changed');

        if (status === -1) {
            // - 1: VIDEO UNSTARTED
            console.log('- 1: VIDEO UNSTARTED');
        } else if (status === 0) {
            // 0: THE VIDEO HAS COMPLETED PLAYING
            nextSong();
        } else if (status === 1) {
            // 1: THE VIDEO IS PLAYED
            console.log('1: THE VIDEO IS PLAYED');
        } else if (status === 2) {
            // 2: THE VIDEO IS PAUSED
            console.log('2: THE VIDEO IS PAUSED');
        } else if (status === 3) {
            // 3: THE VIDEO IS BUFFERING
            console.log('3: THE VIDEO IS BUFFERING');
        } else if (status === 5) {
            // 5: THE VIDEO HAS BEEN CUED
            console.log('5: THE VIDEO HAS BEEN CUED');
            loadAndPlayCurrentSong(player);
        }
        
    }


    return (
        <Box>
            <YouTube
            videoId={playlist[currentSong]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} />
            <Typography>Current Song index: {currentSong}</Typography>
            <Button onClick={nextSong}>Next</Button>
            <Button onClick={prevSong}>Back</Button>
            <Button onClick={pauseSong}>Pause</Button>
            <Button onClick={playSong}>Play</Button>
        </Box>
    )
}