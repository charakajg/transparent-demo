import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

export default function TUIUserBar({ authModel, title }) {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                {(authModel.isLogged && authModel.user) &&
                <>
                <Typography variant="h6" className={classes.title}>
                    Logged as {authModel.user.login}
                </Typography>
                <Button color="inherit" onClick={authModel.logout}>Logout</Button>
                </>}
            </Toolbar>
        </AppBar>
    );
}

TUIUserBar.propTypes = {
    title: PropTypes.string.isRequired,
    authModel: PropTypes.object.isRequired
}