import { faEtsy } from '@fortawesome/free-brands-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faShippingFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql, Link } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import { Card, Cards } from '../components/styled-components/Card'
import { Button } from '../components/styled-components/Link'
import { StyledBannerProps } from '../pages/contact'
import { ItemPageType } from './Product'

interface ItemPageProps {
    uid: string
    data: {
        title: {
            raw: RichTextBlock[]
        }
        time_to_make: string
        shipping: string
        product_type: 'knits' | 'upcycling'
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
        etsy_link: {
            raw: RichTextBlock[]
            url: string
        }
    }
}

interface ProductPageType {
    data: { prismicItem: ItemPageProps; allPrismicItem: ItemPageType }
    pageContext: any
}

const ItemLayout = styled.div`
    h2 {
        color: ${({ theme }) => theme.palette.center};
        font-family: 'Raleway-Light', Times, serif;
        font-size: 2.1em;
    }
`

const ItemHeader = styled.div<StyledBannerProps>`
    height: auto;
    background: url(${({ bgImage }) => bgImage}) no-repeat center center;
    display: flex;
    align-items: ${({ align }) =>
        align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'};
    justify-content: ${({ justify }) =>
        justify === 'top' ? 'flex-start' : justify === 'bottom' ? 'flex-end' : 'center'};
    flex-direction: column;
    font-family: 'Raleway-Thin';
    padding-top: 0;

    h2 {
        margin-top: 10px;
    }

    img {
        width: 400px;
        height: 400px;
        object-fit: cover;
    }

    .img-thumbs {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        width: 400px;
        img {
            margin: 5px 3px;
            text-align: left;
            width: 60px;
            height: 60px;
            object-fit: cover;

            &:hover {
                cursor: pointer;
            }
        }
        img:first-child {
            margin-left: 0;
        }
    }

    .price {
        font-size: 3em;
        margin-bottom: 1em;
    }

    .duration,
    .shipping {
        margin: 5px 0;
    }
`

const Item: React.FC<ProductPageType> = ({ data }) => {
    const { data: item } = data.prismicItem
    const { nodes: allItems } = data.allPrismicItem

    const [mainImg, setMainImg] = React.useState('')

    React.useEffect(() => {
        setMainImg(item.main_image.url)
    }, [])

    return (
        <Layout>
            <ItemLayout className="container-fluid">
                <div className="row py4">
                    <ItemHeader className="col-md-6" align="right" justify="top">
                        <img src={mainImg} alt="" />
                        <div className="img-thumbs">
                            <img
                                src={item.main_image.url}
                                alt=""
                                onClick={() => setMainImg(item.main_image.url)}
                            />
                            {item.images?.length &&
                                item.images.map((img, i) => {
                                    return (
                                        img.image.url && (
                                            <img
                                                key={i}
                                                src={img.image.url}
                                                alt=""
                                                onClick={() => setMainImg(img.image.url)}
                                            />
                                        )
                                    )
                                })}
                        </div>
                    </ItemHeader>
                    <ItemHeader className="col-md-6 p3" align="left" justify="top">
                        <RichText render={item.title.raw} />
                        <div className="price">${item.price}</div>
                        <div className="duration">
                            <FontAwesomeIcon icon={faClock} className="mr1" />
                            {item.time_to_make}
                        </div>
                        {item.shipping && (
                            <div className="shipping">
                                <FontAwesomeIcon icon={faShippingFast} className="mr1" />
                                {item.shipping}
                            </div>
                        )}
                        <RichText render={item.description.raw} />
                        <Button size="sm" to={item.etsy_link.url}>
                            <FontAwesomeIcon icon={faEtsy} className="mr1" />
                            BUY ON ETSY
                        </Button>
                    </ItemHeader>
                </div>
                <div className="row">
                    <div className="container">
                        <h2 className="p1">Related Items</h2>
                        <Cards grid>
                            {allItems?.map(n => {
                                return (
                                    <Link to={`/products/${n.data.product_type}/${n.id}`} key={n.uid}>
                                        <Card>
                                            <img src={n.data.main_image.url} alt="" />
                                            <div className="card-footer">
                                                <RichText render={n.data.title.raw} />
                                                <div className="price">CA${n.data.price}</div>
                                            </div>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </Cards>
                    </div>
                </div>
            </ItemLayout>
        </Layout>
    )
}

export const query = graphql`
    query Item($id: String, $product_type: String) {
        prismicItem(id: { eq: $id }) {
            uid
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
                shipping
                etsy_link {
                    raw
                    url
                }
            }
        }
        allPrismicItem(filter: { data: { product_type: { eq: $product_type } } }) {
            nodes {
                id
                uid
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

export default Item
