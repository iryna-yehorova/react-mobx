import { action, computed, makeObservable, observable, runInAction } from 'mobx'

class PetOwnerStore {
    pets = [];
    owners = [];

    constructor() {
        makeObservable(this, {
            pets: observable,
            owners: observable,
            totalOwners: computed,
            totalPets: computed,
            getPetsByOwner: action,
            createPet: action,
            createOwner: action,
            updatePet: action,
            updateOwner: action,
            deletePet: action,
            deleteOwner: action
        }) 
        runInAction(() => this.prefetchData())
    }

    //pets
    createPet(pet = { id: 0, name: '', type: '', breed: '', owner: null }) {   
        pet.label = pet.name
        pet.id = pet.id ? pet.id : Date.now()

        if (pet.owner && this.owners && this.owners.length > 0) {
            let owner = this.owners.find(o => o.label === pet.owner)
            owner.pet = pet.name 
        }

        this.pets.push(pet)
    }

    updatePet(petId, update) {
        const petIndexAtId = this.pets.findIndex( pet => pet.id === petId)
        if (petIndexAtId > -1 && update) {
            this.pets[petIndexAtId] = update
        }
    }

    deletePet(petId) {
        const petIndexAtId = this.pets.findIndex( pet => pet.id === petId)
        if (petIndexAtId > -1) {
            this.pets.splice(petIndexAtId, 1)
        }
    }

    get totalPets() {
        return this.pets.length
    }

    getPetsByOwner(ownerId) {
        return this.pets.filter(pet => pet.owner && pet.owner.id === ownerId)
    }

    //owners
    createOwner(owner = { id: 0, firstName: '', lastName: '', pet: '', label: ''}) {
        const newItem = {
            ...owner.petOwner,
            id: owner.id ? owner.id : Date.now(),
            label: `${owner.petOwner.firstName} ${owner.petOwner.lastName}`
        }
        this.owners.push(newItem)
    }

    updateOwner(ownerId, update) {
        const ownerIndexAtId = this.owners.findIndex( pet => pet.id === ownerId)
        if (ownerIndexAtId > -1 && update) {
            this.owners[ownerIndexAtId] = update
        }
    }
    
    deleteOwner(ownerId) {
        const ownerIndexAtId = this.owners.findIndex( owner => owner.id === ownerId)
        if (ownerIndexAtId > -1) {
            this.owners.splice(ownerIndexAtId, 1)
        }
    }

    get totalOwners() {
        return this.owners.length
    }


    prefetchData = () => {
        const owners = [
            {   petOwner: {
                    firstName: 'Elijah',
                    lastName: 'Smith',
                },              
                id: Date.now() + 3,
            },
            {   petOwner: {
                    firstName: 'Joe',
                    lastName: 'Cohens',
                    pet: 'Lucy'
                },                
                id: Date.now() + 1,              
            }
        ]
        const pets = [
            {
                id: Date.now() + 2,
                name: 'Lucy',
                breed: 'Pomeranian',
                type: 'Dog',
                owner: 'Joe Cohens'
            }
        ]

        setTimeout(() => {
            owners.forEach(owner => this.createOwner(owner))
            pets.forEach(pet => {
                this.createPet(pet)
            })
        }, 3000)
    }
}

export default PetOwnerStore