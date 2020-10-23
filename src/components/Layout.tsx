import '../assets/stylesheets/main.scss'
import 'flexboxgrid2/flexboxgrid2.css'

import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import Navbar from './shared/Navbar'

export const theme = {
    palette: {
        black: '#111',
        dark: '#1A1423',
        dark_1: '#372549',
        dark_2: '#372549',
        center: '#B75D69',
        light_2: '#EACDC2',
        light_1: '#FFBCB5',
        light: '#f5f3f0',
        white: '#fff',
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
                prismicGallery {
                    data {
                        body {
                            ... on PrismicGalleryBodyImageGallery {
                                id
                                primary {
                                    album {
                                        text
                                    }
                                }
                            }
                        }
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
                    <Navbar icon={data.file.publicURL} />
                    <main>{props.children}</main>
                </ThemeProvider>
            )
        }}
    />
)

interface LayoutProps {
    children: unknown
}

export default Layout
