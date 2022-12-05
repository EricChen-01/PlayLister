import {Card,Box,Modal, Typography, Grid, Divider} from '@mui/material'
import Button from '../PillButton'
import { useContext} from 'react'
import GlobalStoreContext from '../../store'

export default function DuplicateList() {
    const { store } = useContext(GlobalStoreContext);
    let title = '[insert name here]';
    if(store.listMarkedForDuplication && store.listIdMarkedForDuplication){
        title = store.listMarkedForDuplication.name;
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function handleConfirm(){
        store.duplicateList();
    }
    function handleCancel(){
        store.hideModals(); // indirectly unmarks it
    }

    
    return (
        <Modal open={store.currentModal == "DUPLICATE_LIST"} onClose={handleCancel}>
            <Card sx={style}>
                <Typography>Are you sure you want to duplicate this list?</Typography>
                <Grid container justifyContent='center'>
                    <Grid item>
                        <Typography fontWeight='bold' >{title}</Typography>
                    </Grid>
                </Grid>
                <Box paddingTop={2} paddingBottom={2}><Divider padding={2}/></Box>
                <Grid container direction='row' justifyContent='space-between'>
                    <Grid item>
                        <Button pill variant='contained' onClick={handleConfirm}>Confirm</Button>
                    </Grid>
                    <Grid item>
                        <Button pill variant='contained' onClick={handleCancel}>Cancel</Button>
                    </Grid>
                </Grid>
            </Card>
        </Modal>
    )
}
