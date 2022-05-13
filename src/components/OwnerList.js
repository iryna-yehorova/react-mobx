import React from 'react'
import { observer } from 'mobx-react-lite'
import OwnerModal from './OwnerModal'

function OwnerList({ store }) {
    const handleAddOwner = (owner) => {
        store.createOwner(owner)
    }

    const handleUpdateOwner = owner => {
        store.updateOwner(owner.id, owner)
    }

    const handleDeleteOwner = owner => {
        store.deleteOwner(owner.id)
    }

    return (
        <div>
            { store.storeDetails }
            <table>
                <thead>
                    <tr>
                        <th>##</th>
                        <th>Owner first name</th>
                        <th>Owner last name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {store.owners.map(owner => {
                        return (
                            <tr key={owner.id}>
                                <td>{owner.id}</td>
                                <td>{owner.firstName}</td>
                                <td>{owner.lastName}</td>
                                <td>
                                    <button onClick={() => handleDeleteOwner(owner)}>Delete owner</button>
                                    <OwnerModal onSubmit={handleUpdateOwner} title="Update owner" />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <OwnerModal onSubmit={handleAddOwner} title="Add new owner"/>
        </div>
    )
}

export default observer(OwnerList)