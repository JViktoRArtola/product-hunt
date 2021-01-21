import React from 'react';
import Link from "next/link";
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import Search from "../ui/Search";

const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px){
    display: flex;
    justify-content: space-between;
    }
`
const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
    cursor: pointer;
`

const Header = () => {
    return (
        <header css={css`
                    border-bottom: 2px solid var(--gris3);
                    padding: 1rem 0;`}>
            <HeaderContainer>
                <div css={css`display: flex;
                        align-items: center`}>
                    <Link href='/'><Logo>P</Logo></Link>
                    <Search/>
                </div>
                <div css={css`
                        display: flex;
                        align-items: center`}>
                </div>
            </HeaderContainer>
        </header>
    );
};

export default Header;

