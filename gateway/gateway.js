import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            { name: 'users', url: 'http://localhost:4010/graphql' }
            // { name: 'products', url: 'http://localhost:4020/graphql' },
            // { name: 'orders', url: 'http://localhost:4030/graphql' },
        ],
    }),
});

const server = new ApolloServer({ gateway });

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`Gateway ready at ${url}`);