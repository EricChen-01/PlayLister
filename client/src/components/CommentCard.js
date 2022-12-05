import { useContext, useState} from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';

import {Card,ListItem,Typography, Box, Grid, Divider,Container} from '@mui/material';
import {spacing} from '@mui/system';



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
        <ListItem
        disableGutters>
            <Card sx={{backgroundColor: colors.GOLD,height:'120px',width:'90%'}}>
                <Box pl={1}>
                    <Typography>{comment.firstName + " " + comment.lastName}</Typography>
                </Box>
                <Divider/>
                <Box pl={1}>
                    <Typography>
                        {comment.message}
                    </Typography>
                </Box>
            </Card>
        </ListItem>
    )
}
