import { Container, Logo, Menu, MenuItem, Toolbar } from '@src/AppShell/styles';
import React from 'react';
import Search from '@src/Search';
// import { Container } from './styles';

export default function Index() {
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

            </Container>
        </>
    );
}
