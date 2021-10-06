import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled, { css, withTheme } from 'styled-components'

import Layout, { theme } from '../components/Layout'
import SEO from '../components/SEO'
import { flexStartColumn } from '../utils/themeUtils'

export const query = graphql`
    {
        prismicFaq(lang: { eq: "fr-ca" }) {
            data {
                title {
                    raw
                }
                descrription {
                    raw
                }
                questionanswer {
                    question
                    answer {
                        raw
                    }
                }
            }
        }
    }
`

interface QuestionAnswerProps {
    question: string
    answer: {
        raw: RichTextBlock[]
    }
}
interface FAQPageProps {
    data: {
        prismicFaq: {
            data: {
                title: {
                    raw: RichTextBlock[]
                }
                descrription: {
                    raw: RichTextBlock[]
                }
                questionanswer: QuestionAnswerProps[]
            }
        }
    }
}

interface StyledFAQProps {
    theme: typeof theme
}

const StyledFAQ = styled.div<StyledFAQProps>`
    ${flexStartColumn};
    background: ${({ theme }) => theme.palette.white};
    font-family: ${({ theme }) => theme.fonts.secondaryFont};
    min-height: 70vh;

    h1 {
        color: ${({ theme }) => theme.palette.center};
        font-size: 3em;
    }

    .description {
        width: 700px;
        margin: auto;

        p {
            line-height: 2.5em;
        }

        img {
            width: 100%;
        }
    }

    .collapsibles {
        margin: auto;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
        height: auto;
        h1 {
            font-size: 1.8em;
        }
        width: 100%;
    }
`

const StyledCollapsible = styled.div<{ open: boolean; isFirst: boolean }>`
    background: ${({ open, theme }) => (open ? theme.palette.center : 'none')};
    border: 1px solid ${({ theme }) => theme.palette.light_2};
    ${({ isFirst = false }) =>
        isFirst &&
        css`
            border-bottom: none;
        `}
    width: 700px;
    text-align: left;

    h2 {
        color: ${({ open, theme }) => (open ? theme.palette.light : theme.palette.center)};
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.5em;
        margin: 0;
        transition: 0.2s;

        &:hover {
            cursor: pointer;
            background: ${({ theme }) => theme.palette.light_2};
        }
    }
    .answer {
        padding: 0.5em 1em;
        display: ${({ open }) => (open ? 'block' : 'none')};
        background: #eee;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
        width: 100%;
        h2 {
            padding: 0.8em;
            font-size: 1.4em;
        }
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        h2 {
            padding: 0.6em;
            font-size: 1.2em;
        }
    }
`

const Collapsible: React.FC<QuestionAnswerProps & { isFirst: boolean }> = ({ question, answer, isFirst }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <StyledCollapsible className="accordion" open={open} isFirst={isFirst}>
            <h2 onClick={() => setOpen(!open)}>
                {question}
                <FontAwesomeIcon icon={open ? faChevronDown : faChevronRight} size="xs" />
            </h2>
            <div className="answer">
                <RichText render={answer.raw} />
            </div>
        </StyledCollapsible>
    )
}

const FAQPage: React.FC<FAQPageProps> = ({ data }) => {
    const { title, descrription, questionanswer } = data.prismicFaq.data

    return (
        <Layout>
            <SEO title="FAQ" />
            <StyledFAQ className="container text-center">
                {title?.raw && <RichText render={title.raw} />}
                {descrription?.raw && (
                    <div className="descrription text-justify my3">
                        <RichText render={descrription.raw} />
                    </div>
                )}
                {questionanswer?.map((props, i) => (
                    <Collapsible {...props} key={i} isFirst={i === 0 && questionanswer.length > 0} />
                ))}
            </StyledFAQ>
        </Layout>
    )
}

// @ts-ignore
export default withTheme(FAQPage)
