import React from "react";
import { STATUS_TOO_MANY_REQUESTS } from "../const/http";

interface ErrorProps {
  error: any;
}

export function Error(props: ErrorProps) {
  const msg = (() => {
    if (typeof props.error === "string") {
      return "Internal error";
    }

    if (typeof props.error == "object") {
      if (props.error.status === STATUS_TOO_MANY_REQUESTS) {
        return "Too many requests";
      }
    }

    return "Internal error";
  })();

  return <div className="error">{msg}</div>;
}
