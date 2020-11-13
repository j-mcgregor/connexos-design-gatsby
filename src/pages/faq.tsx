import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import Layout, { theme } from '../components/Layout'
import SEO from '../components/SEO'

export const query = graphql`
    {
        prismicFaq {
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: ${({ theme }) => theme.palette.white};
    min-height: 70vh;
    font-family: 'Raleway-Thin';

    h1 {
        color: ${({ theme }) => theme.palette.center};
        font-family: 'CormorantGaramond-Light', Times, serif;
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
`

const StyledCollapsible = styled.div<{ open: boolean }>`
    background: ${({ open }) => (open ? '#ddd' : '#eee')};
    width: 700px;
    text-align: left;

    h2 {
        color: #555;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.5em;
        margin: 0;
        transition: 0.2s;
        &:hover {
            cursor: pointer;
            background: #ddd;
        }
    }
    .answer {
        padding: 0.5em 1em;
        display: ${({ open }) => (open ? 'block' : 'none')};
        background: #eee;
    }
`

const Collapsible: React.FC<QuestionAnswerProps> = ({ question, answer }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <StyledCollapsible className="accordion" open={open}>
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
                    <Collapsible {...props} key={i} />
                ))}
            </StyledFAQ>
        </Layout>
    )
}

// @ts-ignore
export default withTheme(FAQPage)
