import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import { flexCenterColumn } from '../../../utils/themeUtils'

import { theme } from '../../Layout'

export interface HeroProps {
    backgroundImage?: string
    secondaryImage?: string
    logo?: JSX.Element
    theme: typeof theme
}

const StyledHero = styled.div<HeroProps>`
    background: ${({ theme }) => theme.palette.white};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-left: 0;
    padding-right: 0;

    .text-block {
        background: ${({ theme }) => theme.paletteOpacity.light('0.4')};
        padding: 3em 6em;
        ${flexCenterColumn}
    }

    .row {
        width: 100%;

        > div {
            height: 80vh;
            width: 50%;
            padding: 0;

            &.left {
                background: ${({ theme, backgroundImage }) =>
                    `${theme.palette.light_2} url('${backgroundImage}')`};
                background-size: cover;
                background-repeat: no-repeat;
                background-position: left center;
                padding: 0 6em;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-family: ${({ theme }) => theme.fonts.secondaryFont};

                h1 {
                    color: ${({ theme }) => theme.palette.dark_2};
                    text-transform: uppercase;
                    font-size: 3em;
                }
                h2 {
                    color: ${({ theme }) => theme.palette.center};
                    font-size: 2.1em;
                }

                h3 {
                    color: ${({ theme }) => theme.palette.dark_1};
                }

                p {
                    font-size: 0.9em;
                    line-height: 2em;
                    letter-spacing: 1.1px;
                }
            }

            &.right {
                padding: 2em;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }
    }
`

const Hero: React.FC<HeroProps> = ({ backgroundImage, secondaryImage, children }) => {
    return (
        <StyledHero className="container-fluid" backgroundImage={secondaryImage}>
            <div className="row">
                <div className="col-md-6 left text-center">{children}</div>
                <div className="col-md-6 right">
                    <img src={backgroundImage} alt="" />
                </div>
            </div>
        </StyledHero>
    )
}

// @ts-ignore
export default withTheme(Hero)
