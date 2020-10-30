import React from 'react';
import { withTestAuthModel } from '../utils'
import TUIRegister from './TUIRegister';

const TUIRegisterWithTestAuthModel = withTestAuthModel(TUIRegister);
export const Primary=()=><TUIRegisterWithTestAuthModel onComplete={()=>{console.log('registration complete');}}/>;