import { gql } from 'apollo-server';
import pLimit from 'p-limit' ;
import { repoService } from "./services/repoService.js";

const limit = pLimit(2);

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
    repositoryDetails(token: String!, repoName: String!, userName: String!): Repository
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

        repositoryDetails: async (_, {token, repoName, userName}) => {
            console.log(token, repoName);
            const getRepoDetails = async() => {
                try {
                    const details = await repoService.getRepoDetails({token, repoName, userName});
                    console.log(details);
                    return details
                } catch (error) {
                    // log error
                    throw error;
                }
            }

            return limit(getRepoDetails);
        },
    },
};

