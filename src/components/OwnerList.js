import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import StateContext from '../helpers/StateContext'
import OwnerModal from './OwnerModal'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function OwnerList() {
    const store = useContext(StateContext)

    const handleAddOwner = (owner) => {
        store.createOwner(owner)
    }

    const handleUpdateOwner = owner => {
        store.updateOwner(owner.id, owner)
    }

    const handleDeleteOwner = owner => {
        store.deleteOwner(owner.id)
    }

    const columns = [
        { id: 'id', label: 'Id', minWidth: 100 },
        { id: 'firstName', label: 'First Name', minWidth: 150 },
        { id: 'lastName', label: 'Last Name', minWidth: 150 },
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
                                                    <button onClick={() => handleDeleteOwner(row)}>Delete owner</button>
                                                    <OwnerModal onSubmit={handleUpdateOwner} title='Update owner' />
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
            <OwnerModal onSubmit={handleAddOwner} title="Add new owner"/>
        </div>
    )
}

export default observer(OwnerList)