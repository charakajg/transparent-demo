import React from 'react';
import TUIInput from './TUIInput';

export const Primary = () => (
    <TUIInput label="Text input A" required={true} onValueChange={(value) => { console.log(value); }} />)
export const Secondary = () => (
    <TUIInput label="Text input B" required={true} numeric={true} onValueChange={(value) => { console.log(value); }} />)
export const Tertiary = () => (
    <TUIInput label="Text input C" required={true} masked={true} onValueChange={(value) => { console.log(value); }} />)