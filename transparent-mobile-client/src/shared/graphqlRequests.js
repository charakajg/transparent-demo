
import { gql } from '@apollo/client';
import getClient from './graphqlClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
type Query {
    test: String
    testError: String
    current: User
    pet(id: Int!): Pet
    myOwnPets: [Pet]
    myAdoptedPets: [Pet]
    availableToAdoptPets: [Pet]
}

type Mutation {
    register(login: String!, password: String!): String
    login(login: String!, password: String!): String
    addPet(name: String!, location: String!, fee: Int!): String
    deletePet(pet_id: String!): String
    adoptPet(pet_id: String!): String
    returnPet(pet_id: String!): String
}
*/

const client = {
    _instance: null,
    load: async(force=false)=>{
        if (force || client._instance==null) {
            client._instance = await getClient();
        }
    },
    query: async(parm)=>{
        await client.load();
        return await client._instance.query(parm);
    },
    mutate: async(parm)=>{
        await client.load();
        return await client._instance.mutate(parm);
    }
}

export async function testQuery() {
    try {
        const result = await client.query({
            query: gql`
                query {
                    test
                }
            `
        });
        return result != null ? JSON.stringify(result) : "";
    } catch (e) {
        console.error(e);
        return e.message;
    }
}


export async function testErrorQuery() {
    try {
        const result = await client.query({
            query: gql`
                query {
                    testError
                }
            `
        });
        return result != null ? JSON.stringify(result) : "";
    } catch (e) {
        console.error(e);
        return e.message;
    }
}



export async function testInvalidQuery() {
    try {
        const result = await client.query({
            query: gql`
              query {
                  testInvalid
              }
            `
        });
        return result != null ? JSON.stringify(result) : "";
    } catch (e) {
        console.error(e);
        return e.message;
    }
}

export async function register(ulogin,password) {
    try {
        const result = await client.mutate({
            mutation: gql`
                mutation {
                    register(login: "${ulogin}", password: "${password}")
                }
            `
        });
        const token = result.data.register;
        return {
            success: true,
            token
        }
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: e.message
        }
    }
}

export async function login(ulogin,password) {
    try {
        const result = await client.mutate({
            mutation: gql`
                mutation {
                    login(login: "${ulogin}", password: "${password}")
                }
            `
        });
        console.log(result);
        const token = result.data.login;
        await AsyncStorage.setItem('token',token)
        client.load(true);
        return {
            success: true,
            token
        }
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: e.message
        }
    }
}

export async function logout() {
    try {
        await AsyncStorage.removeItem('token');
        client.load(true);
        return {
            success: true
        }
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: e.message
        }
    }
}

export async function getCurrentUser() {
    try {
        const result = await client.query({
            query: gql`
                query {
                    current {
                        id,
                        login
                    }
                }
            `
        });
        const user = result.data.current;
        return {
            success: true,
            data: user
        }
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: e.message
        }
    }
}

export async function getMyOwnPets() {
    try {
        const result = await client.query({
            query: gql`
                query {
                    myOwnPets {
                        id
                        name
                        location
                        fee
                        current_owner {
                            login
                        }
                        current_adopter {
                            login
                        }
                    }
                }
            `
        });
        const records = result.data.myOwnPets;
        return {
            success: true,
            records
        }
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: e.message
        }
    }
}

export async function getMyAdoptedPets() {
    try {
        const result = await client.query({
            query: gql`
                query {
                    myAdoptedPets {
                        id
                        name
                        location
                        fee
                        current_owner {
                            login
                        }
                        current_adopter {
                            login
                        }
                    }
                }
            `
        });
        const records = result.data.myAdoptedPets;
        return {
            success: true,
            records
        }
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: e.message
        }
    }
}


export async function getAvailableToAdoptPets() {
    try {
        const result = await client.query({
            query: gql`
                query {
                    availableToAdoptPets {
                        id
                        name
                        location
                        fee
                        current_owner {
                            login
                        }
                        current_adopter {
                            login
                        }
                    }
                }
            `
        });
        const records = result.data.availableToAdoptPets;
        return {
            success: true,
            records
        }
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: e.message
        }
    }
}

export async function deletePet(pet_id) {
    try {
        const result = await client.mutate({
            mutation: gql`
                mutation {
                    deletePet(pet_id: "${pet_id}")
                }
            `
        });
        const deleted_id = result.data.adoptPet;
        return {
            success: true,
            data: deleted_id
        }
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: e.message
        }
    }
}

export async function adoptPet(pet_id) {
    try {
        const result = await client.mutate({
            mutation: gql`
                mutation {
                    adoptPet(pet_id: "${pet_id}")
                }
            `
        });
        const updated_id = result.data.adoptPet;
        return {
            success: true,
            data: updated_id
        }
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: e.message
        }
    }
}

export async function returnPet(pet_id) {
    try {
        const result = await client.mutate({
            mutation: gql`
                mutation {
                    returnPet(pet_id: "${pet_id}")
                }
            `
        });
        const updated_id = result.data.returnPet;
        return {
            success: true,
            data: updated_id
        }
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: e.message
        }
    }
}

export async function addPet(name,location,fee) {
    try {
        const result = await client.mutate({
            mutation: gql`
                mutation {
                    addPet(name: "${name}", location: "${location}", fee: ${fee})
                }
            `
        });
        const pet_id = result.data.addPet;
        return {
            success: true,
            data: pet_id
        }
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: e.message
        }
    }
}