import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'

import { SliceType } from '../../../../pages'
import { Button } from '../../../styled-components/Link'

export const StyledHeroSlice = styled.div`
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Raleway-Light';

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
        <StyledHeroSlice key="hero_section" className="hero_section">
            <RichText render={sliceType.primary.title1.raw} />
            <RichText render={sliceType.primary.paragraph.raw} />
            {sliceType.items?.length && (
                <Button
                    to={sliceType.items[0].button_link.url}
                    target="_blank"
                    bgColor={sliceType.items[0].color}
                >
                    {sliceType.items[0].button_label}
                </Button>
            )}
        </StyledHeroSlice>
    )
}

export default HeroSlice
