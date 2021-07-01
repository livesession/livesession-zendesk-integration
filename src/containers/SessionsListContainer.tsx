import React from "react";

import { useSessions } from "../hooks/useSessions";
import { VisitorCard } from "../components/VisitorCard";
import { SessionsList } from "../components/SessionsList";
import { NoSessions } from "../components/NoSessions";
import { Error } from "../components/Error";
import { ContainerList } from "../components/ContainerList";
import { Hr } from "../components/Hr";
import { placeholderWrapper } from "../components/Placeholder";
import { Session, Visitor } from "../core/objects";

export function SessionsListContainer() {
  const { error, data, isLoading, isDone } = useSessions();

  if (error) {
    return <Error error={error} />;
  }

  const noData = !data || !data.sessions || !data.sessions.length;
  const noSessions = isDone && !isLoading && noData;
  if (noSessions) {
    return <NoSessions />;
  }

  let visitor: Visitor | null = null;
  let websiteID = "";
  let sessions: Session[] = [];
  let total = 0;
  let email = "";

  if (data && data.sessions && data.sessions.length) {
    visitor = data.sessions[0].visitor;
    websiteID = data.sessions[0].website_id;
    sessions = data.sessions;
    email = visitor.email;
  }

  if (data) {
    total = data.total;
  }

  const ph = placeholderWrapper(noData || isLoading);

  function ShowAllSessions() {
    return (
      <a
        target="_blank"
        href={`https://app.livesession.io/app/${websiteID}/sessions?email=${email}`}
        className="link"
      >
        show all ({total})
      </a>
    );
  }

  return (
    <ContainerList gap={10}>
      <div>
        <VisitorCard visitor={visitor} isLoading={isLoading} />
      </div>

      <div>{ph(ShowAllSessions)}</div>

      <Hr />

      <div>
        <SessionsList sessions={sessions} isLoading={isLoading} />
      </div>
    </ContainerList>
  );
}
