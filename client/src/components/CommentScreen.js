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
        let newComment = {
            email: auth.user.email,
            firstName: auth.user.firstName,
            lastName: auth.user.lastName,
            message: text
        }
        setText('');
        store.sendComment(newComment);
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
        <Box height='100%'>
            <Card height='100%' sx={{backgroundColor:'white'}}>
                <Box height='600px'>
                    {comments}
                </Box>
                <Grid container justifyContent='space-between' alignItems='center' >
                    <Grid item xs={10}>
                        <Typography paddingLeft={1} sx={{color:'gray'}}>comment</Typography>
                        <TextField value={text} onChange={(newValue) => setText(newValue.target.value)} disabled={auth.guest || !store.currentList || ((store.currentList)?!store.currentList.isPublished:true) } id='comment' variant="outlined" sx={{width:'100%',padding:'2px'}} multiline/>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={handleAddNewComment} disabled={auth.guest || !store.currentList || ((store.currentList)?!store.currentList.isPublished:true)}>
                            <Send/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}
