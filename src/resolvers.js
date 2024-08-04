import {gql} from 'apollo-server';
import {repoService} from "./services/repoService.js";

export const typeDefs = gql`
type Repository {
    name: String
    size: Int
    owner: String
    isPrivate: Boolean
    fileCount: Int
    ymlContent: String
    webhooks: [String]
}

type Query {
    listRepositories(token: String!): [Repository]
    repositoryListDetails(token: String!, repoNames: [String]!, userName: String!): [Repository]
}
`;

export const resolvers = {
    Query: {
        listRepositories: async (_, {token}) => {
            try {
                return await repoService.getRepoList(token);
            } catch (error) {
                // log error
                throw error;
            }
        },

        repositoryListDetails: async (_, {token, repoNames, userName}) => {
            try {
                 return await repoService.getRepoListDetails({token, repoNames, userName});
            } catch (error) {
                // log error
                throw error;
            }
        },
    },
};




