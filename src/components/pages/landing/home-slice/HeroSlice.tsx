import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BackgroundImage from 'gatsby-background-image'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import { SliceType } from '../../../../pages'
import { flexCenterColumn } from '../../../../utils/themeUtils'
import { Button } from '../../../styled-components/Link'

export const StyledHeroSlice = styled(BackgroundImage)`
    height: 70vh;
    ${flexCenterColumn}
    font-family: ${({ theme }) => theme.fonts.secondaryFont};
    font-size: 1.2em;
    box-sizing: border-box;

    .text-block {
        background: ${({ theme }) => theme.paletteOpacity.light('0.7')};
        padding: 3em 6em;
        ${flexCenterColumn}
    }

    h1 {
        color: ${({ theme }) => theme.palette.center};
    }

    p {
        color: ${({ theme }) => theme.palette.center};
        width: 400px;
        text-align: center;        
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        width: 100%;
        height: auto;
        text-align: center;

        .text-block {
            width: 100%;
            padding: 2em 15px;

            p {
                width: 100%;
            }
        }
    }
`

const HeroSlice: React.FC<{ sliceType: SliceType }> = ({ sliceType }) => {
    return (
        <StyledHeroSlice
            key="hero_section"
            className="hero_section"
            fluid={sliceType.primary.background_image1.fluid}
            fadeIn
        >
            <div className="text-block">
                <RichText render={sliceType.primary.title1.raw} />
                <RichText render={sliceType.primary.paragraph.raw} />
                {sliceType.items?.length && (
                    <Button to={sliceType.items[0].button_link.url} target="_blank" size="md">
                        <FontAwesomeIcon icon={faShoppingCart} className="mr1" />
                        {sliceType.items[0].button_label}
                    </Button>
                )}
            </div>
        </StyledHeroSlice>
    )
}

// @ts-ignore
export default withTheme(HeroSlice)
