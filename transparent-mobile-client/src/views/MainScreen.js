import React from 'react';
import {
    TUIAuthenticatedView,
    TUIView,
    TUITabView,
    TUISection,
    TUIInfo
} from '../components';

import {
    MyPetsTable,
    AvailablePetsToAdoptTable,
    AdoptedPetsTable
} from './tables'
import AddPetForm from './addPetForm'

export default function MainScreen({ authModel, petModel }) {
    return (
        <TUIAuthenticatedView authModel={authModel} title="Transparent"
            view={(user) => (
                <TUITabView tabs={
                    [
                        {
                            title: "My info",
                            content: () => <TUIView>
                                <TUISection>
                                    <TUIInfo label="Login" value={user.login} />

                                </TUISection>
                                <TUISection title="The pets you own">
                                    <MyPetsTable data={petModel.myPetsDataSource} />
                                </TUISection>
                                <TUISection title="The pets you have currently adopted">
                                    <AdoptedPetsTable data={petModel.adoptedPetsDataSource} />
                                </TUISection>
                            </TUIView>
                        },
                        {
                            title: "Add Pet",
                            content: (changeTab)=> <AddPetForm changeTab={changeTab} petModel={petModel} />
                        },
                        {
                            title: "Available to adopt",
                            content: () => <AvailablePetsToAdoptTable data={petModel.availablePetsToAdoptDataSource} />
                        }]
                } />
            )
            }/>
    );
}