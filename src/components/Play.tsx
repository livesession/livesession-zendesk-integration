import React from 'react'
import styled from "styled-components";

import {Href} from "./Href";

interface PlayProps {
    visitorID: string
    sessionID: string
    isLoading: boolean
}

const StyledPlay = styled.span`
    border: 1px solid rgb(240, 242, 244);
    border-radius: 100%;
    color: ${(props: any) => props.isLoading ? "#f0f2f4" : "rgb(4, 70, 202)"};
    font-size: 1.2rem;
    width: 44px;
    height: 44px;
    text-align: center;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    transition: all 0.2s ease 0s;
`

export function Play({isLoading, visitorID, sessionID}: PlayProps) {
    return <Href
        isLoading={isLoading}
        href={`https://app.livesession.io/app/sessions/${visitorID}/${sessionID}`}
        target="_"
    >
        <StyledPlay isLoading={isLoading}>
            <i className="ion-play"/>
        </StyledPlay>
    </Href>
}