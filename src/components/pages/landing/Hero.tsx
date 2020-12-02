import BackgroundImage from 'gatsby-background-image'
import Img, { FluidObject } from 'gatsby-image'
import * as React from 'react'
import styled from 'styled-components'

import { flexCenterColumn } from '../../../utils/themeUtils'
import { theme } from '../../Layout'

export interface HeroProps {
    backgroundImage?: FluidObject
    secondaryImage?: FluidObject
    logo?: JSX.Element
    theme: typeof theme
}

const StyledHero = styled.div`
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
        ${flexCenterColumn};
    }

    .row {
        width: 100%;

        > div {
            height: 80vh;
            width: 50%;
            padding: 0;

            &.left {
                background: ${({ theme }) => theme.palette.light_2};
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
        <StyledHero className="container-fluid">
            <div className="row">
                <BackgroundImage fluid={secondaryImage} className="col-md-6 left text-center" fadeIn>
                    {children}
                </BackgroundImage>
                <div className="col-md-6 right">
                    <Img fluid={backgroundImage} alt="" />
                </div>
            </div>
        </StyledHero>
    )
}

// @ts-ignore
export default Hero
