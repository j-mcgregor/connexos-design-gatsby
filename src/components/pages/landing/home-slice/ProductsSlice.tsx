import { Link } from 'gatsby'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import { ProductsPageNodeProps } from '../../../../types/enums'
import { Card, Cards } from '../../../styled-components/Card'

export const StyledProductsSlice = styled.div`
    height: 60vh;
    padding: 4em 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'FiraSans-Regular';
    margin: auto;

    h1 {
        color: ${({ theme }) => theme.palette.center};
    }
`

const ProductsSlice: React.FC<{ products: ProductsPageNodeProps[] }> = ({ products }) => {
    return (
        <StyledProductsSlice className="products">
            <h1>See Our Products</h1>
            <Cards flex>
                {products?.length &&
                    products.map(s => (
                        <Link key={s.id} to={`/products/${s.uid}`} target="_blank" className="text-center">
                            <Card>
                                <img src={s.data.main_image.url} alt="" />
                                <div className="card-footer">
                                    <h3 className="text-capitalize">{s.uid}</h3>
                                </div>
                            </Card>
                        </Link>
                    ))}
            </Cards>
        </StyledProductsSlice>
    )
}

// @ts-ignore
export default withTheme(ProductsSlice)
