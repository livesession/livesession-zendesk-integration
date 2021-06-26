import React, {Fragment} from "react";

import {Play} from "./Play";
import {friendlyDate, renderTimeFormatted} from "../utils/time";
import {EngagementBar} from "./EngagementBar";
import {Hr} from "./Hr";
import {Session} from "../core/objects";
import {placeholderWrapper} from "./Placeholder";

interface SessionsListProps {
    sessions: Session[]
    isLoading: boolean
}

interface SessionItemProps {
    session: Session
    isLoading: boolean
}

function SessionItem(props: SessionItemProps) {
    const {session, isLoading} = props

    const ph = placeholderWrapper(isLoading)

    return <div className="sessions-list-container">
        <Play isLoading={isLoading} visitorID={session.visitor?.id} sessionID={session.id}/>
        <div className="sessions-list-description">
            <div className="sessions-list-description-header">
                <div className="sessions-list-description-duration">
                    {ph(() => renderTimeFormatted(session.duration))}
                </div>
                <div className="sessions-list-description-date">
                    {ph(() => friendlyDate(session.creation_timestamp))}
                </div>
            </div>
            <div className="engagement-score-container">
                <div className="engagement-score">
                    {ph(() => <EngagementBar score={session.engagment_score}/>)}
                </div>
            </div>
        </div>
    </div>
}

export function SessionsList(props: SessionsListProps) {
    if (props.isLoading) {
        return [{}, {}, {}].map((placeholderSession, i) => <Fragment key={i}>
                <SessionItem
                    isLoading={props.isLoading}
                    session={placeholderSession}/>
                <Hr/>
            </Fragment>
        )
    }

    return props.sessions.map(session => {
        return <div key={session.id}>
            <SessionItem session={session} isLoading={false}/>
            <Hr/>
        </div>
    })
}
