import * as React from 'react'
import styled, { StyledProps } from 'styled-components'
import { NavbarProps } from './Navbar'
import RightNav from './RightNav'

export interface BurgerProps extends NavbarProps {
    open?: boolean
}

type StyledBurgerProps = StyledProps<{
    open: boolean
    bgImage?: string
}>

const StyledBurger = styled.div<StyledBurgerProps>`
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 15px;
    right: 20px;
    z-index: 20;
    display: none;
    font-family: ${({ theme }) => theme.fonts.primaryFont};

    @media (max-width: 768px) {
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
    }
    div {
        width: 2rem;
        height: 0.25rem;
        background-color: ${({ open }) => (open ? '#ccc' : '#333')};
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;
        &:nth-child(1) {
            transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
        }
        &:nth-child(2) {
            transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
            opacity: ${({ open }) => (open ? 0 : 1)};
        }
        &:nth-child(3) {
            transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
        }
    }
`

const Burger: React.FC<BurgerProps> = ({ products }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div />
                <div />
                <div />
            </StyledBurger>
            <RightNav open={open} products={products} />
        </>
    )
}
export default Burger
