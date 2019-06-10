import React from 'react';
import { Container, Logo, Menu, MenuItem,  Toolbar } from './styles';
import Search from '@src/Components/Search';


export default function AppContainer({ children }: { children: any }) {
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
                {children}
            </Container>
        </>
    );
}
