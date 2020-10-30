import React from 'react';
import PropTypes from 'prop-types';

import { hasValue } from '../utils';

import TUIForm from '../basic/TUIForm';
import TUIInput from '../basic/TUIInput';

export default function TUILogin({ authModel }) {
    return (
        
            <TUIForm action={(rec) => { 
                if (hasValue(rec.login) && hasValue(rec.password))
                    authModel.login(rec)
                else
                    alert('Please enter valid login and password');
            }} submitLabel="Login"
                view={(model, update) =>
                    <>
                        <TUIInput label="Login" required={true} onValueChange={(value) => { model.login = value; update(model); }} />
                        <TUIInput label="Password" required={true} masked={true} onValueChange={(value) => { model.password = value; update(model); }} />
                    </>
                } />
    );
}

TUILogin.propTypes = {
    authModel: PropTypes.object.isRequired
}