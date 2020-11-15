import { RichTextBlock } from 'prismic-reactjs'

export enum Breakpoints {
    xl = 1200,
    lg = 992,
    md = 768,
    sm = 576,
}

export enum GridStyle {
    GRID = 'GRID',
    ROW = 'ROW',
    COL = 'COL',
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>  COMPONENTS   >>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export interface StyledHeroProps {
    bgImageUrl?: string
}

export interface AboutProps {
    about: JSX.Element
    experience: JSX.Element[]
}

export interface NavbarProps {
    brand: string | JSX.Element
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>/  FORMS   >>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export interface TextInputProps {
    classNames?: string[]
    label?: string
    name: string
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
    placeholder: string
    required: boolean
    type: string
    value: string
}

export interface TextAreaInputProps {
    label?: string
    name: string
    onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void
    placeholder: string
    required: boolean
    value: string
}

export interface ProductsPageNodeProps {
    id: string
    uid: string
    data: {
        title: {
            raw: RichTextBlock[]
        }
        main_image: {
            alt: string
            url: string
        }
        description: {
            raw: RichTextBlock[]
        }
    }
}
