import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import Form from '../components/shared/Form'
import styled from 'styled-components'

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
            }
        }
    }
}

const StyledContact = styled.div`
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

const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
    const { title, subtitle } = data.prismicContact.data

    return (
        <Layout>
            <SEO title="Contact" />
            <StyledContact className="contact flex flex-column">
                <div className="jumbotron text-center">
                    {title?.raw && <RichText render={title.raw} />}
                    {subtitle?.raw && (
                        <div className="description">
                            <RichText render={subtitle.raw} />
                        </div>
                    )}
                </div>
                <Form />
            </StyledContact>
        </Layout>
    )
}

export default ContactPage
