import React from "react"
import styled from "styled-components";

import {Img} from "./Img";

import a1 from "../image/avatars/1.svg"
import a2 from "../image/avatars/2.svg"
import a3 from "../image/avatars/3.svg"
import a4 from "../image/avatars/4.svg"
import a5 from "../image/avatars/5.svg"
import a6 from "../image/avatars/6.svg"
import a7 from "../image/avatars/7.svg"
import a8 from "../image/avatars/8.svg"
import a9 from "../image/avatars/9.svg"
import a10 from "../image/avatars/10.svg"
import a11 from "../image/avatars/11.svg"
import a12 from "../image/avatars/12.svg"
import a13 from "../image/avatars/13.svg"
import a14 from "../image/avatars/14.svg"
import a15 from "../image/avatars/15.svg"
import a16 from "../image/avatars/16.svg"
import a17 from "../image/avatars/17.svg"
import a18 from "../image/avatars/18.svg"
import a19 from "../image/avatars/19.svg"
import a20 from "../image/avatars/20.svg"
import a21 from "../image/avatars/21.svg"
import a22 from "../image/avatars/22.svg"
import a23 from "../image/avatars/23.svg"
import a24 from "../image/avatars/24.svg"
import a25 from "../image/avatars/25.svg"
import a26 from "../image/avatars/26.svg"
import a27 from "../image/avatars/27.svg"
import a28 from "../image/avatars/28.svg"
import a29 from "../image/avatars/29.svg"
import a30 from "../image/avatars/30.svg"
import a31 from "../image/avatars/31.svg"
import a32 from "../image/avatars/32.svg"
import a33 from "../image/avatars/33.svg"
import a34 from "../image/avatars/34.svg"
import a35 from "../image/avatars/35.svg"
import a36 from "../image/avatars/36.svg"
import a37 from "../image/avatars/37.svg"
import a38 from "../image/avatars/38.svg"
import a39 from "../image/avatars/39.svg"
import a40 from "../image/avatars/40.svg"
import a41 from "../image/avatars/41.svg"
import a42 from "../image/avatars/42.svg"
import a43 from "../image/avatars/43.svg"
import a44 from "../image/avatars/44.svg"
import a45 from "../image/avatars/45.svg"
import a46 from "../image/avatars/46.svg"
import a47 from "../image/avatars/47.svg"
import a48 from "../image/avatars/48.svg"
import a49 from "../image/avatars/49.svg"
import a50 from "../image/avatars/50.svg"
import a51 from "../image/avatars/51.svg"
import a52 from "../image/avatars/52.svg"
import a53 from "../image/avatars/53.svg"
import a54 from "../image/avatars/54.svg"
import a55 from "../image/avatars/55.svg"
import a56 from "../image/avatars/56.svg"
import a57 from "../image/avatars/57.svg"
import a58 from "../image/avatars/58.svg"
import a59 from "../image/avatars/59.svg"
import a60 from "../image/avatars/60.svg"
import a61 from "../image/avatars/61.svg"
import a62 from "../image/avatars/62.svg"
import a63 from "../image/avatars/63.svg"
import a64 from "../image/avatars/64.svg"
import a65 from "../image/avatars/65.svg"
import a66 from "../image/avatars/66.svg"
import a67 from "../image/avatars/67.svg"
import a68 from "../image/avatars/68.svg"
import a69 from "../image/avatars/69.svg"
import a70 from "../image/avatars/70.svg"

const avatars = [
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
    a10,
    a11,
    a12,
    a13,
    a14,
    a15,
    a16,
    a17,
    a18,
    a19,
    a20,
    a21,
    a22,
    a23,
    a24,
    a25,
    a26,
    a27,
    a28,
    a29,
    a30,
    a31,
    a32,
    a33,
    a34,
    a35,
    a36,
    a37,
    a38,
    a39,
    a40,
    a41,
    a42,
    a43,
    a44,
    a45,
    a46,
    a47,
    a48,
    a49,
    a50,
    a51,
    a52,
    a53,
    a54,
    a55,
    a56,
    a57,
    a58,
    a59,
    a60,
    a61,
    a62,
    a63,
    a64,
    a65,
    a66,
    a67,
    a68,
    a69,
    a70,
]

function hashCode(s: string) {
    return s.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
    }, 0)
}

function getAvatarForUID(uid: string) {
    return avatars[Math.abs(hashCode(uid)) % avatars.length]
}

function getAvatarForEmail(name: string, email: string, hash: string) {
    const slug = (name && name.trim().replace(/[^A-z]+/g, "")) || (email && email.trim()) || "Anonymous"
    let url = slug.toLowerCase().trim().substr(0, 2)
    return `https://s.gravatar.com/avatar/${hash}?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2F${url}.png`
}

const StyledAvatarContainer = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #e3e5e8;
`

const StyledAvatarImage = styled(Img)`
    width: 36px;
    opacity: 0.95;
    position: relative;
    top: 2px;
`

export function Avatar({isLoading, visitorName, visitorID, visitorEmail, visitorEmailHash}) {
    if (visitorEmail) {
        return (
            <StyledAvatarContainer>
                <StyledAvatarImage
                    isLoading={isLoading}
                    src={!isLoading && getAvatarForEmail(visitorName, visitorEmail, visitorEmailHash)}
                    alt="email-avatar"
                />
            </StyledAvatarContainer>
        )
    }

    return (
        <StyledAvatarContainer>
            <StyledAvatarImage
                isLoading={isLoading}
                src={!isLoading && getAvatarForUID(visitorID)}
                alt="email-avatar"
            />
        </StyledAvatarContainer>
    )
}
