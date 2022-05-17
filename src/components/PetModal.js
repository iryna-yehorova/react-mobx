import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@material-ui/core/TextField"
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

function PetModal({onSubmit, title, pet, ownerList}) {
    const [open, setOpen] = useState(false)
    const [newPet, setNewPet] = useState({name: '', breed: '', type: '', owner: '', id: ''})

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false); 
    };

    const sendInfo = () => {
        setNewPet(prevState => ({
            ...prevState,
            id: pet.id || Date.now()
        }))
        onSubmit(newPet)
        handleClose()
    }

    useEffect(() => {
       setNewPet(prevState => ({
           ...prevState,
           name: pet.name,
           breed: pet.breed,
           type: pet.type,
           owner: pet.owner
       }))        
    }, [pet])

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
                    Write some information about pet
                </DialogTitle>
                <DialogContent>
                    <TextField 
                        label="Name" 
                        variant="outlined" 
                        margin="dense" 
                        helperText="Write Pet Name"
                        fullWidth
                        value={newPet.name|| ''}
                        onChange={(event) => setNewPet(prevState => ({
                            ...prevState,
                            name: event.target.value
                        }))}
                    />
                    <TextField 
                        label="Breed" 
                        variant="outlined" 
                        margin="dense" 
                        helperText="Write Pet Breed"
                        fullWidth
                        value={newPet.breed || ''}
                        onChange={(event) => setNewPet(prevState => ({
                            ...prevState,
                            breed: event.target.value
                        }))}
                    />
                    <TextField 
                        label="Type" 
                        variant="outlined" 
                        margin="dense" 
                        helperText="Write Pet Type"
                        fullWidth
                        value={newPet.type || ''}
                        onChange={(event) => setNewPet(prevState =>  ({
                            ...prevState,
                            type: event.target.value
                        }))}
                    />
                    <Autocomplete
                        disablePortal
                        options={ownerList ? ownerList : []}
                        onInputChange={(event) => setNewPet(prevState => ({
                            ...prevState,
                            owner: event.target.textContext
                        }))}
                        loadingText="Loading list of owners"
                        renderInput={(params) => 
                            <TextField {...params} 
                                label="Owner" 
                                variant="outlined" 
                                margin="dense" 
                                helperText="Choose Owner Name"
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

export default PetModal