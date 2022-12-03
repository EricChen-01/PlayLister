import {Box, Grid, Typography, List, ListItem, Card} from '@mui/material';
import Button from './PillButton';
import EditToolbar from './EditToolbar';

export default function Workspace(props){
    const {changed, idNamePair} = props
    return(
        <Box>
            Songs + Edit toolbox here
            <EditToolbar changed={changed} idNamePair={idNamePair}/>
        </Box>
    )
}