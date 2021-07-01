import React from "react";

interface VisitedCountProps {
  count: number;
}

export function VisitedCount(props: VisitedCountProps) {
  return (
    <React.Fragment>
      <i className="ion-arrow-return-left visited-count-icon" />
      {props.count}
    </React.Fragment>
  );
}
