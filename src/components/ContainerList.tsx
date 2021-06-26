import React from "react";

interface ContainerListProps {
    gap: 15 | 10 | 5;
    children: React.ReactElement
}

export function ContainerList(props: ContainerListProps) {
    const classNames = ["container-list"]

    if (props.gap) {
        classNames.push(`gap-${props.gap}`)
    }

    return <div className={classNames.join(" ")}>
        {props.children}
    </div>
}