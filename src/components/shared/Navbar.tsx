import { faEtsy, faFacebookSquare, faInstagram, IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import { ProductsPageNodeProps } from '../../types/enums'
import { theme } from '../Layout'
import Burger from './Burger'

const Nav = styled.nav`
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid ${({ theme }) => theme.palette.light};
    padding: 0 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.secondaryFont};

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
    font-family: ${({ theme }) => theme.fonts.primaryFont};
    margin-left: 0;
    margin-right: 0;
    box-sizing: border-box;

    a {
        color: ${({ theme }) => theme.palette.dark_1};
    }

    svg {
        color: ${({ theme }) => theme.palette.dark};
        margin-left: 15px;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
        height: 4em;
        .social {
            display: none;
        }
    }
`

export interface SocialLinks {
    name: string
    url: {
        url: string
    }
}

export interface NavbarProps {
    icon?: string
    products: ProductsPageNodeProps[]
    social?: SocialLinks[]
}

const socialIcons: { [x: string]: IconDefinition } = {
    Mail: faEnvelope,
    Facebook: faFacebookSquare,
    Etsy: faEtsy,
    Instagram: faInstagram,
}

const Navbar: React.FC<NavbarProps> = ({ products, social }) => {
    const socialLinks = social?.map(s => (
        <a href={s.url.url} target="_blank" rel="noopener noreferrer" key={s.name}>
            <FontAwesomeIcon icon={socialIcons[s.name]} size="lg" />
        </a>
    ))
    return (
        <>
            <SubNav className="row">
                <div className="col-md-6">
                    <Link to="/faq" className="text-uppercase">
                        FAQ
                    </Link>
                </div>
                <div className="col-md-6 text-right social">{socialLinks}</div>
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
