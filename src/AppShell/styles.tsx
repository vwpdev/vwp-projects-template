import styled from "styled-components";
import { Button } from "@material-ui/core";

export const Toolbar = styled.div`
width: 100%;
height: 140px;
padding: 0 10px 10px;
border-bottom: 1px #ccc solid;
display: flex;
align-items: center;
`
export const Container = styled.div``;
export const Menu = styled.div`
display: flex;
`;
export const MenuItem = styled(Button)`
margin: 0 8px;
`;
export const Logo = styled.div``;