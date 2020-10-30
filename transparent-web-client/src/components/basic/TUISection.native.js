import React from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import { Title } from 'react-native-paper';

export default class TUISection extends React.Component {
    render() {
        const { title, children } = this.props;
        return (
            <View>
                <Title>{title}</Title>
                <View>
                {children}
                </View>
            </View>
        );
    }
}

TUISection.propTypes = {
    title: PropTypes.string
}