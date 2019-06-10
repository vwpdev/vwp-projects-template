import { Checkbox, FormControlLabel, Icon, IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Todo } from './styles';


export interface TodoItemProps {
    label: string;
    complete?: boolean;
    _id: string;
}

export default function TodoItem({ todo: propTodo, saveTodo }: { todo: TodoItemProps, saveTodo: (todo: TodoItemProps) => any }) {
    const [todo, setTodo] = useState(propTodo);

    const [editLabel, setEditLabel] = useState(false);

    const { _id, complete, label } = todo;
    function handleTodoChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.persist();
        e.preventDefault();
        setTodo({
            ...todo,
            label: e.target.value
        });
    }

    function handleSave() {
        saveTodo({
            _id: todo._id,
            label: todo.label
        })
    }

    return (
        <Todo key={_id}>
            {!editLabel && (
                <FormControlLabel
                    style={{ flex: '1' }}
                    control={
                        <Checkbox
                            checked={complete}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                saveTodo({ _id, label, complete: e.target.checked });
                                setTodo({ ...todo, complete: e.target.checked });
                            }}
                            value={"check-complete"}
                        />
                    }
                    label={label}
                />
            )}
            {editLabel && (
                <TextField
                    label="Título do Todo"
                    defaultValue={todo.label}
                    style={{ flex: '1', marginRight: '16px' }}
                    onBlur={handleSave}
                    onChange={handleTodoChange}
                />
            )}
            <IconButton onClick={() => setEditLabel(!editLabel)} style={{ width: '48px', height: '48px', marginRight: '16px' }}  >
                <Icon> {editLabel ? 'close' : 'edit'}  </Icon>
            </IconButton>
        </Todo>
    )
}
