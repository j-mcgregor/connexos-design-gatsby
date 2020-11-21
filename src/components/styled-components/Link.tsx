import { Link, GatsbyLinkProps } from 'gatsby'
import styled from 'styled-components'

const ButtonSizes = {
    xs: '0.6em 1.8em',
    sm: '1.1em 2.5em',
    md: '1.4em 3em',
    lg: '1.8em 3.5em',
}

interface LinkExtended extends GatsbyLinkProps<{}> {
    bgColor?: string
    size: keyof typeof ButtonSizes
}

export const Button = styled(Link)<LinkExtended>`
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.palette.dark};
    color: ${({ theme }) => theme.palette.dark};
    text-transform: uppercase;
    padding: ${({ size }) => ButtonSizes[size]};
    border-radius: 4px;

    &:hover {
        border-color: ${({ theme }) => theme.palette.dark};
        background: ${({ theme }) => theme.palette.dark};
        color: ${({ theme }) => theme.palette.light};
    }
`
