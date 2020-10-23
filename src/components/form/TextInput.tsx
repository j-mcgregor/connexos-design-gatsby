import * as React from 'react'
import styled, { withTheme } from 'styled-components'

export interface ValidateProps {
    type?: 'success' | 'danger'
    message?: string
}

export interface TextInputProps {
    label?: string
    classNames?: string[]
    subText?: string
    validate?: ValidateProps
}

export const StyledFormGroup = styled.div`
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
`

export const StyledFormLabel = styled.label`
    position: absolute;
    top: 0;
    transform: translateY(-10%);
    display: block;
    transition: 0.2s;
    font-size: 0.8em;
    color: ${({ theme }) => theme.palette.center};
`

export const StyledFormControlInput = styled.input`
    font-family: inherit;
    font-weight: 700;
    font-size: 1em;
    color: ${({ theme }) => theme.palette.dark};
    width: 100%;
    border: 0;
    border-bottom: 1px solid ${({ theme }) => theme.palette.center};
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
            font-size: $font-size * 1.5 !important;
        }
        &.col-form-label-sm {
            font-size: $font-size * 0.8 !important;
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

        ~ .form-label {
            position: absolute;
            top: -5px;
            display: block;
            transition: 0.2s;
            font-size: $font-size * 0.8;
            color: ${({ theme }) => theme.palette.center};
            font-weight: 700;

            &.col-form-label-lg {
                font-size: $font-size * 1.2 !important;
            }
            &.col-form-label-lg {
                font-size: $font-size * 0.8 !important;
            }
        }
    }
`

const TextInput: React.FC<TextInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
    autoComplete = 'off',
    classNames,
    disabled = false,
    label,
    name,
    onChange,
    placeholder,
    required,
    subText,
    type = 'text',
    validate,
    value,
}) => {
    const validateClass = validate?.type === 'success' ? 'valid-feedback' : 'invalid-feedback'

    return (
        <StyledFormGroup className={classNames.join(' ')}>
            <StyledFormControlInput
                aria-label={name}
                autoComplete={autoComplete}
                data-testid={name}
                disabled={disabled}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                type={type}
                value={value}
            />
            {label && <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>}
            {subText && <small className="form-text text-muted">{subText}</small>}
            {validate?.message && <div className={validateClass}>{validate.message}</div>}
        </StyledFormGroup>
    )
}

// @ts-ignore
export default withTheme(TextInput)
