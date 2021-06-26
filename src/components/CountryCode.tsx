import React from "react"
import styled from "styled-components";

import {Img} from "./Img";

interface CountryCodeProps {
    code: string
    isLoading?: boolean
    style?: Object
}

const StyledImg = styled(Img)`
    height: 12px;
    marginRight: 5px;
    border: 1px solid #fff;
`

export function CountryCode(props: CountryCodeProps) {
    if (!props.code || props.code === "") return false

    return (
        <StyledImg
            isLoading={props.isLoading}
            src={`https://lipis.github.io/flag-icon-css/flags/4x3/${props.code.toLowerCase()}.svg`}
            alt="country-flag"
        />
    )
}