import React from 'react';
import TUITable from './TUITable';
import TUIButton from './TUIButton';

const testData = {
    records: [
        { field_a: 'Cat',field_b: 'Meow' },
        { field_a: 'Do',field_b: 'Bhow' },
    ],
    actor: {
        logMe: (rec) => {
            console.log(JSON.stringify(rec));
        }
    }
}

export const Primary = () => (
<TUITable data={testData} fields={
    [
    {
        label: 'Field A',
        content: (record) => record.field_a
    },
    {
        label: 'Field B',
        content: (record) => record.field_b
    },
    {
        label: 'Action',
        content: (record, actor) => (<TUIButton action={() => actor.logMe(record)} label="Log Me" />)
    }]
} />)
