import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';

export default class TUIInput extends React.Component {
    render() {
        const { label, masked = false, required = false, numeric=false, onValueChange } = this.props;
        return (
            <TextInput
                label={label} type="outlined" secureTextEntry={masked} 
                keyboardType ={numeric ? "numeric" : undefined}  required={required} variant="outlined" onChangeText={(text)=>onValueChange(text)} 
            />
        );
    }
}

TUIInput.propTypes = {
    label: PropTypes.string.isRequired,
    onValueChange: PropTypes.func,
    required: PropTypes.bool,
    numeric: PropTypes.bool,
    masked: PropTypes.bool
}