import React from 'react'
import { observer } from 'mobx-react-lite'
import PetModal from './PetModal'

function PetList({ store }) {
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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>##</th>
                        <th>Pet Name</th>
                        <th>Pet Type</th>
                        <th>Pet Breed</th>
                        <th>Owner</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {store.pets.map(pet => {
                        return (
                            <tr key={pet.id}>
                                <td>{pet.id}</td>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td>{pet.breed}</td>
                                {/* <td>{pet.owner ? `${pet.owner?.firstName} ${pet.owner?.lastName}` : '---'}</td> */}
                                <td> 
                                    <button onClick={() => handleDeletePet(pet)}>Delete pet</button>
                                    <PetModal onSubmit={handleUpdatePet} title="Update pet"/>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <PetModal onSubmit={handleAddPet} title="Add new pet"/>
        </div>
    )
}

export default observer(PetList)