const graphql_config = {
    host: "10.0.2.2",
    port: 5000,
    endpoint: "/graphql"
};
export default {
    GRAPHQL_URI: `http://${graphql_config.host}:${graphql_config.port}${graphql_config.endpoint}`
}