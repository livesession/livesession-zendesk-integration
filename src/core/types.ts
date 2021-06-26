import {SessionResponse} from "./objects";

declare global {
    const ZAFClient: IZAFClient
}

interface IZAFClient {
    init: () => IZAF
}

export interface IZAF {
    invoke: (cmd: string, ...arg: any[]) => void

    get: <T>(
        getter: keyof IZAFGetArgs | string[]
    ) => Promise<IZAFResponse & T>

    metadata(): Promise<IZAFMetadata>

    request<T>(params: IZAFRequest): Promise<T>
}

export interface IZAFRequest {
    url: string
    type: "GET"
    headers: {
        Authorization: string
    }
}

interface IZAFGetArgs {
    'ticket.requester.email': string
}

interface IZAFResponse {
    error: {}

    [key: string]: any
}

interface IZAFLiveSessionSettings {
    personal_access_token: string
}

interface IZAFMetadata {
    settings: IZAFLiveSessionSettings
}

export interface ILiveSessionAPI {
    getSessions(params: Object): Promise<SessionResponse>
}