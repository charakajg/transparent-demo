const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: String!
        login: String!
    }
    
    type Pet {
        id: String!
        name: String!
        location: String!
        fee: Int!
        current_owner: User!
        current_adopter: User
    }

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
`;

module.exports = typeDefs;