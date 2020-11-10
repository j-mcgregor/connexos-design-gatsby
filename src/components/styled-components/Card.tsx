import styled from 'styled-components'

export const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 2em;
    width: calc((250px * 4) + (2em * 3));
    margin: 4rem auto;
    overflow-x: hidden;
`

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Raleway-Light';
    width: 100%;
    /* margin: 2em 0; */
    padding: 0;
    border: 1px solid #e4e4e4;
    transition: 0.3s;
    box-shadow: 0px 4px 7px -7px black;

    :hover {
        cursor: pointer;
        box-shadow: 0px 5px 9px -7px black;
    }

    img {
        height: 250px;
        width: 100%;
        object-fit: cover;
    }

    .price {
        font-size: 1.2em;
        padding: 15px;
        color: ${({ theme }) => theme.palette.center};
    }
`
