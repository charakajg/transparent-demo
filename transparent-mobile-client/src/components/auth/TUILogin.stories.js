import React from 'react';
import { withTestAuthModel } from '../utils'
import TUILogin from './TUILogin';

const TUILoginWithTestAuthModel = withTestAuthModel(TUILogin);
export const Primary=()=><TUILoginWithTestAuthModel />;