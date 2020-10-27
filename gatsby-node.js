const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // Query all Products with their IDs and template data.
    const pages = await graphql(`
        {
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
                        }
                        description {
                            raw
                        }
                    }
                }
            }
        }
    `)

    // Create pages for each Product in Prismic using the selected template.
    pages.data.allPrismicProduct.nodes.forEach(node => {
        createPage({
            path: `/products/${node.uid}`,
            component: path.resolve(__dirname, 'src/templates/Product.tsx'),
            context: {
                id: node.id,
            },
        })
    })
}
