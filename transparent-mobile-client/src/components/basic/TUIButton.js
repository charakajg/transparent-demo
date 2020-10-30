import React from 'react';
import PropTypes from 'prop-types';

import { Button, Tooltip } from '@material-ui/core';

export default class TUIButton extends React.Component {
    render() {
        const { action, label, disabled = false, tooltip } = this.props;
        const ButtonCompoent = (<Button disabled={disabled} onClick={action}>{label}</Button>);
        return (
            (tooltip!=null) ?
            <Tooltip title={tooltip} ><span>{ButtonCompoent}</span></Tooltip> :(ButtonCompoent)
        );
    }
}

TUIButton.propTypes = {
    action: PropTypes.func.isRequired,
    label: PropTypes.string,
    tooltip: PropTypes.string,
    disabled: PropTypes.bool
}