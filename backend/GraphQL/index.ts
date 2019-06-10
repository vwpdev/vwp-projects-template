import { ApolloServer, gql } from "apollo-server-express";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { Express } from "express";
import fs from "fs";
import { DocumentNode } from "graphql";
import { merge } from "lodash";
import path from "path";


function getGqlString(doc: DocumentNode) {
    return doc.loc && doc.loc.source.body;
}

// const TypeDefs: any[] = [];
export default function GraphQL({ app, ctx }: { app: Express, ctx?: (req: ExpressContext) => any }) {
    let GlobalMutationResolver = {};
    let GlobalQueryResolver = {};
    let GlobalResolvers = {};
    const GlobalTypeDefs: any[] = [

    ];
    fs
        .readdirSync(__dirname)
        .filter(dir => !(/^(index)/).test(dir))
        .map(dir => {
            console.log("REGISTERING GRAPHQL : =>", dir);

            const { MutationResolvers, QueryResolvers, Self }: { QueryResolvers: any, MutationResolvers: any, Self: { Resolvers?: { [key: string]: any }, Fragment?: any } } = require(path.join(__dirname, dir)).default;

            if (Object.keys(QueryResolvers || {}).length) {
                GlobalQueryResolver = { ...GlobalQueryResolver, ...QueryResolvers };
            }

            if (Object.keys(MutationResolvers || {}).length) {
                GlobalMutationResolver = { ...GlobalMutationResolver, ...MutationResolvers };
            }
            if (Self.Resolvers) {
                GlobalResolvers = merge({ [dir.replace(/(\.js|\.ts)/ig, '').trim()]: Self.Resolvers });
            }
            if (Self.Fragment) {
                GlobalTypeDefs.push(Self.Fragment)
            }
        });
    const schema = new ApolloServer({
        typeDefs: gql`
                type Query { _empty: String   }

                type Mutation { 
                   _empty: String     
                }
                ${GlobalTypeDefs.map(getGqlString).join('\n\n')}
               `,
        resolvers: {
            ...GlobalResolvers,
            Mutation: GlobalMutationResolver,
            Query: GlobalQueryResolver
        },
        playground: true,

        context: (req) => ({
            ... (ctx ? ctx(req) : {})
        })

    });

    schema.applyMiddleware({
        app
    });
    return schema;
}