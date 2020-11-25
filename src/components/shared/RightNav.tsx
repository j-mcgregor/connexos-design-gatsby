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
    font-family: ${({ theme }) => theme.fonts.primaryFont};

    li {
        padding: 0.7em;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
        flex-flow: column nowrap;
        background-color: ${({ theme }) => theme.palette.dark_1};
        position: fixed;
        transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;
        margin: 0;
        font-size: 2em;

        li {
            color: ${({ theme }) => theme.palette.white};

            a:hover {
                color: ${({ theme }) => theme.palette.white};
            }
        }
    }
`

const RightNav: React.FC<BurgerProps> = ({ open, products }) => {
    return (
        <Ul open={open}>
            <li>
                <Link to="/">Accueille</Link>
            </li>
            <li>
                <Link to="/about">À propos</Link>
            </li>
            <li>
                <a href="https://www.etsy.com/shop/ConnexosDesign" target="_blank" rel="noreferrer">
                    Etsy
                </a>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
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
