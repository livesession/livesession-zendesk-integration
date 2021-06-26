import {createContext} from "react";

import {SessionResponse} from "../core/objects";

export const defaultSessionsResponse = {
    page: {
        size: 0,
        num: 0,
    },
    total: 0,
    sessions: []
}

export type ISessionsContext = [SessionResponse | null, (data: SessionResponse) => void]

export const SessionsContext = createContext<ISessionsContext>([
        null,
        (data: SessionResponse) => {
        }
    ]
)