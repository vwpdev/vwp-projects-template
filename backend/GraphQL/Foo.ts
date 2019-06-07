import { gql } from "apollo-server-core";

export default {
    QueryResolvers: {
        async foos(_: any, args: any) {
            console.log("TESTE ", args);
            return [{ barr: "query.teste" }]
        }
    },
    MutationResolvers: {
        async addFoo(_: any) {
            
            return { barr: "teste" }
        }
    },
    Self: {
        Resolvers: {
            async barr(_: any) {
            
                return ""
            }
        },
        Fragment: gql`
            type Foo {
                barr: String
                barz: String
            }

            extend type Query {
                foos(id: String): [Foo]
            }

            extend type Mutation {
                addFoo(id: String!): Foo
            }
          `
    }
}