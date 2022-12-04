import YouTube from 'react-youtube';
import { useContext, useState, useEffect } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import {Box, Typography, IconButton, Card, Grid, List, TextField} from '@mui/material';
import {Send} from '@mui/icons-material';
import CommentCard from './CommentCard'

export default function CommentScreen() {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [text,setText] = useState('');
    const handleAddNewComment = () => {
        
    }

    let comments = ''
    if(store.currentList){
        comments = 
        <List sx={{overflow:'auto', width: '90%', left: '5%', height: '100%'}}>
            {
                store.currentList.comments.map((comment) => (
                    <CommentCard comment={comment}/>
                ))
            }
        </List>;
    }
    return (
        <Box>
            <Card height='100px' sx={{backgroundColor:'white'}}>
                {comments}
                <Grid container justifyContent='space-between' alignItems='center' >
                    <Grid item xs={10}>
                        <TextField onChange={(newValue) => setText(newValue.target.value)}disabled={auth.guest} id='comment' label='Comment' variant="outlined" sx={{width:'100%',padding:'2px'}} multiline/>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={handleAddNewComment} disabled={auth.guest}>
                            <Send/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}
