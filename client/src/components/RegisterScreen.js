import {react, useContext} from 'react';
import useHistory from 'react-dom'
import AuthContext from '../auth'
import { Grid, Typography, Box, Textfield} from '@mui/material'
import Button from './PillButton'
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';

export default function RegisterScreen(){
    const auth = useContext(AuthContext);
    return(
        <Box>
            <Avatar>
                <LockIcon/>
            </Avatar>
            Register
        </Box>
    )
}