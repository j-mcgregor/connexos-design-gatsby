import { graphql } from 'gatsby'
import { FixedObject, FluidObject } from 'gatsby-image'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'

import Layout from '../components/Layout'
import Hero from '../components/pages/landing/Hero'
import HeroSlice from '../components/pages/landing/home-slice/HeroSlice'
import ProductsSlice from '../components/pages/landing/home-slice/ProductsSlice'
import SEO from '../components/SEO'
import { ProductsPageNodeProps } from '../types/enums'

export const query = graphql`
    query IndexPageQuery {
        prismicHome {
            data {
                background_image {
                    url
                    fluid {
                        src
                        srcSet
                        aspectRatio
                        sizes
                    }
                }
                secondary_image {
                    url
                    fluid {
                        src
                        srcSet
                        aspectRatio
                        sizes
                    }
                }
                title {
                    raw
                }
                subtitle {
                    raw
                }
                about {
                    raw
                }
                body {
                    ... on PrismicHomeBodyProducts {
                        primary {
                            title1 {
                                raw
                            }
                            description {
                                raw
                            }
                        }
                        items {
                            product_image {
                                url(imgixParams: { width: 300, height: 300 })
                            }
                            label
                        }
                        slice_type
                    }
                    ... on PrismicHomeBodyCallToAction {
                        slice_type
                        primary {
                            title1 {
                                raw
                            }
                            subtitle {
                                raw
                            }
                            side_image {
                                url
                                fluid {
                                    src
                                    srcSet
                                    aspectRatio
                                    sizes
                                }
                            }
                        }
                        items {
                            call_to_action {
                                url
                            }
                            page
                        }
                    }
                    ... on PrismicHomeBodyHeroSection {
                        slice_type
                        primary {
                            title1 {
                                raw
                            }
                            paragraph {
                                raw
                            }
                            background_image1 {
                                alt
                                url
                                fluid {
                                    src
                                    srcSet
                                    aspectRatio
                                    sizes
                                }
                            }
                        }
                        items {
                            color
                            button_link {
                                url
                            }
                            button_label
                        }
                    }
                }
            }
        }
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
                            sizes
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

interface ItemType {
    button_label?: string
    color?: string
    page?: string
    label?: string
    product_link?: {
        url: string
        document?: {
            id?: string
            url?: string
        }
    }
    product_image?: {
        url?: string
        fixed: FixedObject
    }
    button_link?: {
        url?: string
    }
    call_to_action?: {
        url?: string
    }
}

interface PrimaryType {
    subtitle?: {
        raw: RichTextBlock[]
    }
    description?: {
        raw: RichTextBlock[]
    }
    paragraph?: {
        raw: RichTextBlock[]
    }
    title1?: {
        raw: RichTextBlock[]
    }
    background_image1?: {
        alt?: string
        url?: string
        fluid: FluidObject
    }
    side_image?: {
        url: string
        fluid: FluidObject
    }
}

export interface SliceType {
    slice_type: string
    primary: PrimaryType
    items: ItemType[]
}

interface IndexPageProps {
    data: {
        allPrismicProduct: {
            nodes: ProductsPageNodeProps[]
        }
        prismicHome: {
            data: {
                title: {
                    raw: RichTextBlock[]
                }
                subtitle: {
                    raw: RichTextBlock[]
                }
                about: {
                    raw: RichTextBlock[]
                }
                background_image: {
                    url: string
                    fluid: FluidObject
                }
                secondary_image: {
                    url: string
                    fluid: FluidObject
                }
                body: SliceType[]
            }
        }
    }
}

const makeSlice = (sliceType: SliceType) => {
    if (sliceType) {
        switch (sliceType.slice_type) {
            case 'hero_section':
                return <HeroSlice key="hero_section" sliceType={sliceType} />
            // case 'call_to_action':
            //     return <CallToActionSlice key="call_to_action" sliceType={sliceType} />
            default:
                return <div key="no-type" />
        }
    }
}

const IndexPage: React.FC<IndexPageProps> = ({ data: { prismicHome, allPrismicProduct } }) => {
    const { title, subtitle, about, background_image, secondary_image } = prismicHome.data
    const { nodes } = allPrismicProduct

    const slices = prismicHome.data?.body?.map(s => makeSlice(s)) ?? []

    return (
        <Layout>
            <SEO title="Home" imageUrl={background_image.url} />
            {background_image?.url && (
                <Hero backgroundImage={background_image.fluid} secondaryImage={secondary_image.fluid}>
                    <div className="text-block">
                        {subtitle && <RichText render={subtitle.raw} />}
                        {title && <RichText render={title.raw} />}
                        {about && <RichText render={about.raw} />}
                    </div>
                </Hero>
            )}
            {slices}
            <ProductsSlice key="products" products={nodes} />
        </Layout>
    )
}

// @ts-ignore
export default IndexPage
