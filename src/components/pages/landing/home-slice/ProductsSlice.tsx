import { RichText } from 'prismic-reactjs'
import { Link } from 'gatsby'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import { SliceType } from '../../../../pages'
import { Card } from '../../../styled-components/Card'
import { ProductsPageNodeProps } from '../../../../pages/products'

export const StyledProductsSlice = styled.div`
    height: 60vh;
    padding: 4em 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Raleway-Light';
`

const ProductsSlice: React.FC<{ products: ProductsPageNodeProps[] }> = ({ products }) => {
    return (
        <StyledProductsSlice className="products">
            <h1>See Our Products</h1>
            <div className="container flex flex-center">
                {products?.length &&
                    products.map(s => (
                        <Link key={s.id} to={`/products/${s.uid}`} target="_blank" className="text-center">
                            <Card>
                                <img src={s.data.main_image.url} alt="" />
                                <h3 className="text-capitalize text-primary">{s.uid}</h3>
                            </Card>
                        </Link>
                    ))}
            </div>
        </StyledProductsSlice>
    )
}

// @ts-ignore
export default withTheme(ProductsSlice)
