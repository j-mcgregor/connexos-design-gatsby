import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import Layout from '../components/Layout'
import Banner from '../components/pages/landing/Banner'
import Hero from '../components/pages/landing/Hero'
import { CallToActionSlice } from '../components/pages/landing/home-slice/CallToActionSlice'
import HeroSlice from '../components/pages/landing/home-slice/HeroSlice'
import { ProductsSlice } from '../components/pages/landing/home-slice/ProductsSlice'
import SEO from '../components/SEO'
import { Card } from '../components/styled-components/Card'
import { Button } from '../components/styled-components/Link'

export const query = graphql`
    query IndexPageQuery {
        prismicLanding {
            data {
                primary_text {
                    raw
                }
                secondary_text {
                    raw
                }
                about {
                    raw
                }
                background_image {
                    url
                }
            }
        }

        prismicHome {
            data {
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
                background_image {
                    url
                }
                title {
                    raw
                }
            }
        }

        file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "connexos-design-logo-light.png" }) {
            publicURL
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
}

export interface SliceType {
    slice_type: string
    primary: PrimaryType
    items: ItemType[]
}

interface IndexPageProps {
    data: {
        prismicLanding: {
            data: {
                primary_text: {
                    raw: RichTextBlock[]
                }
                secondary_text: {
                    raw: RichTextBlock[]
                }
                about: {
                    raw: RichTextBlock[]
                }
                background_image: {
                    url: string
                }
            }
        }

        prismicHome: {
            data: {
                title: {
                    raw: RichTextBlock[]
                }
                body: SliceType[]
            }
        }
        file: {
            publicURL: string
        }
    }
}

const makeSlice = (sliceType: SliceType) => {
    switch (sliceType.slice_type) {
        case 'hero_section':
            return <HeroSlice key="hero_section" sliceType={sliceType} />
        case 'call_to_action':
            return (
                <CallToActionSlice key="call_to_action" className="call_to_action">
                    <RichText render={sliceType.primary.title1.raw} />
                    <RichText render={sliceType.primary.subtitle.raw} />
                    <div className="flex flex-center">
                        {sliceType.items?.length &&
                            sliceType.items.map(s => (
                                <Button key={s.page} to={s.call_to_action.url} target="_blank">
                                    {s.page}
                                </Button>
                            ))}
                    </div>
                </CallToActionSlice>
            )
        case 'products':
            return (
                <ProductsSlice key="products" className="products">
                    <RichText render={sliceType.primary.title1.raw} />
                    <RichText render={sliceType.primary.description.raw} />
                    <div className="container flex flex-center">
                        {sliceType.items?.length &&
                            sliceType.items.map(s => (
                                <Link
                                    key={s.page}
                                    to={s.product_link?.url}
                                    target="_blank"
                                    className="text-center"
                                >
                                    <Card>
                                        <img src={s.product_image.url} alt="" />
                                        <h3>{s.label}</h3>
                                    </Card>
                                </Link>
                            ))}
                    </div>
                </ProductsSlice>
            )
        default:
            return <div key="no-type" />
    }
}

const IndexPage: React.FC<IndexPageProps> = ({ data: { prismicLanding, file, prismicHome } }) => {
    const { primary_text, secondary_text, about, background_image } = prismicLanding.data

    const logo = file?.publicURL && <img src={file.publicURL} alt="Logo" />

    const slices = prismicHome.data.body.map(s => makeSlice(s))

    return (
        <Layout>
            <SEO title="Home" />
            {background_image?.url && (
                <>
                    <Hero logo={logo} backgroundImage={background_image.url}>
                        {secondary_text && <RichText render={secondary_text.raw} />}
                        {primary_text && <RichText render={primary_text.raw} />}
                        {about && <RichText render={about.raw} />}
                    </Hero>
                </>
            )}
            {slices}
        </Layout>
    )
}

// @ts-ignore
export default withTheme(IndexPage)
