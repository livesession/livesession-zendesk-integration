import { debug } from "../utils/logger";
import {
  GetSessionsParams,
  IDictionary,
  ILiveSessionAPI,
  IZAF,
  IZAFRequest,
} from "./types";
import { SessionResponse } from "./objects";

const LS_API_URL = process.env.LS_API_URL || "https://api.livesession.io/v1";

function ctxDebug(...args: any[]) {
  debug("LiveSessionAPI", ...args);
}

export function NewLiveSessionAPIMock(): ILiveSessionAPI {
  return {
    getSessions(params: object): Promise<SessionResponse> {
      return new Promise((resolve, reject) => {
        reject("LiveSessionAPI is empty");
      });
    },
  };
}

export class LiveSessionAPI implements ILiveSessionAPI {
  token: string;
  client: IZAF;

  constructor(token: string, client: IZAF) {
    this.token = token;
    this.client = client;
  }

  async getSessions(params: GetSessionsParams): Promise<SessionResponse> {
    ctxDebug("get session request...");

    return await this.client.request<SessionResponse>(
      this.requestGET("/sessions", params)
    );
  }

  private query(params: IDictionary<any> | null): string {
    if (!params || !Object.keys(params).length) {
      return "";
    }

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map((k: string) => esc(k) + "=" + esc(params[k]))
      .join("&");

    return `?${query}`;
  }

  private requestGET(
    resource: string,
    queryParams: null | IDictionary<any>
  ): IZAFRequest {
    const params: IZAFRequest = {
      url: LS_API_URL + resource + this.query(queryParams),
      type: "GET",
      headers: {
        Authorization: "Bearer " + this.token,
      },
    };

    ctxDebug("http get", params.url);

    return params;
  }
}
