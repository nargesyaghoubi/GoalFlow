const XP_PER_LOG = 20;
const XP_ON_COMPLETE = 100;

/** XP for logging a progress entry */
export function xpForLog() {
    return XP_PER_LOG;
}

/** XP for completing a goal */
export function xpForComplete() {
    return XP_ON_COMPLETE;
}

/** Adds XP to current total */
export function addXP(currentXP, amount) {
    return currentXP + amount;
}