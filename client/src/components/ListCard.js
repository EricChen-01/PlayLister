import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth'

import {Card,ListItem,Typography, Box, Grid} from '@mui/material';
import {ThumbUpOffAlt,ThumbDownOffAlt, ThumbDown,ThumbUp} from '@mui/icons-material';

export default function ListCard(props) {
    const { idNamePair, displayCallback} = props;
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    

    let published = idNamePair.public;
    let ownerName = idNamePair.ownerName;
    let listName = idNamePair.name;
    let likes = idNamePair.likes;
    let dislikes = idNamePair.dislikes;

    let publishedCard = 
        <ListItem disableGutters 
            onClick={null}>
            <Card elevation={0} sx={{width:'100%',minHeight:234, '&:hover':{border:'2px solid black'}}}>
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
        </ListItem> 

    let unpublishedCard =     
            <ListItem disableGutters 
            onClick={null}>
            <Card elevation={0} sx={{width:'100%',minHeight:234, '&:hover':{border:'2px solid black'}}}>
                <Grid container>
                    <Grid item border={2}>
                        <Typography>{listName}</Typography>
                        <Typography>By: {ownerName}</Typography>
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