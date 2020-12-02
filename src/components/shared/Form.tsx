import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import axios from 'axios'

import TextArea from '../form/TextArea'
import TextInput from '../form/TextInput'
import { StyledSpinner } from './Spinner'
import { Button, FormButton } from '../styled-components/Link'

const S_Form = styled.form`
    width: 400px;
    padding-top: 3em;
    button {
        margin-top: 0.5em;
        width: 100%;
    }
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        width: 100%;
    }
`

const StyledLoadingOverlay = styled.div`
    height: 100%;
    width: 100%;
    background: #fff;
    opacity: 0.5;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const formName = 'contact-form'

const Form = () => {
    const [name, setName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [message, setMessage] = React.useState<string>('')
    const [status, setStatus] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)

    const encode = (data: any) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const data = { 'form-name': formName, Name: name, Email: email, Message: message }
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

        try {
            const res = await axios({
                method: 'POST',
                url: 'https://connexos-design.netlify.app/',
                data: encode(data),
                headers,
            })

            if (res.status >= 200 || res.status < 300) {
                setTimeout(() => {
                    setStatus('Form Submission Successful!!')
                    setLoading(false)
                }, 1000)
            } else {
                throw new Error('Form Submission Failed!')
            }
        } catch (error) {
            setStatus(error.message)
            setLoading(false)
        }
    }

    return (
        <S_Form
            className="container"
            onSubmit={handleSubmit}
            name={formName}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
        >
            <input type="hidden" name="form-name" value={formName} />
            {loading && (
                <StyledLoadingOverlay>
                    <StyledSpinner />
                </StyledLoadingOverlay>
            )}
            <div className="mb2">
                <TextInput
                    label="Nom"
                    placeholder="Your name"
                    type="text"
                    name="Name"
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    classNames={['my2']}
                />
                <TextInput
                    label="Email"
                    placeholder="Votre email"
                    type="email"
                    name="Email"
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                    classNames={['my2']}
                />
                <TextArea
                    label="Message"
                    placeholder="Message"
                    name="Message"
                    value={message}
                    onChange={e => setMessage(e.currentTarget.value)}
                />
            </div>
            <FormButton size="sm" type="submit" target="_blank">
                Submit
            </FormButton>

            <div className="text-center p2">{status}</div>
        </S_Form>
    )
}

export default withTheme(Form)
