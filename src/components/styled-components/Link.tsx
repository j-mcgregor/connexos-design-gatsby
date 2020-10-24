import { Link } from 'gatsby'
import styled from 'styled-components'

export const Button = styled(Link)<{ bgColor?: string }>`
    background: ${({ bgColor, theme }) =>
        bgColor && bgColor === 'Secondary'
            ? theme.palette.dark_2
            : bgColor === 'Primary'
            ? theme.palette.dark_1
            : theme.palette.center};
    color: ${({ theme }) => theme.palette.light};
    text-transform: uppercase;
    padding: 1.1em 2.5em;
    border-radius: 4px;
    margin: 0 5px;

    &:hover {
        background: ${({ bgColor, theme }) =>
            bgColor === 'Secondary'
                ? theme.palette.dark_1
                : bgColor === 'Primary'
                ? theme.palette.center
                : theme.palette.light_1};
        color: ${({ theme }) => theme.palette.light};
    }
`
