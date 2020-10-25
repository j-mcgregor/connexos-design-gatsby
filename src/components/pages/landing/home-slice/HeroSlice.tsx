import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import { SliceType } from '../../../../pages'
import { Button } from '../../../styled-components/Link'

export const StyledHeroSlice = styled.div<{ backgroundImage: string }>`
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Raleway-Light';
    background: url(${({ backgroundImage }) => backgroundImage}) fixed;

    .text-block {
        background: ${({ theme }) => theme.paletteOpacity.light('0.7')};
        padding: 3em 6em;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    h1 {
        font-family: Georgia, 'Times New Roman', Times, serif;
    }

    p {
        width: 400px;
        text-align: justify;
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
                    <Button
                        to={sliceType.items[0].button_link.url}
                        target="_blank"
                        bgColor={sliceType.items[0].color}
                        size="md"
                    >
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
