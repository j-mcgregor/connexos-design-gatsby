import 'flexboxgrid2/flexboxgrid2.css'
import '../assets/stylesheets/main.scss'

import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import Navbar from './shared/Navbar'
import Footer from './shared/Footer'

export const theme = {
    palette: {
        black: 'rgb(17, 17, 17)',
        dark: 'rgb(26, 20, 35)',
        dark_1: 'rgb(55, 37, 73)',
        dark_2: 'rgb(55, 37, 73)',
        center: 'rgb(183, 93, 105)',
        light_2: 'rgb(234, 205, 194)',
        light_1: 'rgb(255, 188, 181)',
        light: 'rgb(245, 243, 240)',
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
                    <Navbar icon={data.file.publicURL} products={data.allPrismicProduct.nodes} />
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
