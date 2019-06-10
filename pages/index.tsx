import { Container, Logo, Menu, MenuItem, Toolbar } from '@src/Components/AppShell/styles';
import Search from '@src/Components/Search';
import React from 'react';
import { ModelsType } from '@backend/Models';
import Todos from '@src/Components/Todos';

export default function Index({ todos }: { todos: any[] }) {
    return (
        <>
            <Toolbar>
                <Logo />
                <Search />
                <Menu>
                    <MenuItem> MENU 1 </MenuItem>
                    <MenuItem> MENU 2 </MenuItem>
                    <MenuItem> MENU 3 </MenuItem>
                </Menu>
            </Toolbar>
            <Container>
                <Todos todos={todos} />
            </Container>
        </>
    );
}
Index.getInitialProps = async function ({ req }: any) {
    if (req && req.Models) {
        const Models: ModelsType = req.Models;
        const todos = await Models.TodoList.getInstance().getPureCollection().find();
        return { todos }
    }
    return { todos: [] }
}
