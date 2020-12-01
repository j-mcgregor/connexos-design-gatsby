import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import {
    flexCenterColumn,
    flexCenterRowSpaceBetween,
    flexJustiftCenterAlignStartColumn,
    flexStartColumn,
} from '../../utils/themeUtils'
import { socialIcons, SocialLinks } from './Navbar'

const StyledFooter = styled.footer`
    background: ${({ theme }) => theme.palette.light};
    font-family: ${({ theme }) => theme.fonts.primaryFont};
    box-sizing: border-box;

    .icon {
        padding: 2em;
        width: 200px;
    }

    .social {
        ${flexCenterRowSpaceBetween};
        height: 100%;
        width: 100%;
        padding: 2em;
        a {
            color: ${({ theme }) => theme.palette.center};
        }
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
        padding: 2em;
        .row {
            ${flexCenterColumn};
            width: 100%;
            margin: auto;
        }
        .icon {
            display: none;
        }
        .social {
            a {
                margin: 10px 0;
                color: ${({ theme }) => theme.palette.center};
            }
        }

        div[class*='col-'] {
            width: 100%;
        }
    }
`

const StyledListGroup = styled.ul`
    padding: 0;
    list-style: none;
    ${flexJustiftCenterAlignStartColumn};
    transform: translateY(50%);

    li {
        a {
            color: ${({ theme }) => theme.palette.dark};

            &:hover {
                color: ${({ theme }) => theme.palette.black};
            }
        }
        margin: 15px 0;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
        display: block;
        width: 100% !important;
        transform: none;

        li {
            width: 100% !important;
            a {
                width: 100% !important;
                text-align: left;
            }
        }
    }
`

interface FooterProps {
    icon: string
    social?: SocialLinks[]
}

const Footer: React.FC<FooterProps> = ({ icon, social }) => {
    return (
        <StyledFooter className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <img src={icon} alt="icon" className="icon" />
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <StyledListGroup className="list-group">
                            <li className="list-group-item">
                                <Link to="/faq">FAQ</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/returns">Retours, Réparations & Échanges</Link>
                            </li>
                        </StyledListGroup>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <StyledListGroup className="list-group">
                            <li className="list-group-item">
                                <Link to="/pour-nous-joindre">Pour nous joindre</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/termes-et-conditions">Termes & Conditions</Link>
                            </li>
                        </StyledListGroup>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <div className="social">
                            {social?.map(s => (
                                <a href={s.url.url} target="_blank" rel="noopener noreferrer" key={s.name}>
                                    <FontAwesomeIcon icon={socialIcons[s.name]} size="lg" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </StyledFooter>
    )
}

// @ts-ignore
export default withTheme(Footer)
