import GlobalStoreContext from '../store';
import AuthContext from '../auth'
import { useState,useContext, useEffect} from 'react'

import CommentScreen from './CommentScreen'
import Player from './Player'

import {Box,Typography,Tab,Tabs,Grid,Card,Paper} from '@mui/material'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div hidden={value !== index} {...other}>
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
}

export default function PlayerCommentScreen(){
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [value,setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return(
        <Box height='100%'>
            <Paper>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Player"/>
                    <Tab label="Comment" disabled={!store.currentList}/>
                </Tabs>
            </Paper>
            <Box height='80%'>
              <Box>
                <TabPanel value={value} index={0}>
                  <Player/>
                </TabPanel>
              </Box>
              <Box height='100%'>
                <TabPanel value={value} index={1}>
                  <CommentScreen/>
                </TabPanel>
              </Box>
            </Box>
        </Box>
    )
}