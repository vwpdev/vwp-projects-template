import { gql } from "apollo-server-core";

export default {
    QueryResolvers: {
        async getUsers(_: any, args: any) {
            console.log("TESTE ", args);
            return [{ name: "query.teste" },{ name: "query.teste-2" }]
        }
    },
    MutationResolvers: {
    },
    Self: {
        Resolvers: {
        },
        Fragment: gql`
            type User {
                name: String
            }

            extend type Query {
                getUsers(id:String!): [User]
            }
          `
    }
}