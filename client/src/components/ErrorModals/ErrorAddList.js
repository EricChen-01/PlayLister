import {Alert, Snackbar} from '@mui/material'
import { useContext} from 'react'
import GlobalStoreContext from '../../store'

export default function ErrorChangeList() {
    const { store } = useContext(GlobalStoreContext);

    function handleOK(){
        store.hideModals();
    }
    return (
        <Snackbar open={store.currentModal == "CHANGE_LIST_ERROR"} onClose={handleOK}>
            <Alert severity="error">Duplicate List.</Alert>
        </Snackbar>
    )
}

