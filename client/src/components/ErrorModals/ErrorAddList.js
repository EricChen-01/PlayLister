import {Alert, Snackbar} from '@mui/material'
import { useContext} from 'react'
import GlobalStoreContext from '../../store'

export default function ErrorAddList() {
    const { store } = useContext(GlobalStoreContext);

    function handleOK(){
        store.hideModals();
    }
    return (
        <Snackbar open={store.currentModal == "ADD_LIST_ERROR"} onClose={handleOK} anchorOrigin={{vertical:'top',horizontal:'center'}} sx={{position:'relative'}} style={{top:'unset'}}>
            <Alert severity="error">Duplicate List will occur if you try to add a new list.</Alert>
        </Snackbar>
    )
}

