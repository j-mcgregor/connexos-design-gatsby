import { RichText } from 'prismic-reactjs'
import { Link } from 'gatsby'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import { SliceType } from '../../../../pages'
import { Card } from '../../../styled-components/Card'

export const StyledProductsSlice = styled.div`
    height: 60vh;
    padding: 4em 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Raleway-Light';
`

const ProductsSlice: React.FC<{ sliceType: SliceType }> = ({ sliceType }) => {
    return (
        <StyledProductsSlice
            key={`products ${JSON.stringify(sliceType.primary.title1.raw)}`}
            className="products"
        >
            <RichText render={sliceType.primary.title1.raw} />
            <RichText render={sliceType.primary.description.raw} />
            <div className="container flex flex-center">
                {sliceType.items?.length &&
                    sliceType.items.map(s => (
                        <Link key={s.label} to={s.product_link?.url} target="_blank" className="text-center">
                            <Card>
                                <img src={s.product_image.url} alt="" />
                                <h3>{s.label}</h3>
                            </Card>
                        </Link>
                    ))}
            </div>
        </StyledProductsSlice>
    )
}

// @ts-ignore
export default withTheme(ProductsSlice)
