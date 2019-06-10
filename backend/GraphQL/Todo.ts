import { gql } from "apollo-server-core";
import { ServerContextType } from "backend/Services/ServerContext";

export default {
    QueryResolvers: {
        async getTodos(_: any, __: any, context: ServerContextType) {
            const { Models } = context;
            return Models.TodoList.getInstance().getPureCollection().find();
        }
    },
    MutationResolvers: {
        async addTodo(_: any, { todo }: any, context: ServerContextType) {
            const newTodo = await context.Models.TodoList.getInstance().setData(todo).save<{ label: string, complete: boolean }>()

            console.log("WILL ADD", newTodo);
            return newTodo
        }
    },
    Self: {
        Resolvers: {},
        Fragment: gql`

            type Todo {
                label: String!
                complete: Boolean
                _id: String
            }

            input TodoInput {
                _id: String
                label: String!
                complete: Boolean
            }
            

            extend type Query {
                getTodos(id: String): [Todo]
            }

            extend type Mutation {
                addTodo(todo: TodoInput): Todo
            }
          `
    }
}