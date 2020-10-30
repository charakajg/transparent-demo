import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

export default class TUIInput extends React.Component {
    render() {
        const { label, masked = false, required = false, numeric=false, onValueChange } = this.props;
        return (
            <Box m={2} ><TextField label={label} pattern={numeric ? "[0-9]*" : undefined} type={masked?"password":numeric?"number":"text"} required={required} variant="outlined" onChange={(e)=>onValueChange(e.target.value)} /></Box>
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