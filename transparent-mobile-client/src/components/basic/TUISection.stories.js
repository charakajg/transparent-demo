import React from 'react';
import TUISection from './TUISection';
import TUIInfo from './TUIInfo';

export const Primary = () => (<TUISection title="Section title">
                    <TUIInfo label="Child 1" value="Value 1" />
                    <TUIInfo label="Child 2" value="Value 2" />
                </TUISection>)