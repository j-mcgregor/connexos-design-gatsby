/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import styled, { StyledProps, withTheme } from 'styled-components'

import { SliceType } from '../../../../pages'

type CallToActionProps = StyledProps<{
    bgImage?: string
}>

export const StyledCallToActionSlice = styled.div<CallToActionProps>`
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: ${({ theme }) => theme.fonts.secondaryFont};
    background: ${({ theme }) => theme.palette.light} url(${({ bgImage }) => bgImage});
    background-size: cover;
    background-repeat: no-repeat;
    font-size: 1.2em;

    h2 {
        width: 400px;
        color: ${({ theme }) => theme.palette.center};
    }

    p {
        width: 400px;
        text-align: justify;
        color: ${({ theme }) => theme.palette.center};
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
        font-size: 1.2em;
        padding: 1em;

        h2,
        p {
            max-width: 100%;
        }
    }
`

const CallToActionSlice: React.FC<{ sliceType: SliceType }> = ({ sliceType }) => {
    return (
        <StyledCallToActionSlice
            key="call_to_action"
            className="call_to_action"
            bgImage={sliceType.primary.side_image.url}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <RichText render={sliceType.primary.title1.raw} />
                        <RichText render={sliceType.primary.subtitle.raw} />
                    </div>
                    <div className="col-md-6" />
                </div>
            </div>
        </StyledCallToActionSlice>
    )
}

// @ts-ignore
export default withTheme(CallToActionSlice)
