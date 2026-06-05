import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import SummaryStats from "../components/dashboard/SummaryStats";
import GoalCard from "../components/goals/GoalCard";
import EmptyState from "../components/common/EmptyState";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { calcNewStreak } from "../utils/streakCalc";
import { addXP, xpForLog, xpForComplete } from "../utils/xpCalc";

import en from "../locales/en.json";
import fa from "../locales/fa.json";
import de from "../locales/de.json";

const locales = { en, fa, de };

export default function Dashboard({ lang, goals, stats, onGoalsChange, onStatsChange }) {
    const t = locales[lang];
    const navigate = useNavigate();

    const [deleteId, setDeleteId] = useState(null);

    const activeGoals = goals.filter((g) => g.status === "active");
    const completedGoals = goals.filter((g) => g.status === "completed").slice(0, 3);

    // Mark Progress 
    const handleMarkProgress = (id) => {
        const today = new Date().toISOString().split("T")[0];

        const updatedGoals = goals.map((g) => {
            if (g.id !== id) return g;

            const newProgress = g.progress + 1;
            const isCompleted = newProgress >= g.target;
            const newLog = { date: today, amount: 1 };

            return {
                ...g,
                progress: newProgress,
                status: isCompleted ? "completed" : g.status,
                logs: [...(g.logs || []), newLog],
                updatedAt: today,
            };
        });

        onGoalsChange(updatedGoals);

        const goal = goals.find((g) => g.id === id);
        const isNowComplete = goal.progress + 1 >= goal.target;
        const xpGained = isNowComplete ? xpForLog() + xpForComplete() : xpForLog();
        const newStreak = calcNewStreak(stats.streak, stats.lastLogDate);

        onStatsChange({
            ...stats,
            xpTotal: addXP(stats.xpTotal, xpGained),
            streak: newStreak,
            lastLogDate: today,
        });
    };

    // Pause 
    const handlePause = (id, newStatus) => {
        const updatedGoals = goals.map((g) =>
            g.id === id ? { ...g, status: newStatus } : g
        );
        onGoalsChange(updatedGoals);
    };

    // Delete
    const handleDeleteConfirm = () => {
        onGoalsChange(goals.filter((g) => g.id !== deleteId));
        setDeleteId(null);
    };

    return (
        <Box>

            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5">{t.overview}</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="outlined" startIcon={<ListIcon />} onClick={() => navigate("/goals")}>
                        {t.viewAll}
                    </Button>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/goals/new")}>
                        {t.newGoal}
                    </Button>
                </Box>
            </Box>

            {/* Summary Stats */}
            <SummaryStats lang={lang} stats={stats} goals={goals} />

            {/* Active Goals */}
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>{t.activeGoals}</Typography>

            {activeGoals.length === 0 ? (
                <EmptyState
                    title={t.noActiveGoals}
                    actionLabel={t.newGoal}
                    onAction={() => navigate("/goals/new")}
                />
            ) : (
                <Grid container spacing={2}>
                    {activeGoals.map((goal) => (
                        <Grid item xs={12} sm={6} md={4} key={goal.id}>
                            <GoalCard
                                goal={goal}
                                lang={lang}
                                onMarkProgress={handleMarkProgress}
                                onPause={handlePause}
                                onDelete={(id) => setDeleteId(id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Completed Preview */}
            {completedGoals.length > 0 && (
                <>
                    <Divider sx={{ my: 4 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6">{t.recentlyCompleted}</Typography>
                        <Button size="small" onClick={() => navigate("/goals")}>
                            {t.viewAll}
                        </Button>
                    </Box>
                    <Grid container spacing={2}>
                        {completedGoals.map((goal) => (
                            <Grid item xs={12} sm={6} md={4} key={goal.id}>
                                <GoalCard
                                    goal={goal}
                                    lang={lang}
                                    onMarkProgress={handleMarkProgress}
                                    onPause={handlePause}
                                    onDelete={(id) => setDeleteId(id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {/* Delete Dialog */}
            <ConfirmDialog
                open={!!deleteId}
                title={t.deleteGoal}
                description={t.confirmDelete}
                confirmLabel={t.delete}
                cancelLabel={t.cancel}
                severity="error"
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteId(null)}
            />

        </Box>
    );
}