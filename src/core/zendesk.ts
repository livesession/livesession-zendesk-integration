// @ts-ignore
import ZAFClient from "zendesk_app_framework_sdk"; // TODO: delete
import { debug, errorLog } from "../utils/logger";
import { LiveSessionAPI, NewLiveSessionAPIMock } from "./livesession";
import { ILiveSessionAPI, IZAF } from "./types";
import { GetRequesterSessionsResponse } from "./objects";

function ctxDebug(...args: any[]) {
  debug("ZendeskService", ...args);
}

function ctxError(...args: any[]) {
  errorLog("ZendeskService", ...args);
}

const SESSIONS_SIZE = 10;

export class ZendeskService {
  private client: IZAF;
  private _api: ILiveSessionAPI | null;

  constructor() {
    if (typeof ZAFClient === "undefined") {
      throw new Error("ZAFClient cannot run outside Zendesk");
    } else {
      this.client = ZAFClient.init();
    }

    this._api = null;

    const token = "{{setting.livesession_personal_access_token}}"
    this.api = new LiveSessionAPI(token, this.client);
    ctxDebug("LiveSession API constructed");
  }

  private get api(): ILiveSessionAPI {
    if (!this._api) {
      return NewLiveSessionAPIMock();
    }

    return this._api;
  }

  private set api(theApi: ILiveSessionAPI) {
    this._api = theApi;
  }

  init() {
    ctxDebug("init");

    this.client.invoke("resize", { width: "100%", height: "500px" });
  }

  async getRequesterEmail(): Promise<string> {
    const requesterResp = await this.client.get("ticket.requester.email");
    return requesterResp["ticket.requester.email"];
  }

  async getRequesterSessions(
    email: string
  ): Promise<GetRequesterSessionsResponse> {
    ctxDebug("requester email", email);

    const sessionsResp = await this.getSessionsByEmail(email);
    ctxDebug("sessions", sessionsResp);

    return sessionsResp;
  }

  private async getSessionsByEmail(
    email: string
  ): Promise<GetRequesterSessionsResponse> {
    try {
      const params = {
        email,
        size: SESSIONS_SIZE,
      };

      const data = await this.api.getSessions(params);

      return {
        error: null,
        sessions: data,
      };
    } catch (err) {
      const httpError = ZendeskService.httpError(err);

      if (httpError) {
        return {
          error: httpError,
          sessions: null,
        };
      }

      ctxError("get session request error:", `"${JSON.stringify(err)}"`);

      return {
        error: err,
        sessions: null,
      };
    }
  }

  static httpError(err: any): any {
    if (typeof err == "object") {
      if (err.status === 404) {
        ctxDebug("get request not found");

        return err;
      }
    }
  }
}
