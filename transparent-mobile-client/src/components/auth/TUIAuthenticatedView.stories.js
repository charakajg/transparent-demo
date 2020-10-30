import React from 'react';
import TUIAuthenticatedView from './TUIAuthenticatedView';
import TUIInfo from '../basic/TUIInfo';

import { withTestAuthModel } from '../utils'

const TUIAuthenticatedViewWithTestAuthModel = withTestAuthModel(TUIAuthenticatedView);
export const Primary=()=>(<TUIAuthenticatedViewWithTestAuthModel title="App Tittle"
    view={(user) => (<TUIInfo label="Login" value={user.login} />)
    }/>);