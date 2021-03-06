import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import StateContext from '../helpers/StateContext'
import PetModal from './PetModal'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';


function PetList() {
    const store = useContext(StateContext)
     
    const handleAddPet = pet => {
        store.createPet(pet);
    };

    const handleUpdatePet = (pet) => {
        store.updatePet(pet.id, pet)
    }

    const handleDeletePet = (pet) => {
        store.deletePet(pet.id)
    }

    const columns = [
        { id: 'id', label: 'Id', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'breed', label: 'Breed', minWidth: 150 },
        { id: 'type', label: 'Type', minWidth: 150 },
        { id: 'owner', label: 'Owner\'s Name', minWidth: 150 },
        { id: 'action'}
    ];

    return (
        <div>
             <Stack  
                direction="row"
                spacing={2}
                style={{ margin: '15px' }}
                alignItems="center"
            >
                <h2>Pet List</h2>
                <PetModal onSubmit={handleAddPet} title="Add new pet" ownerList={store.owners} key="add" pet={{name: '', type: '', breed: '', owner: ''}}/>
            </Stack>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {store.pets.map((row) => {
                            return (
                                <TableRow hover key={row.id}>
                                    {columns.map((column) => {
                                        if(column.id === 'action') {
                                            return (
                                                <TableCell key={column.id}>
                                                    <Stack
                                                        direction="row"
                                                        divider={<Divider orientation="vertical" flexItem />}
                                                        spacing={2}
                                                    >
                                                        <Button variant="outlined" onClick={() => handleDeletePet(row)}>Delete</Button>
                                                        <PetModal onSubmit={handleUpdatePet} title='Update' pet={row} key={column.id} ownerList={store.owners}/>
                                                    </Stack>
                                                </TableCell>
                                            )
                                        } else {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id}>
                                                    {value}                        
                                                </TableCell>
                                            )
                                        }
                                    })}             
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>    
        </div>
    )
}

export default observer(PetList)