/* eslint-disable @typescript-eslint/no-explicit-any */
import BackgroundImage from 'gatsby-background-image'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'

import { SliceType } from '../../../../pages'

export const StyledCallToActionSlice = styled(BackgroundImage)`
    height: 90vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    font-family: ${({ theme }) => theme.fonts.secondaryFont};
    background: ${({ theme }) => theme.palette.light};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    font-size: 1.2em;
    box-sizing: border-box;
    color: ${({ theme }) => theme.palette.light};
    padding: 3em;

    .text-block {
        padding: 2em;
        width: 500px;
        box-sizing: border-box;
        h2 {
            color: ${({ theme }) => theme.palette.center};
        }

        p {
            text-align: justify;
            color: ${({ theme }) => theme.palette.center};
        }
    }

    .btn-group {
        padding: 0;
    }

    img {
        margin: auto;
        text-align: center;
        width: 100%;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        width: 100%;
        height: auto;
        font-size: 1.2em;
        padding: 1em;
        background-position: right 0;

        .text-block {
            width: 100%;
            h2,
            p {
                width: 100%;
            }
        }
    }
`

const CallToActionSlice: React.FC<{ sliceType: SliceType }> = ({ sliceType }) => {
    return (
        <StyledCallToActionSlice
            key="call_to_action"
            className="call_to_action"
            fluid={sliceType.primary.side_image.fluid}
        >
            <div className="text-block">
                <RichText render={sliceType.primary.title1.raw} />
                <RichText render={sliceType.primary.subtitle.raw} />
            </div>
        </StyledCallToActionSlice>
    )
}

// @ts-ignore
export default CallToActionSlice
