import { useContext } from 'react'
import AuthContext from '../auth'
import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    //p: 4,
};



export default function MUIRegisterError() {
    const { auth } = useContext(AuthContext);
    function handleOK(event){
        auth.hideModals();
    }
    return (
        <Modal
        open={auth.currentModal == "REGISTER_ERROR"}
        >   
            <Box sx={style}>
                <Alert severity="warning">
                    There is an error with your registration.
                </Alert>
                <Button sx={{marginLeft: '45%'}} variant='outlined' onClick={handleOK}>OK</Button>
            </Box>
        </Modal>
    );
}