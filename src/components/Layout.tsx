import '../assets/stylesheets/main.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'flexboxgrid2/flexboxgrid2.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import Footer from './shared/Footer'
import Navbar from './shared/Navbar'

config.autoAddCss = false

export const theme = {
    palette: {
        black: 'rgb(17, 17, 17)',
        dark: 'rgb(57, 49, 29)',
        dark_1: 'rgb(55, 37, 73)',
        dark_2: 'rgb(55, 37, 73)',
        center: 'rgb(126, 116, 116)',
        light_2: 'rgb(214, 194, 194)',
        light_1: 'rgb(255, 188, 181)',
        light: 'rgb(255, 221, 147)',
        white: 'rgb(255, 255, 255)',
    },
    paletteOpacity: {
        black: (a: string) => `rgba(17, 17, 17, ${a})`,
        dark: (a: string) => `rgba(26, 20, 35, ${a})`,
        dark_1: (a: string) => `rgba(55, 37, 73, ${a})`,
        dark_2: (a: string) => `rgba(55, 37, 73, ${a})`,
        center: (a: string) => `rgba(183, 93, 105, ${a})`,
        light_2: (a: string) => `rgba(234, 205, 194, ${a})`,
        light_1: (a: string) => `rgba(255, 188, 181, ${a})`,
        light: (a: string) => `rgba(245, 243, 240, ${a})`,
        white: (a: string) => `rgba(255, 255, 255, ${a})`,
    },
    breakpoints: {
        xl: 1200,
        lg: 992,
        md: 768,
        sm: 576,
    },
    fonts: {
        primaryFont:
            "'FiraSans-Regular', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        secondaryFont:
            "'Aleo-Light', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    },
}

const Layout = (props: LayoutProps) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
                prismicContact {
                    data {
                        title {
                            raw
                        }
                        subtitle {
                            raw
                        }
                        social_links {
                            url {
                                url
                            }
                            name
                        }
                    }
                }
                prismicHomeBodyProducts {
                    id
                    items {
                        label
                        product_link {
                            link_type
                            uid
                            url
                        }
                    }
                }
                allPrismicProduct {
                    nodes {
                        id
                        uid
                    }
                }

                file(
                    sourceInstanceName: { eq: "images" }
                    relativePath: { eq: "connexos-design-logo-dark.png" }
                ) {
                    publicURL
                }
            }
        `}
        render={data => {
            return (
                <ThemeProvider theme={theme}>
                    <Navbar
                        icon={data.file.publicURL}
                        products={data.allPrismicProduct.nodes}
                        social={data?.prismicContact?.data?.social_links}
                    />
                    <main>{props.children}</main>
                    <Footer icon={data.file.publicURL} />
                </ThemeProvider>
            )
        }}
    />
)

interface LayoutProps {
    children: unknown
}

export default Layout
