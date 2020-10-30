import React from 'react';
import TUIButton from './TUIButton';

export const Primary=()=><TUIButton label="Button" action={()=>{console.log('pressed');}} tooltip="Tooltip" />;
export const Secondary=()=><TUIButton label="Button" action={()=>{console.log('pressed');}} tooltip="Tooltip" disabled={true}/>;