import React from 'react';
import { withTestAuthModel } from '../utils'
import TUIUserBar from './TUIUserBar';

const TUIUserBarWithTestAuthModel = withTestAuthModel(TUIUserBar);
export const Primary=()=><TUIUserBarWithTestAuthModel title="Test App" />;