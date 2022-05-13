import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@material-ui/core/TextField"
import Button from '@material-ui/core/Button'

function OwnerModal({onSubmit, title}) {
    const [open, setOpen] = useState(false)
    const [ownerFirstName, setOwnerFirstName] = useState('')
    const [ownerLastName, setOwnerLastName] = useState('')
    const [fullInfo, setFullInfo] = useState('')

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const sendInfo = () => {
        onSubmit(fullInfo)
        handleClose()
    }

    useEffect(() => {
        let info = {
            id: Date.now(),
            firstName: ownerFirstName,
            lastName: ownerLastName,
        }
        setFullInfo(info)
    }, [ownerFirstName, ownerLastName])

    return (
        <div>
            <button type="button" onClick={handleOpen}>
               {title}
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Write some information
                </DialogTitle>
                <DialogContent>
                    <TextField 
                        label="First Name" 
                        variant="outlined" 
                        margin="dense" 
                        helperText="Write Owner First Name"
                        fullWidth
                        onChange={(event) => setOwnerFirstName(event.target.value)}
                    />
                    <TextField 
                        label="Last Name" 
                        variant="outlined" 
                        margin="dense" 
                        helperText="Write Owner Last Name"
                        fullWidth
                        onChange={(event) => setOwnerLastName(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => {handleClose()}}>Close</Button>
                    <Button variant="contained" color="primary" onClick={() => { sendInfo() }}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default OwnerModal