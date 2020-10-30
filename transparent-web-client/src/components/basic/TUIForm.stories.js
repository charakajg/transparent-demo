import React from 'react';
import TUIInput from './TUIInput';
import TUIForm from './TUIForm';

export const Primary = () => (
    <TUIForm action={(rec) => {
        console.log(JSON.stringify(rec));
        console.log('Submitted');
}} submitLabel="Submit Label" clear={(model) => { console.log('clearing model') }}
    view={(model, update) =>
        <>
            <TUIInput label="Text input A" required={true} onValueChange={(value) => { model.a = value; update(model); }} />
            <TUIInput label="Text input B" required={true} onValueChange={(value) => { model.b = value; update(model); }} />
        </>
    } />)