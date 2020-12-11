import { graphql, Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import Img, { FixedObject, FluidObject } from 'gatsby-image'
import * as moment from 'moment'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled, { css } from 'styled-components'

import Layout, { theme } from '../components/Layout'
import { Card, Cards } from '../components/styled-components/Card'
import { ProductsPageNodeProps } from '../types/enums'

interface ItemPageProps {
    id: string
    uid: string
    first_publication_date: string
    last_publication_date: string
    data: {
        title: {
            raw: RichTextBlock[]
        }
        time_to_make: string
        product_type: 'knits' | 'upcycling' | 'tricots'
        price: string
        main_image: {
            url: string
            fixed: FixedObject
            fluid: FluidObject
        }
        images: [
            {
                caption: string
                image: {
                    url: string
                }
            }
        ]
        description: {
            raw: RichTextBlock[]
        }
    }
}
export interface ItemPageType {
    nodes: ItemPageProps[]
}

interface ProductPageType {
    data: { prismicProduct: ProductsPageNodeProps; allPrismicItem: ItemPageType }
    pageContext: any
}

const ProductPage = styled.div`
    height: 60vh;
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

const shared = css`
    box-sizing: border-box;
    width: 100%;
    height: 60vh;
    background-size: contain;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: ${({ theme }) => theme.fonts.secondaryFont};
    padding: 0.7em 4em;

    .title-section {
        background: ${({ theme }) => theme.paletteOpacity.dark('0.7')};

        h1 {
            padding: 0.2em 2em;
            font-size: 3em;
            text-transform: uppercase;
            color: ${({ theme }) => theme.palette.light};
        }
    }

    p {
        font-size: 1.5em;
        padding: 3em;
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

const ProductHeader = styled.div`
    ${shared}
`

const ProductHeaderWithImage = styled(BackgroundImage)`
    ${shared}
`

const Product: React.FC<ProductPageType> = ({ data, pageContext }) => {
    const { data: product } = data.prismicProduct
    const { nodes } = data.allPrismicItem

    const [width, setWidth] = React.useState<number>()
    const [loaded, setLoaded] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (typeof window === 'undefined') return

        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        setWidth(window.innerWidth)
        setLoaded(true)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <Layout>
            <ProductPage className="container-fluid">
                <div className="row">
                    <ProductHeaderWithImage className="col-md-6" fluid={product.main_image.fluid}>
                        <div className="title-section">
                            {product.title && <RichText render={product.title.raw} />}
                        </div>
                    </ProductHeaderWithImage>
                    <ProductHeader className="col-md-6 p3">
                        {product.description && <RichText render={product.description.raw} />}
                    </ProductHeader>
                </div>
            </ProductPage>
            <div className="row">
                <Cards grid>
                    {nodes
                        ?.sort((a, b) => {
                            return (
                                moment(b.last_publication_date).unix() -
                                moment(a.last_publication_date).unix()
                            )
                        })
                        .map(n => {
                            return (
                                <Link to={`/products/${pageContext.uid}/${n.id}`} key={n.uid}>
                                    <Card>
                                        {loaded && width && width < theme.breakpoints.sm ? (
                                            <Img fluid={n.data.main_image.fluid} alt="" />
                                        ) : (
                                            <Img fixed={n.data.main_image.fixed} alt="" />
                                        )}

                                        <div className="card-footer">
                                            <RichText render={n.data.title.raw} />
                                            <div className="price">${n.data.price}</div>
                                        </div>
                                    </Card>
                                </Link>
                            )
                        })}
                </Cards>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query Product($id: String, $uid: String) {
        prismicProduct(id: { eq: $id }) {
            id
            data {
                title {
                    raw
                }
                description {
                    raw
                }
                main_image {
                    url
                    alt
                    fluid {
                        src
                        srcSet
                        aspectRatio
                        base64
                    }
                }
            }
        }
        allPrismicItem(filter: { data: { product_type: { eq: $uid } } }) {
            nodes {
                id
                uid
                last_publication_date
                data {
                    title {
                        raw
                    }
                    time_to_make
                    product_type
                    price
                    main_image {
                        url
                        fixed(width: 230, height: 230) {
                            src
                            srcSet
                            width
                            height
                            base64
                        }
                        fluid {
                            src
                            srcSet
                            aspectRatio
                            base64
                        }
                    }
                    images {
                        caption
                        image {
                            url
                        }
                    }
                    description {
                        raw
                    }
                }
            }
        }
    }
`

export default Product
