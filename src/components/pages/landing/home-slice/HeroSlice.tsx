import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import { SliceType } from '../../../../pages'
import { flexCenterColumn } from '../../../../utils/themeUtils'
import { theme } from '../../../Layout'
import { Button } from '../../../styled-components/Link'

export const StyledHeroSlice = styled.div<{ backgroundImage: string }>`
    height: 70vh;
    ${flexCenterColumn}
    font-family: ${({ theme }) => theme.fonts.secondaryFont};
    background: url(${({ backgroundImage }) => backgroundImage}) fixed;
    font-size: 1.2em;

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
        text-align: justify;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        .text-block {
            padding: 2em;
            height: 100%;
            font-size: 1.3em;
        }

        p {
            width: 100%;
        }
    }
`

const HeroSlice: React.FC<{ sliceType: SliceType }> = ({ sliceType }) => {
    return (
        <StyledHeroSlice
            key="hero_section"
            className="hero_section"
            backgroundImage={sliceType.primary.background_image1.url}
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
