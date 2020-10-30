import React from 'react';
import PropTypes from 'prop-types';

import { Text } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
  
export default function TUITable({ data, fields, emptyMessage = "No records!" }) {
    const records = (data!=null ? data.records : []) || [];
    const actor = (data!=null ? data.actor : {}) || {};
    return (
        (records.length===0) ? 
        <Text>{emptyMessage}</Text>:
        <DataTable>
          <DataTable.Header>
            {fields.map((elem,index)=>(<DataTable.Title key={index}>{elem.label}</DataTable.Title>))}
          </DataTable.Header>
      
          {records.map((record) => (
                <DataTable.Row key={record.name}>
                    {fields.map((elem,index)=>(<DataTable.Cell key={index}>{elem.content(record,actor)}</DataTable.Cell>))}
                </DataTable.Row>
            ))}
        </DataTable>
      )
}

TUITable.propTypes = {
    data: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    emptyMessage: PropTypes.string
}