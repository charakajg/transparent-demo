
import React, { useState } from 'react';

export function hasValue(str) {
    return (str && str.trim().length!==0);
}

export function withTestAuthModel(WrappedComponent) {
    const handler = {
        update: ()=>{}
    }
    const authModel = {
        isLogged: false,
        user: {
            login: ""
        },
        refresh: () => {
            console.log('refresh');
        },
        logout: () => {
            authModel.isLogged = false;
            authModel.user.login = "";
            handler.update();
            console.log('logout');
        },
        login: (data) => {
            authModel.isLogged = true;
            authModel.user.login = "Test User";
            handler.update();
            console.log('login');
        },
        register: (data) => {
            handler.update();
            console.log('register');
        }
    };

    return (props)=>{
        const [model, setModel] = useState(authModel);
        const [key, setKey] = useState(0);
        handler.update = ()=>{setModel(authModel); setKey(key+1);console.log(key);};
        return(<WrappedComponent authModel={model} key={key} {...props}/>)
    }
}