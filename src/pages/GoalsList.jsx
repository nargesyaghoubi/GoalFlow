import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import GoalCard from "../components/goals/GoalCard";
import EmptyState from "../components/common/EmptyState";
import ConfirmDialog from "../components/common/ConfirmDialog";
import SummaryStats from "../components/dashboard/SummaryStats";

import { calcNewStreak } from "../utils/streakCalc";
import { addXP, xpForLog, xpForComplete } from "../utils/xpCalc";

import en from "../locales/en.json";
import fa from "../locales/fa.json";
import de from "../locales/de.json";

const locales = { en, fa, de };

const TABS = ["all", "active", "paused", "completed"];
const SORTS = ["newest", "progress", "category"];

export default function GoalsList({ lang, goals, stats, onGoalsChange, onStatsChange }) {
    const t = locales[lang];
    const navigate = useNavigate();

    const [tab, setTab] = useState("all");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");
    const [deleteId, setDeleteId] = useState(null);

    const filtered = goals
        .filter((g) => (tab === "all" ? true : g.status === tab))
        .filter((g) => g.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
            if (sort === "progress") return b.progress / b.target - a.progress / a.target;
            if (sort === "category") return a.category.localeCompare(b.category);
            return 0;
        });

    const handleMarkProgress = (id) => {
        const today = new Date().toISOString().split("T")[0];
        const updatedGoals = goals.map((g) => {
            if (g.id !== id) return g;
            const newProgress = g.progress + 1;
            const isCompleted = newProgress >= g.target;
            return {
                ...g,
                progress: newProgress,
                status: isCompleted ? "completed" : g.status,
                logs: [...(g.logs || []), { date: today, amount: 1 }],
                updatedAt: today,
            };
        });
        onGoalsChange(updatedGoals);
        const goal = goals.find((g) => g.id === id);
        const isNowComplete = goal.progress + 1 >= goal.target;
        const xpGained = isNowComplete ? xpForLog() + xpForComplete() : xpForLog();
        onStatsChange({
            ...stats,
            xpTotal: addXP(stats.xpTotal, xpGained),
            streak: calcNewStreak(stats.streak, stats.lastLogDate),
            lastLogDate: today,
        });
    };

    const handlePause = (id, newStatus) => {
        onGoalsChange(goals.map((g) => (g.id === id ? { ...g, status: newStatus } : g)));
    };

    const handleDeleteConfirm = () => {
        onGoalsChange(goals.filter((g) => g.id !== deleteId));
        setDeleteId(null);
    };

    const emptyKey = tab === "active" ? "noActiveGoals" : tab === "paused" ? "noPausedGoals" : "noCompletedGoals";

    return (
        <Box>

            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5">{t.allGoals}</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/goals/new")}>
                    {t.newGoal}
                </Button>
            </Box>

            {/* Summary Stats */}
            <SummaryStats lang={lang} stats={stats} goals={goals} />

            {/*  Tabs */}
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mt: 3, mb: 2 }}>
                {TABS.map((key) => (
                    <Tab key={key} label={t[key] || key} value={key} />
                ))}
            </Tabs>

            <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                <TextField
                    size="small"
                    placeholder={t.search}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ flex: 1, minWidth: 200 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    select
                    size="small"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    sx={{ minWidth: 140 }}
                >
                    {SORTS.map((s) => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                    ))}
                </TextField>
            </Box>

            {/* Goals Grid */}
            {filtered.length === 0 ? (
                <EmptyState
                    title={t[emptyKey] || t.noData}
                    actionLabel={tab === "all" ? t.newGoal : undefined}
                    onAction={tab === "all" ? () => navigate("/goals/new") : undefined}
                />
            ) : (
                <Grid container spacing={2}>
                    {filtered.map((goal) => (
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