import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { BurgerProps } from './Burger'

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

const RightNav: React.FC<BurgerProps> = ({ open, products }) => {
    return (
        <Ul open={open}>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <a href="https://www.etsy.com/shop/ConnexosDesign" target="_blank" rel="noreferrer">
                    Etsy Shop
                </a>
            </li>
            <li>
                <Link to="/contact">Get in touch</Link>
            </li>
            {products?.map(p => (
                <li key={p.id}>
                    <Link to={`/products/${p.uid}`} className="text-capitalize">
                        {p.uid}
                    </Link>
                </li>
            ))}
        </Ul>
    )
}

export default RightNav
