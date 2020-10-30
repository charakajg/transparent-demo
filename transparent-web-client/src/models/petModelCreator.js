import * as graphqlRequests from '../shared/graphqlRequests';
import { EVENTS } from '../shared/constants';

export default function petModelCreator({ eventManager, authModel }) {
    const petModel = {
        addPet: async (newRecord) => {
            const result = await graphqlRequests.addPet(newRecord.name, newRecord.location, newRecord.fee);
            if (result.success) {
                petModel.refresh();
            } else {
                alert(result.message);
            }
            return true;
        },
        myPetsDataSource: {
            records: [],
            actor: {
                delete: async (pet) => {
                    const result = await graphqlRequests.deletePet(pet.id);
                    if (result.success) {
                        petModel.refresh();
                    } else {
                        alert(result.message);
                    }
                }
            }
        },
        adoptedPetsDataSource: {
            records: [],
            actor: {
                return_: async (pet) => {
                    const result = await graphqlRequests.returnPet(pet.id);
                    if (result.success) {
                        petModel.refresh();
                    } else {
                        alert(result.message);
                    }
                }
            }
        },
        availablePetsToAdoptDataSource: {
            records: [],
            actor: {
                adopt: async (pet) => {
                    const result = await graphqlRequests.adoptPet(pet.id);
                    if (result.success) {
                        petModel.refresh();
                    } else {
                        alert(result.message);
                    }
                }
            }
        },
        refresh: async () => {
            if (authModel.isLogged) {
                await (async () => {
                    const result = await graphqlRequests.getMyOwnPets();
                    if (result.success) {
                        petModel.myPetsDataSource.records = result.records;
                    } else {
                        alert(result.message);
                    }
                })();
                await (async () => {
                    const result = await graphqlRequests.getMyAdoptedPets();
                    if (result.success) {
                        petModel.adoptedPetsDataSource.records = result.records;
                    } else {
                        alert(result.message);
                    }
                })();
                await (async () => {
                    const result = await graphqlRequests.getAvailableToAdoptPets();
                    if (result.success) {
                        petModel.availablePetsToAdoptDataSource.records = result.records;
                    } else {
                        alert(result.message);
                    }
                })();
            }
            eventManager.emitEvent(EVENTS.PET_MODEL_UPDATE_EVENT, petModel);
        }
    };

    return petModel;
}