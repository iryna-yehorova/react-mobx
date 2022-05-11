import React from 'react'
import { observer } from 'mobx-react-lite'

function OwnerList({ store }) {
    const handleAddOwner = () => {
        const firstName = prompt('Owner first name')
        const lastName = prompt('Owner last name')

        store.createOwner({ id: Date.now(), firstName, lastName})
    }

    const handleUpdateOwner = owner => {
        owner.firstName = prompt('Owner firstname', owner.firstName)
        owner.lastName = prompt('Owner lastname', owner.lastName)
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
                                    <button onClick={() => handleUpdateOwner(owner)}>Update owner</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button onClick={handleAddOwner}>Ann new owner</button>
        </div>
    )
}

export default observer(OwnerList)