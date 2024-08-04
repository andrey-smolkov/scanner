import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './src/resolvers.js';

const server = new ApolloServer({ typeDefs, resolvers });

server
    .listen()
    .then(({url}) => {
        console.log(`Server running on: ${url}`);
    });