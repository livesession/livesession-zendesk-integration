import {useContext, useEffect, useState} from "react";

import {useZendeskService} from "./useZendeskService";
import {defaultSessionsResponse, ISessionsContext, SessionsContext} from "../contexts/SessionsContext";
import {SessionResponse} from "../core/objects";

export function useSessions() {
    const zendeskService = useZendeskService()

    const {data: zendesk} = zendeskService
    const [error, setError] = useState("")
    const [response, setResponse] = useContext<ISessionsContext>(SessionsContext)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (error || isLoading || response || !zendeskService || !zendesk) {
            return
        }

        async function getSessions() {
            setIsLoading(true)

            const sessionsResp = await zendesk.getRequesterSessions()

            setIsLoading(false)

            if (!sessionsResp) {
                setResponse(defaultSessionsResponse)
                return
            }

            if (sessionsResp.error) {
                setError(sessionsResp.error)
                return
            }

            if (sessionsResp.sessions) {
                setResponse(sessionsResp.sessions)
            }
        }

        getSessions()
    }, [zendeskService])

    if (zendeskService.error) {
        return {
            error: zendeskService.error,
            data: {} as SessionResponse
        }
    }

    return {
        error,
        isLoading,
        data: response
    }
}