import React, { useState, useEffect, useContext } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@material-ui/core/TextField"
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete'
import StateContext from '../helpers/StateContext'

function OwnerModal({onSubmit, title, owner = {}}) {
    const store = useContext(StateContext)

    const [open, setOpen] = useState(false)
    const [ownerFirstName, setOwnerFirstName] = useState('')
    const [ownerLastName, setOwnerLastName] = useState('')
    const [ownerPet, setOwnerPet] = useState('')
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
            id: owner.id || Date.now(),
            firstName: ownerFirstName,
            lastName: ownerLastName,
            pets: ownerPet
        }
        setFullInfo(info)
    }, [ownerFirstName, ownerLastName])

    useEffect(() => {
        if(owner.firstName) {
        setOwnerFirstName(owner.firstName)
        setOwnerLastName(owner.lastName)  
    }           
}, [owner])

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>
               {title}
            </Button>
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
                        value={ownerFirstName}
                        onChange={(event) => setOwnerFirstName(event.target.value)}
                    />
                    <TextField 
                        label="Last Name" 
                        variant="outlined" 
                        margin="dense" 
                        helperText="Write Owner Last Name"
                        fullWidth
                        value={ownerLastName}
                        onChange={(event) => setOwnerLastName(event.target.value)}
                    />
                     <Autocomplete
                        disablePortal
                        options={store.pets}
                        onInputChange={(event) => setOwnerPet(event.target.textContent)}
                        loadingText="Loading list of pets"
                        renderInput={(params) => 
                            <TextField {...params} 
                                label="Pet" 
                                variant="outlined" 
                                margin="dense" 
                                helperText="Choose Pet"
                                fullWidth
                            />
                        }
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