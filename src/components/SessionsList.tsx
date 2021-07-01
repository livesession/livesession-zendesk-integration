import React, { Fragment } from "react";

import { Play } from "./Play";
import { friendlyFullDate, renderTimeFormatted } from "../utils/time";
import { EngagementBar } from "./EngagementBar";
import { Hr } from "./Hr";
import { placeholderWrapper } from "./Placeholder";
import { Href } from "./Href";
import { Session } from "../core/objects";

interface SessionsListProps {
  sessions: Session[];
  isLoading: boolean;
}

interface SessionItemProps {
  session?: Session;
  isLoading: boolean;
}

function SessionItem(props: SessionItemProps) {
  const { session, isLoading } = props;

  const ph = placeholderWrapper(isLoading);

  return (
    <Href
      textDecoration="none"
      isLoading={isLoading}
      href={`https://app.livesession.io/app/sessions/${session?.visitor?.id}/${session?.id}`}
      target="_blank"
    >
      <div className="sessions-list-container">
        <Play isLoading={isLoading} />
        <div className="sessions-list-description">
          <div className="sessions-list-description-header">
            <div className="sessions-list-description-duration">
              {ph(() => renderTimeFormatted(session?.duration))}
            </div>
            <div className="sessions-list-description-date">
              {ph(() => friendlyFullDate(session?.creation_timestamp))}
            </div>
          </div>
          <div className="engagement-score-container">
            <div className="engagement-score">
              {ph(() => (
                <EngagementBar score={session?.engagment_score} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Href>
  );
}

export const SessionsList: Function = function SessionsList(
  props: SessionsListProps
): JSX.Element[] {
  if (props.isLoading) {
    return [{}, {}, {}].map((placeholderSession, i) => (
      <Fragment key={i}>
        <SessionItem
          isLoading={props.isLoading}
          session={placeholderSession as Session}
        />
        <Hr />
      </Fragment>
    ));
  }

  return props.sessions.map((session) => {
    return (
      <div key={session.id}>
        <SessionItem session={session} isLoading={false} />
        <Hr />
      </div>
    );
  });
};
