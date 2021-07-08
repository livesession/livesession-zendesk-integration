import { useEffect, useState } from "react";

import { ZendeskService } from "../core/zendesk";

export function useZendeskService(): HookResult<ZendeskService | null> {
  const [error, setError] = useState();
  const [zendesk, setZendesk] = useState<ZendeskService | null>(null);

  useEffect(() => {
    const service = new ZendeskService();
    service.init();

    setZendesk(service);
  }, []);

  return {
    error,
    data: zendesk,
    isLoading: false,
  };
}
