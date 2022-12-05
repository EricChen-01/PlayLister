import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import { useContext, useState} from 'react';

import {Box, Grid, Typography, List, ListItem, Card, Container} from '@mui/material';
import Button from './PillButton';
import EditToolbar from './EditToolbar';
import SongCard from './SongCard';

export default function Workspace(props){
    const {changed, idNamePair} = props
    const { auth } = useContext(AuthContext);
    const {store} = useContext(GlobalStoreContext);

    let songs = ''
    if (store.currentList){
        songs = 
            <List sx={{overflow:'auto', width: '90%', left: '5%', height: '100%'}}>
            {
                store.currentList.songs.map((song,index) => (
                    <SongCard
                        index={index}
                        song={song}
                    />
                ))
            }
            </List>;
    }
    return(
        <Grid container>
            <Container sx={{maxHeight:'500px'}}>
                <Box width='100%' height='100%'>
                    <Card sx={{height:'100%'}}>
                        {songs}
                    </Card>
                </Box>
            </Container>
            <EditToolbar changed={changed} idNamePair={idNamePair}/>
        </Grid>
    )
}