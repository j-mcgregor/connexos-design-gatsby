import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import Layout, { theme } from '../components/Layout'
import SEO from '../components/SEO'

export const query = graphql`
    {
        prismicAbout {
            data {
                title {
                    raw
                }
                main_image {
                    url
                    alt
                    dimensions {
                        width
                        height
                    }
                }
                description {
                    raw
                }
            }
        }
    }
`

interface AboutPageProps {
    data: {
        prismicAbout: {
            data: {
                title: {
                    raw: RichTextBlock[]
                }
                main_image: {
                    alt: string
                    url: string
                }
                description: {
                    raw: RichTextBlock[]
                }
            }
        }
    }
}

interface StyledAboutProps {
    theme: typeof theme
}
const StyledAbout = styled.div<StyledAboutProps>`
    background: ${({ theme }) => theme.palette.white};

    h1 {
        color: ${({ theme }) => theme.palette.center};
        font-family: ${({ theme }) => theme.fonts.primaryFont};
        font-size: 3em;
    }

    .description {
        width: 700px;
        margin: auto;

        p {
            line-height: 2.5em;
        }

        img {
            width: 100%;
        }
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
        width: 100%;
        padding: 2em;
        .description {
            width: 100%;
        }
    }
`

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
    const { title, description, main_image } = data.prismicAbout.data

    return (
        <Layout>
            <SEO title="About" />
            <StyledAbout className="container text-center">
                {title?.raw && <RichText render={title.raw} />}
                {description?.raw && (
                    <div className="description text-justify my3">
                        <RichText render={description.raw} />
                        {main_image && <img src={main_image.url} alt="Logo" className="my3" />}
                    </div>
                )}
            </StyledAbout>
        </Layout>
    )
}

// @ts-ignore
export default withTheme(AboutPage)
