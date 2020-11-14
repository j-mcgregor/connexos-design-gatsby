/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
    siteMetadata: {
        title: `Connexos Design`,
        description: `Real people. Real photos.`,
        author: `@jmcgregor`,
        siteUrl: 'https://connexos-design.netlify.app/',
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `fonts`,
                path: `${__dirname}/src/assets/fonts`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/connexos-design-logo-dark.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-source-prismic',
            pages: [
                {
                    type: 'Product',
                    match: '/:uid',
                    path: '/page-preview',
                    component: require.resolve('./src/templates/Product.tsx'),
                },
            ],
            options: {
                repositoryName: 'connexosdesign',
                schemas: {
                    home: require('./src/schemas/home.json'),
                    landing: require('./src/schemas/landing.json'),
                    contact: require('./src/schemas/contact.json'),
                    about: require('./src/schemas/about.json'),
                    product: require('./src/schemas/product.json'),
                    item: require('./src/schemas/item.json'),
                    faq: require('./src/schemas/faq.json'),
                },
            },
        },

        `gatsby-plugin-typescript`,
        `gatsby-plugin-netlify`,
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
