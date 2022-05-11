import { action, computed, makeObservable, observable, autorun, runInAction } from 'mobx'

class PetOwnerStore {
    pets = [];
    owners = [];

    constructor() {
        makeObservable(this, {
            pets: observable,
            owners: observable,
            totalOwners: computed,
            totalPets: computed,
            storeDetails: computed,
            getPetsByOwner: action,
            createPet: action,
            createOwner: action,
            updatePet: action,
            updateOwner: action,
            deletePet: action,
            deleteOwner: action,
            assignOwnerToPet: action
        }) 
        autorun(() => this.logStoreDetails())
        runInAction(() => this.prefetchData())
    }

    //pets
    createPet(pet = { id: 0, name: '', type: '', breed: '', owner: null }) {
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
    createOwner(owner = { id: 0, firstName: '', lastName: ''}) {
        if(!owner.firstName || !owner.lastName) {
            return 
        }
        this.owners.push(owner)
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

    assignOwnerToPet(ownerId, petId) {
        const petIndexAtId = this.pets.findIndex(pet => pet.id === petId)
        const ownerIndexAtId = this.owners.findIndex(owner => owner.id === ownerId)
        if (petIndexAtId > -1 && ownerIndexAtId > -1) {
            this.pets[petIndexAtId].owner = this.owners[petIndexAtId]
        }
    }

    //store
    get storeDetails() {
        return `We have ${this.totalPets} total pets and ${this.totalOwners} total Owners`
    }

    logStoreDetails() {
        console.log(this.storeDetails)
    }

    prefetchData = () => {
        const owners = [
            {
                firstName: 'Elijah',
                lastName: 'Smith',
                id: 1
            },
            {
                firstName: 'Joe',
                lastName: 'Cohens',
                id: 2
            }
        ]
        const pets = [
            {
                id: 1,
                name: 'Lucy',
                breed: 'Pomeranian',
                type: 'Dog',
                ownerId: 1
            }
        ]

        setTimeout(() => {
            owners.forEach(owner => this.createOwner(owner))
            pets.forEach(pet => {
                this.createPet(pet);
                if(pet.ownerId) {
                     this.assignOwnerToPet(pet.ownerId, pet.id)
                }
               
            })
        }, 3000)
    }
}

export default PetOwnerStore