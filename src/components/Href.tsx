import React from "react"
import styled from "styled-components";

interface HrefProps {
    isLoading?: boolean
    href: string
    target: "_blank" | "_self" | "_parent" | "_top"
    children: React.ReactElement
}

const StyledHref = styled.a`
    ${(props: any) => props.isLoading ? "cursor: not-allowed" : ""}
`

export function Href(props: HrefProps) {
    return <StyledHref {...props}/>
}