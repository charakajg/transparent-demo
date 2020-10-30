import React from 'react';
import TUITabView from './TUITabView';
import TUIInput from './TUIInput';
import TUIForm from './TUIForm';
import TUISection from './TUISection';
import TUIInfo from './TUIInfo';

import TUILogin from '../auth/TUILogin';
import TUIRegister from '../auth/TUIRegister';

export const PrimaryX = () => (<TUITabView tabs={
    [
        {
            title: "Tab A",
            content: () =>  <TUISection title="Tab A Content">
                    <TUIInfo label="Child 1" value="Value 1" />
                    <TUIInfo label="Child 2" value="Value 2" />
                </TUISection>
        },
        {
            title: "Tab B",
            content: (changeTab)=> <TUIForm action={(rec) => {
                changeTab(0);
                }} submitLabel="Submit Label" clear={(model) => { console.log('clearing model') }}
                    view={(model, update) =>
                        <>
                            <TUIInput label="Text input A" required={true} onValueChange={(value) => { model.a = value; update(model); }} />
                            <TUIInput label="Text input B" required={true} onValueChange={(value) => { model.b = value; update(model); }} />
                        </>
                    } />
        }
    ]
} />)


const authModel = {
    isLogged: false,
    user: {
        login: ""
    },
    refresh: async () => {
        console.log('refresh');
    },
    logout: async () => {
        authModel.isLogged = false;
        authModel.user.login = "";
        console.log('logout');
    },
    login: async (data) => {
        authModel.isLogged = true;
        authModel.user.login = "Test User";
        console.log('login');
    },
    register: async (data) => {
        console.log('register');
    }
};
export const Primary = () => (<TUITabView tabs={
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
                } />)