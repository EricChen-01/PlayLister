import {Alert, Snackbar} from '@mui/material'
import { useContext} from 'react'
import AuthContext from '../../auth'

export default function ErrorLogin() {
    const { auth } = useContext(AuthContext);

    function handleOK(){
        auth.hideModals();
    }
    return (
        <Snackbar open={auth.currentModal == "REGISTER_ERROR"} onClose={handleOK} anchorOrigin={{vertical:'top',horizontal:'center'}} sx={{position:'relative'}} style={{top:'unset'}}>
            <Alert severity="error">{auth.errorMessage}</Alert>
        </Snackbar>
    )
}

