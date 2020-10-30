import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default class TUIInfo extends React.Component {
    render() {
        const { label, value } = this.props;
        return (
            <View>
                <Text>{label} : {value}</Text>
            </View>
        );
    }
}

TUIInfo.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string
}