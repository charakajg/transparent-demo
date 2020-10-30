import React from 'react';
import {
    TUITable,
    TUIButton
} from '../components';

const commonPetFields = [{
    label: 'Name',
    content: (record) => record.name,
},
{
    label: 'Location',
    content: (record) => record.location,
},
{
    label: 'Fee',
    content: (record) => record.fee,
}];

export const MyPetsTable = (props) => {
    return (
        <TUITable data={props.data} fields={
            [...commonPetFields,
            {
                label: 'Adopter',
                content: (record) => (record.current_adopter == null ? 'Not adopted' : record.current_adopter.login)
            },
            {
                label: 'Action',
                content: (record, actor) => <TUIButton action={() => actor.delete(record)} label="Delete"
                                                disabled={(record.current_adopter != null ?  true : null)}
                                                tooltip={(record.current_adopter != null ? 'This pet has a adopter.' :  undefined)}  />
            }]
        } />)
}

const petOwnerField = {
    label: 'Owner',
    content: (record) => (record.current_owner == null ? 'None' : record.current_owner.login)
};

export const AdoptedPetsTable = (props) => {
    return (
        <TUITable data={props.data} fields={
            [...commonPetFields, petOwnerField,
            {
                label: 'Action',
                content: (record, actor) => (<TUIButton action={() => actor.return_(record)} label="Return" />)
            }]
        } />
    )
}

export const AvailablePetsToAdoptTable = (props) => {
    return (
        <TUITable data={props.data} fields={
            [...commonPetFields, petOwnerField,
            {
                label: 'Action',
                content: (record, actor) => (<TUIButton action={() => actor.adopt(record)} label="Adopt" />)
            }]
        } />
    )
}