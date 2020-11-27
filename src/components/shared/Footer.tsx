import { Link } from 'gatsby'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import { flexCenterColumn, flexStartColumn } from '../../utils/themeUtils'

const StyledFooter = styled.footer`
    background: ${({ theme }) => theme.palette.light};
    font-family: ${({ theme }) => theme.fonts.primaryFont};
    box-sizing: border-box;

    .icon {
        padding: 2em;
        width: 200px;
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
    }
`

const StyledListGroup = styled.ul`
    padding: 0;
    list-style: none;

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
        ${flexStartColumn};
        li {
            width: 100%;

            a {
                text-align: left;
            }
        }
    }
`

interface FooterProps {
    icon: string
}

const Footer: React.FC<FooterProps> = ({ icon }) => {
    return (
        <StyledFooter className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <img src={icon} alt="icon" className="icon" />
                    </div>
                    <div className="col-md-3 col-sm-12 flex flex-center">
                        <StyledListGroup className="list-group">
                            <li className="list-group-item">
                                <Link to="/">FAQ</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Retours, Réparations & Échanges</Link>
                            </li>
                        </StyledListGroup>
                    </div>
                    <div className="col-md-3 col-sm-12 flex flex-center">
                        <StyledListGroup className="list-group">
                            <li className="list-group-item">
                                <Link to="/">Pour nous joindre</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Termes & Conditions</Link>
                            </li>
                        </StyledListGroup>
                    </div>
                </div>
            </div>
        </StyledFooter>
    )
}

// @ts-ignore
export default withTheme(Footer)
