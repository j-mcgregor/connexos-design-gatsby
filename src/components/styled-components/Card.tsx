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
        `
    }
    if (flex) {
        return css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;

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
    overflow-x: hidden;
`

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-family: 'Raleway-Light';
    width: 100%;
    /* margin: 2em 0; */
    padding: 0;
    border: 1px solid #e4e4e4;
    transition: 0.3s;
    box-shadow: 0px 4px 7px -7px black;
    text-align: left;

    :hover {
        cursor: pointer;
        box-shadow: 0px 5px 9px -7px black;
    }

    img {
        height: 250px;
        width: 100%;
        object-fit: cover;
    }

    .card-footer {
        padding: 1em;
        font-size: 14px;

        h2 {
            font-size: 1.7em;
            color: ${theme.palette.dark_2};
        }

        .price {
            font-size: 1.2em;
            color: ${({ theme }) => theme.palette.center};
        }
    }
`
