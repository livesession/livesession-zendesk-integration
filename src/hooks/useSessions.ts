import { useContext, useEffect, useState } from "react";

import { useZendeskService } from "./useZendeskService";
import {
  defaultSessionsResponse,
  ISessionsContext,
  SessionsContext,
} from "../contexts/SessionsContext";
import { SessionResponse } from "../core/objects";
import { DefaultLocalStorageCache } from "../core/cache";

const SessionsCache = DefaultLocalStorageCache.Sessions();

export function useSessions() {
  const zendeskService = useZendeskService();

  const { data: zendesk } = zendeskService;
  const [error, setError] = useState("");
  const [response, setResponse] = useContext<ISessionsContext>(SessionsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if ((error || response) && !isLoading) {
      setIsDone(true);
    }

    if (error || isLoading || response || !zendeskService || !zendesk) {
      return;
    }

    async function getSessions() {
      if (!zendesk) {
        return;
      }

      setIsLoading(true);

      const requesterEmail = await zendesk.getRequesterEmail();

      const cached = SessionsCache.get(requesterEmail);

      if (cached) {
        setResponse(cached);
        setIsDone(true);
        setIsLoading(false);

        return;
      }

      const sessionsResp = await zendesk.getRequesterSessions(requesterEmail);

      setIsDone(true);
      setIsLoading(false);

      if (!sessionsResp) {
        SessionsCache.set(requesterEmail, defaultSessionsResponse);

        setResponse(defaultSessionsResponse);
        return;
      }

      if (sessionsResp.error) {
        setError(sessionsResp.error);
        return;
      }

      if (sessionsResp.sessions) {
        SessionsCache.set(requesterEmail, sessionsResp.sessions);

        setResponse(sessionsResp.sessions);
      }
    }

    getSessions();
  }, [zendeskService]);

  if (zendeskService.error) {
    return {
      error: zendeskService.error,
      isDone: true,
      isLoading: false,
      data: {} as SessionResponse,
    };
  }

  return {
    error,
    isLoading,
    isDone,
    data: response,
  };
}
