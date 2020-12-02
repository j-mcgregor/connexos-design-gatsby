import { Link } from 'gatsby'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import Img from 'gatsby-image'

import { ProductsPageNodeProps } from '../../../../types/enums'
import { flexCenterColumn } from '../../../../utils/themeUtils'
import { Card, Cards } from '../../../styled-components/Card'

export const StyledProductsSlice = styled.div`
    ${flexCenterColumn}
    font-family: ${({ theme }) => theme.fonts.secondaryFont};
    height: auto;
    padding: 4em 0;
    margin: auto;

    h1 {
        color: ${({ theme }) => theme.palette.center};
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        width: 100%;
        height: auto;
    }
`

const ProductsSlice: React.FC<{ products: ProductsPageNodeProps[] }> = ({ products }) => {
    return (
        <StyledProductsSlice className="products">
            <h1>Allez voir!</h1>
            <Cards flex>
                {products?.length &&
                    products.map(s => (
                        <Link
                            key={s.id}
                            to={`/products/${s.uid}`}
                            target="_blank"
                            className="text-center product-link"
                        >
                            <Card>
                                <Img fixed={s.data.main_image.fixed} alt="" />
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
