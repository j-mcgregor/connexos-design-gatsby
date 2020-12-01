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
            allPrismicItem {
                nodes {
                    uid
                    id
                    data {
                        product_type
                    }
                }
            }
            allPrismicGeneralInfo {
                nodes {
                    uid
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
                uid: node.uid,
            },
        })
    })
    pages.data.allPrismicItem.nodes.forEach(node => {
        createPage({
            path: `/products/${node.data.product_type}/${node.id}`,
            component: path.resolve(__dirname, 'src/templates/Item.tsx'),
            context: {
                id: node.id,
                uid: node.uid,
                product_type: node.data.product_type,
            },
        })
    })
    pages.data.allPrismicGeneralInfo.nodes.forEach(node => {
        console.log(node)
        createPage({
            path: `/${node.uid}`,
            component: path.resolve(__dirname, 'src/templates/GeneralInfo.tsx'),
            context: {
                id: node.id,
                uid: node.uid,
            },
        })
    })
}
