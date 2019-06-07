import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import fs from "fs";
import { merge } from "lodash";
import path from "path";
import { DocumentNode } from "graphql";

function getGqlString(doc: DocumentNode) {
    return doc.loc && doc.loc.source.body;
}

// const TypeDefs: any[] = [];
export default function GraphQL(app: Express) {

    let GlobalMutationResolver = {};
    let GlobalQueryResolver = {};
    let GlobalResolvers = {};
    const GlobalTypeDefs: any[] = [

    ];
    fs
        .readdirSync(__dirname)
        .filter(dir => !(/^(index)/).test(dir))
        .map(dir => {
            console.log("REGISTERING: =>", dir);

            const { MutationResolvers, QueryResolvers, Self }: { QueryResolvers: any, MutationResolvers: any, Self: { Resolvers?: { [key: string]: any }, Fragment?: any } } = require(path.join(__dirname, dir)).default;

            if (Object.keys(QueryResolvers || {}).length) {
                GlobalQueryResolver = { ...GlobalQueryResolver, ...QueryResolvers };
            }

            if (Object.keys(MutationResolvers || {}).length) {
                GlobalMutationResolver = { ...GlobalMutationResolver, ...MutationResolvers };
            }

            if (Self.Resolvers && Self.Fragment) {
                GlobalResolvers = merge({ [dir.replace(/(\.js|\.ts)/ig, '').trim()]: Self.Resolvers });
                GlobalTypeDefs.push(Self.Fragment)
            }
        });
    const payload: any = {

        typeDefs: `
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

        playground: {
            endpoint: '/graphql',
            settings: {
                'editor.theme': 'light'
            }
        }
    };
    const schema = new ApolloServer(payload);

    schema.applyMiddleware({
        app
    });
    return schema;
}