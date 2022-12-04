import { useContext, useState} from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';

import {Card,ListItem,Typography, Box, Grid, Divider,} from '@mui/material';



export default function CommentCard(props) {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const {comment} = props;
    const colors = {
        GOLD: 'rgb(212,212,145)',
        BLUEGRAY: 'rgb(212,212,245)',
        CREAM: '#FFFFEA'
    }



    return( 
        <Card sx={{backgroundColor: colors.GOLD,height:'120px'}}>
            <Typography>{comment.firstName + " " + comment.lastName}</Typography>
            <Divider/>
            <Typography>
                {comment.message}
            </Typography>
        </Card>
    )
}
