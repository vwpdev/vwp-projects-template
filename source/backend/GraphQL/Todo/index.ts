import gql from "graphql-tag";
import { addTodo, removeTodo } from "./Resolvers";

export default {
    MutationResolvers: {
        addTodo: addTodo,
        removeTodo: removeTodo
    },
    Self: {
        Fragment: gql`
        type Todo {
            title: String
            complete: Boolean
            _id: String
        }
        input TodoInput{
            title: String
            complete: Boolean
        }
        extend type Mutation {
            addTodo(todo: TodoInput): Todo
            removeTodo(todoId: String): Todo
        }

    `,
        Resolvers: {

        },
    }
}