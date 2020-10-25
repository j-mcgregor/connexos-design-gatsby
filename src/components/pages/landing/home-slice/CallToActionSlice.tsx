/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import styled, { StyledProps, withTheme } from 'styled-components'

import { SliceType } from '../../../../pages'
import { Button } from '../../../styled-components/Link'

type CallToActionProps = StyledProps<{
    bgImage?: string
}>

export const StyledCallToActionSlice = styled.div<CallToActionProps>`
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Raleway-Light';
    background: ${({ theme }) => theme.palette.light} url(${({ bgImage }) => bgImage});
    background-size: cover;
    background-repeat: no-repeat;

    h2 {
        width: 400px;
    }

    p {
        width: 400px;
        text-align: justify;
    }

    .btn-group {
        padding: 0;
    }

    img {
        margin: auto;
        text-align: center;
        width: 100%;
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
                    <div className="col-md-6">
                        <RichText render={sliceType.primary.title1.raw} />
                        <RichText render={sliceType.primary.subtitle.raw} />
                        <div className="btn-group flex flex-align-center flex-justify-start">
                            {sliceType.items?.length &&
                                sliceType.items.map(s => (
                                    <Button
                                        key={s.page}
                                        to={s.call_to_action.url}
                                        target="_blank"
                                        size="xs"
                                        className="mr1"
                                    >
                                        {s.page}
                                    </Button>
                                ))}
                        </div>
                    </div>
                    <div className="col-md-6" />
                </div>
            </div>
        </StyledCallToActionSlice>
    )
}

// @ts-ignore
export default withTheme(CallToActionSlice)
