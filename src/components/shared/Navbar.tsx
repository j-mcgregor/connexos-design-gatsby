import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import { Link } from 'gatsby'

import Burger from './Burger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faEtsy, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { theme } from '../Layout'

const Nav = styled.nav`
    max-width: 100%;
    border-bottom: 2px solid ${({ theme }) => theme.palette.light};
    padding: 0 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: 'CormorantGaramond-Light', Times, serif;

    h1 {
        color: black;
    }

    .logo {
        width: 150px;
        padding: 15px 0;
    }
`

interface SubNavProps {
    theme: typeof theme
}

const SubNav = styled.nav<SubNavProps>`
    background: ${({ theme }) => theme.palette.light};
    color: ${({ theme }) => theme.palette.white};
    width: 100%;
    border-bottom: 2px solid ${({ theme }) => theme.palette.white};
    padding: 0.6em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Raleway-Light';

    svg {
        color: black;
        margin-left: 15px;
    }
`

export interface ProductLinkProps {
    label: string
    product_link: {
        link_type: string
        uid: string
        url: string
    }
}
export interface NavbarProps {
    icon?: string
    products: ProductLinkProps[]
}

const Navbar: React.FC<NavbarProps> = ({ products }) => {
    return (
        <>
            <SubNav className="row">
                <div className="col-md-6">
                    <Link to="/">FAQ</Link>
                </div>
                <div className="col-md-6 text-right">
                    <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
                    </a>
                    <a href="http://etsy.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faEtsy} size="lg" />
                    </a>
                    <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                </div>
            </SubNav>
            <Nav>
                <h1>Connexos Design</h1>
                <Burger products={products} />
            </Nav>
        </>
    )
}

// @ts-ignore
export default withTheme(Navbar)
