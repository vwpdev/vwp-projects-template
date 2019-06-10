import { Checkbox, FormControlLabel, Icon, IconButton, TextField } from '@material-ui/core';
import gql from 'graphql-tag';
import React, { createRef, SyntheticEvent, useEffect, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Container, Todo, TodoForm } from './styles';
import TodoItem, { TodoItemProps } from './TodoItem';

interface TodosProps {
    todos: TodoItemProps[]
}

export default function Todos(props: TodosProps) {

    const [todos, setTodos] = useState(props.todos || []);
    useEffect(() => {
        setTodos(props.todos);
    }, [props.todos])

    const addTodo = useMutation(
        gql`
            mutation AddTodo($todo: TodoInput) {
                addTodo(todo: $todo){
                    complete
                    label
                    _id
                }
            }
        `);

    async function saveTodo(todo: TodoItemProps) {
        const savedTodo: any = await addTodo({ variables: { todo } });
        if (!todo._id) {
            setTodos([
                ...todos,
                savedTodo.data.addTodo
            ])
        }
    }

    console.log(todos);
    return (
        <Container>
            {todos.map((todo: TodoItemProps) => {
                return (
                    <TodoItem todo={todo} saveTodo={saveTodo} key={todo._id} />
                )
            })}
            <TodoForm
                onSubmit={(e: SyntheticEvent) => {
                    e.preventDefault();
                    const el: any = e.target;
                    const array: any = new FormData(el);
                    const data: any = Object.fromEntries(Array.from(array))
                    saveTodo(data);
                }} >
                <TextField
                    variant="outlined"
                    style={{ flex: '1', marginRight: '16px' }}
                    label="Título do Todo"
                    name="label"
                />


                <IconButton type="submit" style={{ width: '48px', height: '48px', marginRight: '16px' }} >
                    <Icon>
                        add
                    </Icon>
                </IconButton>
            </TodoForm>
        </Container>
    );
}
