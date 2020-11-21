import { faEtsy, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import { ProductsPageNodeProps } from '../../types/enums'
import { theme } from '../Layout'
import Burger from './Burger'

const Nav = styled.nav`
    max-width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.palette.light};
    padding: 0 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: 'FiraSans-Regular', Times, serif;

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
    color: ${({ theme }) => theme.palette.dark};
    width: 100%;
    border-bottom: 2px solid ${({ theme }) => theme.palette.white};
    padding: 0.6em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'FiraSans-Regular';

    a {
        color: ${({ theme }) => theme.palette.dark_1};
    }
    svg {
        color: black;
        margin-left: 15px;
    }
`

export interface NavbarProps {
    icon?: string
    products: ProductsPageNodeProps[]
}

const Navbar: React.FC<NavbarProps> = ({ products }) => {
    return (
        <>
            <SubNav className="row">
                <div className="col-md-6">
                    <Link to="/faq">FAQ</Link>
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
