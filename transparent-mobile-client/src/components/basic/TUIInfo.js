import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

export default class TUIInfo extends React.Component {
    render() {
        const { label, value } = this.props;
        return (
            <Grid
                container
                direction="row"
                alignItems="center"
            >
                <div>{label}</div><div>: </div><div>{value}</div>
            </Grid>
        );
    }
}

TUIInfo.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string
}