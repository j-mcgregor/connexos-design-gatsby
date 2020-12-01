import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import { StyledBannerProps } from '../pages/contact'

interface GeneralProps {
    id: string
    dataRaw: {
        title: RichTextBlock[]
        description: RichTextBlock[]
    }
}

interface GeneralPageType {
    data: { prismicGeneralInfo: GeneralProps }
}

const GeneralPage = styled.div`
    /* height: 60vh; */
    .row {
        margin-right: 0;
        margin-left: 0;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
        height: auto;

        &.container-fluid {
            padding-left: 0;
            padding-right: 0;
        }
    }
`

const GeneralHeader = styled.div<StyledBannerProps>`
    box-sizing: border-box;
    width: 100%;
    /* height: 60vh; */
    background: url(${({ bgImage }) => bgImage}) no-repeat center center;
    background-size: contain;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: ${({ theme }) => theme.fonts.secondaryFont};
    padding: 0.7em 4em;

    .title-section {
        width: 100%;
        background: ${({ theme }) => theme.paletteOpacity.dark('0.7')};

        h1 {
            padding: 0.2em 2em;
            font-size: 3em;
            text-transform: uppercase;
            color: ${({ theme }) => theme.palette.light};
        }
    }
    p {
        text-align: justify;
        line-height: 2em;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
        height: auto;
        background-size: cover;

        p {
            font-size: 1em;
            padding: 1.5em;
            line-height: 2em;
        }
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 0;

        .title-section {
            width: 100%;
            box-sizing: border-box;

            h1,
            h3,
            h6,
            .description {
                padding: 0;
                width: 100%;
            }
        }
    }
`

const General: React.FC<GeneralPageType> = ({ data }) => {
    const { dataRaw: general } = data.prismicGeneralInfo

    return (
        <Layout>
            <GeneralPage className="container">
                <div className="row">
                    <GeneralHeader className="col-md-12">
                        <div className="title-section">
                            {general.title && <RichText render={general.title} />}
                        </div>
                    </GeneralHeader>
                    <GeneralHeader className="col-md-12 my5">
                        {general.description && <RichText render={general.description} />}
                    </GeneralHeader>
                </div>
            </GeneralPage>
        </Layout>
    )
}

export const query = graphql`
    query General($uid: String) {
        prismicGeneralInfo(uid: { eq: $uid }) {
            id
            dataRaw
        }
    }
`

export default General
