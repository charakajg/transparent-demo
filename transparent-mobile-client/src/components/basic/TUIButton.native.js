import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';

export default class TUIButton extends React.Component {
    render() {
        const { action, label, disabled = false, tooltip } = this.props;
        /*
        return (
            <Button  disabled={disabled} onPress={action} accessibilityLabel={tooltip}>
                {label}
            </Button>
        );*/
        return (
            <Button  disabled={disabled} onPress={action}>
                {label}
            </Button>
        );
    }
}

TUIButton.propTypes = {
    action: PropTypes.func.isRequired,
    label: PropTypes.string,
    tooltip: PropTypes.string,
    disabled: PropTypes.bool
}