import {useContext,useState,useEffect,useRef} from 'react'
import GlobalStoreContext from '../store'
import AuthContext from '../auth'
import { ThemeProvider, createTheme} from '@mui/material/styles'

import ErrorAddList from './ErrorModals/ErrorAddList'
import AppNav from './AppNav';
import ListCard from './ListCard';
import PlayerCommentScreen from './PlayerCommentScreen';

import {Box, Grid, Typography, List, ListItem, Card} from '@mui/material';
import Button from './PillButton';
import {Add} from '@mui/icons-material';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#000000',
      contrastText: '#fff',
    },
  },
});

export default function HomeScreen() {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const changed = useRef(false);
    //const [expanded, setExpanded] = useState(false);

    useEffect(()=>{
        console.log('asdsad')
        if(auth.loggedIn){
            store.changeSelectionToHome();
            toggleChanged();
        }
    },[])

    useEffect(() =>{
        store.loadIdNamePairs();
    },[changed.current])

    const handleAddList = () => {
        store.createNewList();
        toggleChanged();
    }

    const handleExpand = (id) => {
        store.expandList(id);
    }

    const toggleChanged = () => {
        changed.current = !(changed.current);
    }

    let lists = "";
    let display='';
    if(store){
        lists = 
            <List sx={{overflow:'auto', width: '90%', left: '5%', height: '100%'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        changed={toggleChanged}
                        expanded={store.expanded}
                        changeexpanded={handleExpand}
                    />
                ))
            }
            </List>;
    }
    let temp = '';
    if(store.currentList){
        temp = store.currentList.name;
    } 
    if(store.currentSelection == "HOME" ){
        display = 
        <Grid item>
            {temp}
            <Button pill variant='text' color='neutral' disableElevation onClick={handleAddList}>
                <Grid container fontSize='58px' spacing={0} direction="row" alignItems="center" justifyContent="center">
                    <Grid item>
                        <Box display="flex" justifyContent="center">
                            <Add fontSize='inherit'/>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography fontSize='inherit'>Add List</Typography>
                    </Grid>
                </Grid>
            </Button>
        </Grid>
    }else{
        // logic to display playlist name if clicked
        if(store.currentList){
            display = store.currentList.name;
        }
    }

    return(
        <ThemeProvider theme={theme}>
            <Box backgroundColor='#808080' height='100%'>
                <Box height='auto'>
                    <AppNav changed={toggleChanged}/>
                </Box>
                <Box height='80%'>
                    <Grid container sx={{height:'100%',border:'1px solid blue'}}>
                        <Grid item xs={7} sx={{overflow:'auto',height:'100%',border:'1px solid blue'}}>
                            <Box border='1px solid red'>
                                <List>
                                    {lists}
                                </List>
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <PlayerCommentScreen/>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
                        {display}
                </Grid>
                <ErrorAddList/>
            </Box>
        </ThemeProvider>
    )
} 


