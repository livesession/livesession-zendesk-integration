import React from "react";

import {useSessions} from "../hooks/useSessions";
import {VisitorCard} from "../components/VisitorCard";
import {SessionsList} from "../components/SessionsList";
import {NoSessions} from "../components/NoSessions";
import {Error} from "../components/Error";
import {ContainerList} from "../components/ContainerList";
import {Hr} from "../components/Hr";
import {placeholderWrapper} from "../components/Placeholder";

//TODO: invalid multiple requests to API
export function SessionsListContainer() {
    const {error, data, isLoading} = useSessions()

    if (error) {
        return <Error/>
    }

    const noSessions = !isLoading && (!data || !data.sessions || !data.sessions.length)
    if (noSessions) {
        return <NoSessions/>
    }

    let visitor = null
    let websiteID = ""
    let sessions = []
    let total = 0

    if (data && data.sessions) {
        visitor = data.sessions[0].visitor
        websiteID = data.sessions[0].website_id
        sessions = data.sessions
    }

    if (data) {
        total = data.total
    }

    const ph = placeholderWrapper(isLoading)

    function ShowAllSessions() {
        return <a
            target="_blank"
            href={`https://app.livesession.io/app/${websiteID}/sessions`}
            className="link"
        >
            show all sessions ({total})
        </a>
    }

    return <ContainerList gap={10}>
        <div>
            <VisitorCard visitor={visitor} isLoading={isLoading}/>
        </div>

        <div>
            {ph(ShowAllSessions)}
        </div>

        <Hr/>

        <div>
            <SessionsList sessions={sessions} isLoading={isLoading}/>
        </div>
    </ContainerList>
}