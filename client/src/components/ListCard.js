import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import { AuthContext} from '../auth';

import {Card,ListItem,Typography, Box} from '@mui/material';

export default function ListCard(props) {
    const { idNamePair, selected } = props;

    return( 
        <ListItem disableGutters>
            <Card elevation={0} sx={{width:'100%',minHeight:234}}>
                <Typography>{idNamePair.name}</Typography>
            </Card>
        </ListItem>
    )
}