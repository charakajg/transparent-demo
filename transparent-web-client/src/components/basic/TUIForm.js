import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import TUIButton from './TUIButton'

export default function TUIForm({ action, submitLabel="Submit", view, clear }) {
    const [model, setModel] = useState({});

    return (
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center">
            {view(model,(model)=>{ setModel(model) })}
            <TUIButton label={submitLabel} action={()=>{
                const done = action(model);
                if (done && clear) {
                    clear(model);
                    setModel(model);
                }
            }} />
        </Grid>
    );
}

TUIForm.propTypes = {
    submitLabel: PropTypes.string,
    view: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    clear: PropTypes.func
}