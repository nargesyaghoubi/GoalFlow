function toDateString(date) {
    return new Date(date).toISOString().split("T")[0];
}

function isYesterday(dateStr) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return toDateString(yesterday) === dateStr;
}

function isToday(dateStr) {
    return toDateString(new Date()) === dateStr;
}

// Main
export function calcNewStreak(currentStreak, lastLogDate) {
    if (!lastLogDate) return 1;

    const last = toDateString(lastLogDate);

    if (isToday(last)) return currentStreak;
    if (isYesterday(last)) return currentStreak + 1;
    return 1;
}