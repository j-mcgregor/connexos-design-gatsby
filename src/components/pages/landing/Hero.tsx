import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import { theme } from '../../Layout'

export interface HeroProps {
    backgroundImage?: string
    logo?: JSX.Element
    theme: typeof theme
}
const StyledHero = styled.div<HeroProps>`
    background: ${({ theme }) => theme.palette.white};
    padding: 5em 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .container-fluid {
        padding: 0 5em;

        .row {
            > div {
                height: 70vh;
                padding: 0;

                &.left {
                    background: ${({ theme }) => theme.palette.light_2};
                    padding: 0 6em;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;

                    h1 {
                        color: ${({ theme }) => theme.palette.dark_2};
                        text-transform: uppercase;
                        font-size: 3em;
                    }
                    h2 {
                        color: ${({ theme }) => theme.palette.center};
                        font-family: 'CormorantGaramond-Light', Times, serif;
                        font-size: 2.1em;
                    }

                    h3 {
                        color: ${({ theme }) => theme.palette.dark_1};
                        font-family: 'Raleway-Light';
                    }

                    p {
                        font-size: 0.9em;
                        line-height: 2em;
                        letter-spacing: 1.1px;
                    }
                }

                &.right {
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }
            }
        }
    }
`

const Hero: React.FC<HeroProps> = ({ backgroundImage, children }) => {
    return (
        <StyledHero>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 left text-center">{children}</div>
                    <div className="col-md-6 right">
                        <img src={backgroundImage} alt="" />
                    </div>
                </div>
            </div>
        </StyledHero>
    )
}

// @ts-ignore
export default withTheme(Hero)
