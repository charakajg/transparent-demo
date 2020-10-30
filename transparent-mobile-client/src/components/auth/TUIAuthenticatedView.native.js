import React from 'react';
import PropTypes from 'prop-types';

import TUIUserBar from './TUIUserBar';
import TUILogin from './TUILogin';
import TUIRegister from './TUIRegister';
import TUIView from '../basic/TUIView';
import TUITabView from '../basic/TUITabView';

export default function TUIAuthenticatedView({ authModel, view, title }) {
    return (
        <>
            <TUIUserBar authModel={authModel} title={title} />
            {(authModel.isLogged && authModel.user) ?
            <>{view(authModel.user)}</>:
            <TUITabView tabs={
                    [
                        {
                            title: "Login",
                            content: () =>  <TUILogin authModel={authModel} />
                        },
                        {
                            title: "Register",
                            content: (changeTab)=> <TUIRegister authModel={authModel} onComplete={()=> {
                                changeTab(0);
                                alert('Succefully registered!')
                            }} />
                        }
                    ]
                } />
           }
        </>
    );
}

TUIAuthenticatedView.propTypes = {
    title: PropTypes.string.isRequired,
    authModel: PropTypes.object.isRequired,
    view: PropTypes.func.isRequired
}