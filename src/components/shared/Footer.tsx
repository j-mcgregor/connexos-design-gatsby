import { Link } from 'gatsby'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

const StyledFooter = styled.footer`
    background: ${({ theme }) => theme.palette.light};
    font-family: 'FiraSans-Regular';

    .icon {
        padding: 2em;
        width: 200px;
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
`

interface FooterProps {
    icon: string
}

const Footer: React.FC<FooterProps> = ({ icon }) => {
    return (
        <StyledFooter className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <img src={icon} alt="icon" className="icon" />
                    </div>
                    <div className="col-md-3 flex flex-center">
                        <StyledListGroup className="list-group">
                            <li className="list-group-item">
                                <Link to="/">FAQ</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Retours, Réparations & Échanges</Link>
                            </li>
                        </StyledListGroup>
                    </div>
                    <div className="col-md-3 flex flex-center">
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
