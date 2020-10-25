import { Link } from 'gatsby'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

const StyledFooter = styled.footer`
    background: ${({ theme }) => theme.palette.light};
    padding: 7em;

    h5 {
        color: ${({ theme }) => theme.palette.center};
    }

    .icon {
        padding: 2em;
        width: 200px;
    }
`

const StyledListGroup = styled.ul`
    padding: 0;
    list-style: none;

    li {
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
                    <div className="col-md-3">
                        <h5>Customer Care</h5>
                        <StyledListGroup className="list-group">
                            <li className="list-group-item">
                                <Link to="/">FAQ</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Returns & Exchanges</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Clothing Sizing Guide</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Swimwear Sizing Guide</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Buy Gift Card</Link>
                            </li>
                        </StyledListGroup>
                    </div>
                    <div className="col-md-3">
                        <h5>Company</h5>
                        <StyledListGroup className="list-group">
                            <li className="list-group-item">
                                <Link to="/">Blog</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Wholesale</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Student Perks</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Contact Us</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Terms & Conditions</Link>
                            </li>
                        </StyledListGroup>
                    </div>
                    <div className="col-md-3">
                        <h5>About Us</h5>
                        <StyledListGroup className="list-group">
                            <li className="list-group-item">
                                <Link to="/">Who we are</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Design Process</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/">Our store</Link>
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
