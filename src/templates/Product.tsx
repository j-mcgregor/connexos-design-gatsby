import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { ProductsPageNodeProps } from '../pages/products'
import { StyledBannerProps } from '../pages/contact'
interface ProductPageType {
    data: { prismicProduct: ProductsPageNodeProps }
}

const S_ProductPage = styled.div`
    height: 60vh;
`

const S_ProductHeader = styled.div<StyledBannerProps>`
    height: 60vh;
    background: url(${({ bgImage }) => bgImage}) no-repeat center center;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Raleway-Thin';
    padding: 0.7em 4em;

    .title-section {
        background: ${({ theme }) => theme.paletteOpacity.dark('0.7')};

        h1 {
            padding: 0.2em 2em;
            font-size: 3em;
            text-transform: uppercase;
        }
    }
`

const Product: React.FC<ProductPageType> = ({ data }) => {
    const { data: product } = data.prismicProduct

    return (
        <Layout>
            <S_ProductPage className="container-fluid">
                <div className="row">
                    <S_ProductHeader className="col-md-6" bgImage={product.main_image.url}>
                        <div className="title-section">
                            {product.title && <RichText render={product.title.raw} />}
                        </div>
                    </S_ProductHeader>
                    <S_ProductHeader className="col-md-6 p3">
                        {product.description && <RichText render={product.description.raw} />}
                    </S_ProductHeader>
                </div>
            </S_ProductPage>
        </Layout>
    )
}

export const query = graphql`
    query Product($id: String) {
        prismicProduct(id: { eq: $id }) {
            id
            data {
                title {
                    raw
                }
                description {
                    raw
                }
                main_image {
                    url
                    alt
                }
            }
        }
    }
`

export default Product
