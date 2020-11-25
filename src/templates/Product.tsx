import { graphql, Link } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'
import * as moment from 'moment'

import Layout from '../components/Layout'
import { Card, Cards } from '../components/styled-components/Card'
import { StyledBannerProps } from '../pages/contact'
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

const S_ProductPage = styled.div`
    height: 60vh;

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
        height: auto;
    }
`

const S_ProductHeader = styled.div<StyledBannerProps>`
    height: 60vh;
    background: url(${({ bgImage }) => bgImage}) no-repeat center center;
    background-size: contain;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: ${({ theme }) => theme.fonts.primaryFont};
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
`

const Product: React.FC<ProductPageType> = ({ data, pageContext }) => {
    const { data: product } = data.prismicProduct
    const { nodes } = data.allPrismicItem

    return (
        <Layout>
            <S_ProductPage className="container-fluid">
                <div className="row">
                    <S_ProductHeader className="col-md-6" bgImage={product.main_image.url}>
                        <div className="title-section">
                            {product.title && <RichText render={product.title.raw} />}
                        </div>
                    </S_ProductHeader>
                    <S_ProductHeader className="col-md-6 p3">
                        {product.description && <RichText render={product.description.raw} />}
                    </S_ProductHeader>
                </div>
            </S_ProductPage>
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
                                        <img src={n.data.main_image.url} alt="" />
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
