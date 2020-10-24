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
    border: 1px solid #ccc;

    img {
        border: 1px solid #ccc;
        height: 300px;
        width: 300px;
        object-fit: cover;
    }
`
