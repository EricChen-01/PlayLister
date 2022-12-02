import {Box, Grid, Typography, List, ListItem, Card} from '@mui/material';
import Button from './PillButton';
import EditToolbar from './EditToolbar';

export default function Workspace(props){
    const {changed} = props
    return(
        <Box>
            Songs + Edit toolbox here
            <EditToolbar changed={changed}/>
        </Box>
    )
}