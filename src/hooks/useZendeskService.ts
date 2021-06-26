import {useEffect, useState} from "react";

import {ZendeskService} from "../core/zendesk";

export function useZendeskService(): HookResult<ZendeskService> {
    const [error, setError] = useState()
    const [zendesk, setZendesk] = useState<ZendeskService>(null)

    useEffect(() => {
        async function init() {
            const service = new ZendeskService()
            await service.init()

            setZendesk(service)
        }

        init()
    }, [])

    return {
        error,
        data: zendesk,
        isLoading: false
    }
}