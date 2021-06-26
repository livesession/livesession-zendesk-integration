import React from "react"
import {format} from "date-fns"

import {Visitor} from "../core/objects";
import {Avatar} from "./Avatar";
import {VisitedCount} from "./VisitedCount";
import {placeholderWrapper} from "./Placeholder";
import {ISO_COUNTRIES} from "../const/countries";
import {CountryCode} from "./CountryCode";

interface VisitorCardProps {
    visitor: Visitor
    isLoading: boolean
}

function getCountryName(countryCode) {
    if (ISO_COUNTRIES.hasOwnProperty(countryCode)) {
        return ISO_COUNTRIES[countryCode]
    } else {
        return countryCode
    }
}

function name(visitor: Visitor) {
    if (visitor.name) {
        return visitor.name
    }

    const shortID = visitor.id.split("-")

    if (!visitor.geolocation) {
        return shortID[0]
    }

    if (visitor.geolocation.city) {
        return `User from ${visitor.geolocation.city}`
    }

    if (visitor.geolocation.country_code) {
        return `User from ${getCountryName(visitor.geolocation.country_code)}`
    }

    return shortID[0]
}

function renderSince(visitor: Visitor) {
    const m = format(visitor.first_session_timestamp, "LLL d")
    const date = `Since ${m.split(",")[0]}`

    return (
        <div className="visitor-card-since">
            <VisitedCount count={visitor.sessions_statistics.count}/>
            <div className="visitor-card-since-date">
                {date}
            </div>
        </div>
    )
}

export function VisitorCard(props: VisitorCardProps) {
    const visitor = props.visitor || {} as Visitor
    const isLoading = !props.visitor || props.isLoading

    const ph = placeholderWrapper(isLoading)

    return <div className="visitor-card">
        <div className="visitor-card-avatar-container">
            <Avatar
                isLoading={isLoading}
                visitorName={visitor.name}
                visitorEmail={visitor.email}
                visitorEmailHash={visitor.email_hash}
                visitorID={visitor.id}
            />
        </div>

        <div className="visitor-card-description-container">
            <div className="visitor-card-description-header">
                <div>
                    {ph(() => name(visitor))}
                </div>
                <div>
                    {ph(() =>
                        <CountryCode
                            code={visitor.geolocation?.country_code}
                        />
                    )}
                </div>
            </div>
            <div className="visitor-card-description-bottom">
                {ph(() => renderSince(visitor))}
            </div>
        </div>
    </div>
}
