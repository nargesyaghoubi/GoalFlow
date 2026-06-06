const KEYS = {
    goals: "goaltracker_goals",
    stats: "goaltracker_stats",
};

const defaultStats = {
    xpTotal: 0,
    streak: 0,
    lastLogDate: null,
};

// Goals

export function getGoals() {
    try {
        const data = localStorage.getItem(KEYS.goals);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function saveGoals(goals) {
    localStorage.setItem(KEYS.goals, JSON.stringify(goals));
}

// Stats 

export function getStats() {
    try {
        const data = localStorage.getItem(KEYS.stats);
        return data ? JSON.parse(data) : defaultStats;
    } catch {
        return defaultStats;
    }
}

export function saveStats(stats) {
    localStorage.setItem(KEYS.stats, JSON.stringify(stats));
}