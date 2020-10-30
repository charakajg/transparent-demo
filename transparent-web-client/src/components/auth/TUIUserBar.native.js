import React from 'react';
import PropTypes from 'prop-types';

import { Appbar } from 'react-native-paper';

export default function TUIUserBar({ authModel, title }) {
    return (
        <Appbar>
            <Appbar.Content  title={title} />
            {(authModel.isLogged && authModel.user) &&
                <>
                <Appbar.Content  title={'Logged as '+authModel.user.login} />
                <Appbar.Action icon="label" onPress={authModel.logout} />
                </>}
            
        </Appbar>
    );
}

TUIUserBar.propTypes = {
    title: PropTypes.string.isRequired,
    authModel: PropTypes.object.isRequired
}