/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
    siteMetadata: {
        title: `Connexos Design`,
        description: `Slow Fashion`,
        author: `connexosdesign`,
        siteUrl: 'https://www.connexosdesign.com/',
    },
    plugins: [
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // The property ID; the tracking code won't be generated without it - could be G-078RRXMVEY
                trackingId: 'G-078RRXMVEY',
                // Defines where to place the tracking script - `true` in the head and `false` in the body
                head: true,
                // Setting this parameter is optional
                anonymize: true,
                // Setting this parameter is also optional
                respectDNT: true,
                // Avoids sending pageview hits from custom paths
                exclude: ['/preview/**'],
                // Delays sending pageview hits on route update (in milliseconds)
                pageTransitionDelay: 0,
                // Defers execution of google analytics script after page load
                defer: false,
                name: 'Connexos Design',
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                // You can add multiple tracking ids and a pageview event will be fired for all of them.
                trackingIds: [
                    'G-078RRXMVEY', // Google Analytics / GA
                ],
            },
        },
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
        'gatsby-plugin-sitemap',
        'gatsby-plugin-robots-txt',
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
                    generalInfo: require('./src/schemas/generalInfo.json'),
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
