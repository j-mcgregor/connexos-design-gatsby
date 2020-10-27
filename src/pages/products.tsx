import { graphql, Link } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import Layout, { theme } from '../components/Layout'
import SEO from '../components/SEO'
import { Card } from '../components/styled-components/Card'

export const query = graphql`
    {
        allPrismicProduct {
            nodes {
                id
                uid
                data {
                    title {
                        raw
                    }
                    main_image {
                        url
                    }
                    description {
                        raw
                    }
                }
            }
        }
    }
`

export interface ProductsPageNodeProps {
    id: string
    uid: string
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

export interface ProductsPageProps {
    data: {
        allPrismicProduct: {
            nodes: ProductsPageNodeProps[]
        }
    }
}

const AboutPage: React.FC<ProductsPageProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="About" />
            <div className="container text-center flex flex-row flex-center">
                {data.allPrismicProduct.nodes.map(node => (
                    <Link key={`${node.uid}`} to={`/products/${node.uid}`}>
                        <Card>
                            {node.data.main_image && (
                                <img src={node.data.main_image.url} alt="Logo" className="my3" />
                            )}
                            {node.data.title?.raw && <RichText render={node.data.title.raw} />}
                            {node.data.description?.raw && (
                                <div className="description text-justify my3">
                                    <RichText render={node.data.description.raw} />
                                </div>
                            )}
                        </Card>
                    </Link>
                ))}
            </div>
        </Layout>
    )
}

// @ts-ignore
export default withTheme(AboutPage)
