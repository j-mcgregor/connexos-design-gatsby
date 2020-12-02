import styled, { css } from 'styled-components'
import { theme } from '../Layout'

interface CardsType {
    flex?: boolean
    grid?: boolean
}

export const setGrid = ({ flex, grid }: CardsType) => {
    if (grid) {
        return css`
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            grid-auto-rows: auto;
            grid-gap: 2em;
            width: calc((250px * 4) + (2em * 3));
            overflow-x: hidden;
        `
    }
    if (flex) {
        return css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            width: 100%;

            > a {
                width: 250px;
                margin: 10px;
            }
        `
    }
}

export const Cards = styled.div<CardsType>`
    ${({ flex, grid }) => setGrid({ flex, grid })}
    margin: 4rem auto;

    > .product-link {
        margin: 0 1em;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        height: auto;
        width: 100%;
        margin: 0;
        padding: 1em;
        box-sizing: border-box;
    }
`

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-family: ${({ theme }) => theme.fonts.primaryFont};
    width: 100%;
    height: 100%;
    padding: 8px 8px 0 8px;
    border: 1px solid #e4e4e4;
    transition: 0.3s;
    box-shadow: 0px 4px 7px -7px black;
    text-align: left;
    box-sizing: border-box;
    overflow: hidden;

    :hover {
        cursor: pointer;
        box-shadow: 0px 5px 9px -7px black;
    }

    img {
        margin-top: 0;
        height: 230px;
        width: 100%;
        object-fit: contain;
    }

    .card-footer {
        padding: 1em;
        font-size: 12px;
        height: 110px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        h2 {
            font-size: 1.3em;
            color: ${theme.palette.center};
        }
        h3 {
            color: ${({ theme }) => theme.palette.light_2};
        }

        .price {
            font-size: 1.4em;
            color: ${({ theme }) => theme.palette.center};
        }
    }
`
