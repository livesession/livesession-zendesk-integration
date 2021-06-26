import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: ${(props: any) => props.padding}px;
    height: ${(props) => props.height};

    align-items: center;
    display: flex;

    @-webkit-keyframes placeload {
        0% {
            background-position: -468px 0;
        }
        100% {
            background-position: 468px 0;
        }
    }

    @keyframes placeload {
        0% {
            background-position: -468px 0;
        }
        100% {
            background-position: 468px 0;
        }
    }
`

const Content = styled.div`
    border-radius: 4px;
    background-color: ${(props) => props.color};
    height: ${(props) => props.height}px;
    width: 100%;
    min-width: ${({minWidth}) => minWidth}px;

    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeload;
    animation-timing-function: linear;
    ${(props) =>
    props.theme.style === "dark" && props.useDarkMode
        ? "background: -webkit-linear-gradient(left, #111 8%, #222 18%, #111 33%);"
        : "background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);"};
    -webkit-background-size: 800px 104px;
    background-size: 1200px 104px;
    position: relative;
`

function Placeholder(props) {
    const {wrapperHeight, height, padding, color, minWidth, style, contentStyle, useDarkMode} = props
    return (
        <Wrapper padding={padding} style={style}>
            <Content
                style={contentStyle}
                color={color}
                height={height}
                minWidth={minWidth}
                useDarkMode={useDarkMode}
            />
        </Wrapper>
    )
}

Placeholder.defaultProps = {
    height: 12,
    padding: 3,
    color: "rgba(0,0,0, 0.05)",
    minWidth: 100,
    wrapperHeight: "auto",
    useDarkMode: false,
}

export const placeholderWrapper = (condition, ...rest) => {
    return (fn, opts = {contentOnly: false}) => {
        const {contentOnly, style, contentStyle} = opts
        if (contentOnly) {
            return condition ? null : fn()
        } else {
            return condition ? <Placeholder contentStyle={contentStyle} style={style} {...rest} {...opts} /> : fn()
        }
    }
}

export function withPlaceholder<T>(Component, condition: (props: T) => boolean) {
    return function (props: T) {
        const ph = placeholderWrapper(condition(props))

        return ph(() => <Component {...props}/>)
    }
}


