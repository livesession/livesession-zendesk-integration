export interface Session {
  id: string;
  session_url: string;
  website_id: string;
  visitor: Visitor;
  duration: number;
  creation_timestamp: number;
  engagment_score: number;
}

export interface Visitor {
  id: string;
  name: string;
  first_session_timestamp: number;
  email: string;
  email_hash: string;
  geolocation: VisitorGeolocation;
  sessions_statistics: VisitorSessionsStatistics;
}

interface VisitorGeolocation {
  city: string;
  country_code: string;
}

interface VisitorSessionsStatistics {
  count: number;
}

export interface SessionResponse {
  page: {
    num: number;
    size: number;
  };
  total: number;
  sessions: Session[];
}

export interface GetRequesterSessionsResponse {
  sessions: null | SessionResponse;
  error: any;
}
