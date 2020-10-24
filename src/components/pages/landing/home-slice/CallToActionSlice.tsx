import styled from 'styled-components'

export const CallToActionSlice = styled.div`
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Raleway-Light';
    background: ${({ theme }) => theme.palette.light};

    h1 {
        font-family: Georgia, 'Times New Roman', Times, serif;
    }

    p {
        width: 400px;
        text-align: justify;
    }
`
