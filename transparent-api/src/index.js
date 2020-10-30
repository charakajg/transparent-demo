const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("express-jwt");
const cors = require("cors");

const { JWT_SECRET, JWT_ALGO, GRAPHQL_ENDPOINT, SERVER_PORT } = require("./config");
const { MESSAGES } = require("./strings");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();
const auth = jwt({
    secret: JWT_SECRET,
    credentialsRequired: false,
    algorithms: [JWT_ALGO]
});
app.use(auth);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: GRAPHQL_ENDPOINT,
    },
    context: ({ req }) => {
        const user = req.headers.user
            ? JSON.parse(req.headers.user)
            : req.user
            ? req.user
            : null;
        return { user };
    },
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || SERVER_PORT;

app.use(cors());
app.listen(PORT, () => {
    console.log(`${MESSAGES.SERVER_STARTED} ${PORT}`);
});