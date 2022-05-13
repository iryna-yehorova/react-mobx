import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@material-ui/core/TextField"
import Button from '@material-ui/core/Button'

function PetModal({onSubmit, title}) {
    const [open, setOpen] = useState(false)
    const [petName, setPetName] = useState('')
    const [petBreed, setPetBreed] = useState('')
    const [petType, setPetType] = useState('')
    const [fullPet, setFullPet] = useState({})

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const sendInfo = () => {
        onSubmit(fullPet)
        handleClose()
    }

    useEffect(() => {
        let info = {
            id: Date.now(),
            name: petName,
            breed: petBreed,
            type: petType
        }
        setFullPet(info)
    }, [petName, petBreed, petType])

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
                    Write some information about pet
                </DialogTitle>
                <DialogContent>
                    <TextField 
                        label="Name" 
                        variant="outlined" 
                        margin="dense" 
                        helperText="Write Pet Name"
                        fullWidth
                        onChange={(event) => setPetName(event.target.value)}
                    />
                    <TextField 
                        label="Breed" 
                        variant="outlined" 
                        margin="dense" 
                        helperText="Write Pet Breed"
                        fullWidth
                        onChange={(event) => setPetBreed(event.target.value)}
                    />
                    <TextField 
                        label="Type" 
                        variant="outlined" 
                        margin="dense" 
                        helperText="Write Pet Type"
                        fullWidth
                        onChange={(event) => setPetType(event.target.value)}
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

export default PetModal