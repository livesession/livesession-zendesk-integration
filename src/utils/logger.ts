export function debug(mod: string, ...args: any[]) {
    if (process.env.DEBUG) {
        console.log("[LS][" + mod + "]", ...args)
    }
}

export function errorLog(mod: string, ...args: any[]) {
    console.error("[LS][" + mod + "]", ...args)
}