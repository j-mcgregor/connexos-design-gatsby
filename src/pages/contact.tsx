import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import Form from '../components/shared/Form'
import styled, { StyledProps } from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

export const query = graphql`
    {
        prismicContact {
            data {
                title {
                    raw
                }
                subtitle {
                    raw
                }
                background_image {
                    url
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
                }
            }
        }
    }
}

const S_Contact = styled.div`
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

export type StyledBannerProps = StyledProps<{ bgImage?: string }>

const S_Banner = styled.div<StyledBannerProps>`
    background: ${({ theme }) => theme.palette.center} url(${({ bgImage }) => bgImage}) no-repeat center
        center;
    background-size: cover;
    padding: 7em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Raleway-Thin';

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
        }
        h3,
        h6 {
            color: ${({ theme }) => theme.palette.white};
        }
    }
`

const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
    const { title, subtitle, background_image } = data.prismicContact.data

    return (
        <Layout>
            <SEO title="Contact" />
            <S_Contact className="contact flex flex-column">
                <S_Banner className="jumbotron" bgImage={background_image.url}>
                    <div className="title-section">
                        {title?.raw && <RichText render={title.raw} />}
                        {subtitle?.raw && (
                            <div className="description">
                                <RichText render={subtitle.raw} />
                            </div>
                        )}
                    </div>
                </S_Banner>
                <Form />
            </S_Contact>
        </Layout>
    )
}

export default ContactPage
