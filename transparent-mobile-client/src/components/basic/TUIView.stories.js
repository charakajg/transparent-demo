import React from 'react';
import TUIView from './TUIView';
import TUIInfo from './TUIInfo';

export const Primary = () => (<TUIView>
                    <TUIInfo label="Child 1" value="Value 1" />
                    <TUIInfo label="Child 2" value="Value 2" />
                </TUIView>)