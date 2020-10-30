import * as graphqlRequests from '../shared/graphqlRequests';
import { EVENTS } from '../shared/constants';

export default function authModelCreator({eventManager }) {
    const authModel = {
        isLogged: false,
        user: {
        login: ""
        },
        refresh: async () => {
        const result = await graphqlRequests.getCurrentUser();
        if (result.success) {
            authModel.isLogged = true;
            authModel.user = result.data;
        } else {
            authModel.isLogged = false;
            authModel.user = { login: '' };
        }
    
        eventManager.emitEvent(EVENTS.AUTH_MODEL_UPDATE_EVENT, authModel);
        },
        logout: async () => {
        const result = await graphqlRequests.logout();
        if (result.success) {
            authModel.isLogged = false;
            eventManager.emitEvent(EVENTS.AUTH_MODEL_UPDATE_EVENT, authModel);
            return true;
        } else {
            alert(result.message);
            return false;
        }
        },
        login: async (data) => {
        const result = await graphqlRequests.login(data.login, data.password);
        if (result.success) {
            authModel.isLogged = true;
            await authModel.refresh();
            return true;
        } else {
            alert(result.message);
            return false;
        }
        },
        register: async (data) => {
            const result = await graphqlRequests.register(data.login, data.password);
            if (result.success) {
                return true;
            } else {
                alert(result.message);
                return false;
            }
        }
    };

    return authModel;
}