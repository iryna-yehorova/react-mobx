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

function PetList() {
    const store = useContext(StateContext)
     
    const handleAddPet = pet => {
        store.createPet(pet);
        // store.assignOwnerToPet(ownerId, pet.id)
    };

    const handleUpdatePet = (pet) => {
        // const ownerId = prompt('Owners Id of the pet', pet.owner?.id);
        store.updatePet(pet.id, pet)
        // if(ownerId !== pet.owner?.id) {
        //     store.assignOwnerToPet(ownerId, pet.id)
        // }
    }

    const handleDeletePet = (pet) => {
        store.deletePet(pet.id)
    }

    const columns = [
        { id: 'id', label: 'Id', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'breed', label: 'Breed', minWidth: 150 },
        { id: 'type', label: 'Type', minWidth: 150 },
        { id: 'action'}
    ];

    return (
        <div>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {store.owners.map((row) => {
                            return (
                                <TableRow hover key={row.id}>
                                    {columns.map((column) => {
                                        if(column.id === 'action') {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                        <button onClick={() => handleDeletePet(row)}>Delete pet</button>
                                                        <PetModal onSubmit={handleUpdatePet} title="Update pet"/>
                                                </TableCell>
                                            )
                                        } else {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
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
            <PetModal onSubmit={handleAddPet} title="Add new pet"/>
        </div>
    )
}

export default observer(PetList)