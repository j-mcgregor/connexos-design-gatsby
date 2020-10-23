import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import { StyledFormLabel, StyledFormGroup } from './TextInput'

export interface TextAreaProps {
    label?: string
    classNames?: string[]
    subText?: string
    validate?: {
        type?: 'success' | 'danger'
        message?: string
    }
}

export const StyledFormControlTextArea = styled.textarea`
    font-family: inherit;
    font-weight: 700;
    width: 100%;
    border: 0;
    border-bottom: 1px solid ${({ theme }) => theme.palette.dark};
    outline: 0;
    padding: 10px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
        font-size: 0.8em;
        color: transparent;
    }

    &:placeholder-shown ~ .form-label {
        font-size: 0.8em;
        cursor: text;
        top: 20px;

        &.col-form-label-lg {
            font-size: 0.8em !important;
        }
        &.col-form-label-sm {
            font-size: 0.8em !important;
        }
    }

    &:focus {
        font-weight: 700;
        border-width: 1px;
        border-image: linear-gradient(
            to right,
            ${({ theme }) => theme.palette.center},
            ${({ theme }) => theme.palette.dark}
        );
        border-image-slice: 1;
        box-shadow: none;
        outline: none;
    }
`

const TextArea: React.FC<TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
    placeholder,
    label,
    name,
    required,
    value,
    onChange,
    classNames = [],
    autoComplete = 'off',
    subText,
    disabled = false,
    validate,
    rows = 3,
}) => {
    const validateClass = validate?.type === 'success' ? 'valid-feedback' : 'invalid-feedback'
    const classes: string[] = ['form-group']
    validate?.type && classes.push(`has-${validate.type}`)

    return (
        <StyledFormGroup className={[...classes, ...classNames].join(' ')}>
            <StyledFormControlTextArea
                placeholder={placeholder}
                className="form-control"
                name={name}
                required={required}
                {...(value && onChange ? { value } : value && !onChange && { defaultValue: '' })}
                onChange={onChange}
                data-testid={name}
                aria-label={name}
                autoComplete={autoComplete}
                disabled={disabled}
                rows={rows}
            />
            {label && <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>}
            {subText && <small className="form-text text-muted">{subText}</small>}
            {validate?.message && <div className={validateClass}>{validate.message}</div>}
        </StyledFormGroup>
    )
}

// @ts-ignore
export default withTheme(TextArea)
