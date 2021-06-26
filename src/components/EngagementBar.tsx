import React from "react";

const engagementColors = ["#55C8FF", "#4DB5FF", "#3196FF", "#297FF8", "#1058E8"]

export function EngagementBar({score}) {
    const res = []
    for (let i = 0; i < score; i++) {
        res.push(
            <div
                key={i}
                style={{
                    background: engagementColors[i]
                }}
                className="engagement-score-item"
            />
        )
    }

    return res.slice(0, 5)
}