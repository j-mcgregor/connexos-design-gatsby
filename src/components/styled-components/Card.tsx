import styled from 'styled-components'

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Raleway-Light';
    width: 300px;
    margin: 2em;
    padding: 0 1em;
    border: 1px solid #e4e4e4;
    transition: 0.3s;
    box-shadow: 0px 4px 7px -7px black;

    :hover {
        cursor: pointer;
        box-shadow: 0px 5px 9px -7px black;
    }

    img {
        height: 300px;
        width: 300px;
        object-fit: cover;
    }
`
