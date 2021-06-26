import React from "react"

import {withPlaceholder} from "./Placeholder";

interface ImgProps {
    src: string
    alt: string
    style?: Object
    className?: string
    isLoading: boolean
}

function ImgComponent(props: ImgProps) {
    return <img
        src={props.src}
        alt={props.alt}
        style={props.style}
        className={props.className}
    />
}

export const Img = withPlaceholder<ImgProps>(ImgComponent, props => props.isLoading)