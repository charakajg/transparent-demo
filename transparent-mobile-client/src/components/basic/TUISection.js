import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';

export default class TUISection extends React.Component {
    render() {
        const { title, children } = this.props;
        return (
            <Paper>
        <div>
            <h2>{title}</h2>
            <div>
            {children}
            </div>
        </div></Paper>
        );
    }
}

TUISection.propTypes = {
    title: PropTypes.string
}