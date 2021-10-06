import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import Img, { FluidObject } from 'gatsby-image'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled, { StyledProps } from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Form from '../components/shared/Form'

export const query = graphql`
    {
        prismicContact(lang: { eq: "fr-ca" }) {
            data {
                title {
                    raw
                }
                subtitle {
                    raw
                }
                background_image {
                    url
                    fluid {
                        src
                        srcSet
                        aspectRatio
                        sizes
                    }
                }
            }
        }
    }
`

interface ContactPageProps {
    data: {
        prismicContact: {
            data: {
                title: {
                    raw: RichTextBlock[]
                }
                subtitle: {
                    raw: RichTextBlock[]
                }
                background_image: {
                    url: string
                    fluid: FluidObject
                }
            }
        }
    }
}

const StyledContactPage = styled.div`
    background: ${({ theme }) => theme.palette.white};

    h3,
    h6 {
        margin: auto;
        width: 400px;
        color: ${({ theme }) => theme.palette.dark_1};
    }

    h3 {
        padding: 1em 0;
    }

    h6 {
        padding: 3em 0;
    }
`

export type StyledBannerProps = StyledProps<{
    bgImage?: string
    align?: 'left' | 'center' | 'right'
    justify?: 'top' | 'center' | 'bottom'
}>

const Banner = styled(BackgroundImage)<StyledBannerProps>`
    background: ${({ theme }) => theme.palette.center};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    padding: 7em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: ${({ theme }) => theme.fonts.secondaryFont};

    .title-section {
        width: 700px;
        background: ${({ theme }) => theme.paletteOpacity.dark('0.7')};
        padding: 0.7em;
        h3 {
            padding: 0.7em;
            font-size: 3em;
        }
        h6 {
            padding: 0 0 1.7em;
            font-size: 1.4em;
            line-height: 1.5em;
        }
        h3,
        h6 {
            color: ${({ theme }) => theme.palette.white};
        }
    }
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        width: 100%;
        box-sizing: border-box;
        padding: 0;

        .title-section {
            width: 100%;

            h1,
            h3,
            h6,
            .description {
                padding: 0;
                width: 100%;
            }

            .description {
                font-size: 1em;
                padding: 1em;
                text-align: justify;
            }
        }
    }
`

const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
    const { title, subtitle, background_image } = data.prismicContact.data

    return (
        <Layout>
            <SEO title="Contact" />
            <StyledContactPage className="contact flex flex-column">
                <Banner className="jumbotron" fluid={background_image.fluid} fadeIn>
                    <div className="title-section">
                        {title?.raw && <RichText render={title.raw} />}
                        {subtitle?.raw && (
                            <div className="description">
                                <RichText render={subtitle.raw} />
                            </div>
                        )}
                    </div>
                </Banner>
                <Form />
            </StyledContactPage>
        </Layout>
    )
}

export default ContactPage
