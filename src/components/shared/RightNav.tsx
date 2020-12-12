import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { BurgerProps } from './Burger'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'

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
    const handleClick = () => {
        trackCustomEvent({
            // string - required - The object that was interacted with (e.g.video)
            category: 'Special Button',
            // string - required - Type of interaction (e.g. 'play')
            action: 'Click',
            // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
            label: 'Gatsby Plugin Example Campaign',
            // number - optional - Numeric value associated with the event. (e.g. A product ID)
            value: 43,
        })
    }

    return (
        <Ul open={open}>
            <li>
                <Link to="/" onClick={handleClick}>
                    Accueil
                </Link>
            </li>
            <li>
                <Link to="/about" onClick={handleClick}>
                    À propos
                </Link>
            </li>
            <li>
                <a
                    href="https://www.etsy.com/shop/ConnexosDesign"
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleClick}
                >
                    Boutique Etsy
                </a>
            </li>
            <li>
                <Link to="/contact" onClick={handleClick}>
                    Contact
                </Link>
            </li>
            {products?.map(p => (
                <li key={p.id}>
                    <Link to={`/products/${p.uid}`} className="text-capitalize" onClick={handleClick}>
                        {p.uid}
                    </Link>
                </li>
            ))}
        </Ul>
    )
}

export default RightNav
