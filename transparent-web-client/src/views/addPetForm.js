import React from 'react';
import {
    TUIForm,
    TUIInput
} from '../components';

import { hasValue } from '../components/utils'

const AddPetForm = ({changeTab, petModel})=>(<TUIForm action={(rec) => {
    if (hasValue(rec.name) && hasValue(rec.location) && rec.fee > 0)
        return petModel.addPet(rec);
}} submitLabel="Add Pet" clear={(model) => { changeTab(0); }}
    view={(model, update) =>
        <>
            <TUIInput label="Name" required={true} onValueChange={(value) => { model.name = value; update(model); }} />
            <TUIInput label="Location" required={true} onValueChange={(value) => { model.location = value; update(model); }} />
            <TUIInput label="Fee" numeric={true} required={true} onValueChange={(value) => { model.fee = value; update(model); }} />
        </>
    } />);

export default AddPetForm