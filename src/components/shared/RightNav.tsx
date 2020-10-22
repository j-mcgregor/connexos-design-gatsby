import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

interface UlProps {
    open: boolean
}

const Ul = styled.ul<UlProps>`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    padding: 0;
    font-family: 'Raleway-Light';

    li {
        padding: 0.7em;
    }

    @media (max-width: 768px) {
        flex-flow: column nowrap;
        background-color: #0d2538;
        position: fixed;
        transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
        top: 0;
        right: 0;
        height: 100vh;
        width: 300px;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;
        margin: 0;

        li {
            color: #fff;
        }
    }
`

const RightNav = ({ open }) => {
    return (
        <Ul open={open}>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/contact">Get in touch</Link>
            </li>
        </Ul>
    )
}

export default RightNav
