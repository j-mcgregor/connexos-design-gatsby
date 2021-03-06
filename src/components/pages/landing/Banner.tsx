import * as React from 'react'
import styled from 'styled-components'

interface BannerProps {
    text?: string
}

const StyledBanner = styled.div`
    font-family: ${({ theme }) => theme.fonts.primaryFont};

    h2 {
        text-transform: uppercase;
    }

    p {
        line-height: 1.5em;
    }
`

const Banner: React.FC<BannerProps> = ({ children }) => {
    return <StyledBanner className="banner container p3">{children}</StyledBanner>
}

export default Banner
