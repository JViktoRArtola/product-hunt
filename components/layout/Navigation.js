import React, {useContext} from 'react';
import Link from "next/link";
import styled from "@emotion/styled";
import FirebaseContext from "../../firebase/context";

const Nav = styled.nav`
    padding-left: 2rem;
    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;
        &:last-of-type {
            margin-right: 0;
        }
    }
`;

const Navigation = () => {
    const {user} = useContext(FirebaseContext);
    return (
        <Nav>
            <Link href='/'>Home</Link>
            <Link href='/popular'>Popular</Link>
            {user && <Link href='/new-product'>New Product</Link>}
        </Nav>
    );
};

export default Navigation;
