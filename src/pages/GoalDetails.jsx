import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";

import CategoryBadge from "../components/common/CategoryBadge";
import GoalForm from "../components/goals/GoalForm";
import EmptyState from "../components/common/EmptyState";

import { calcNewStreak } from "../utils/streakCalc";
import { addXP, xpForLog, xpForComplete } from "../utils/xpCalc";

import en from "../locales/en.json";
import fa from "../locales/fa.json";
import de from "../locales/de.json";

const locales = { en, fa, de };

export default function GoalDetails({ lang, goals, stats, onGoalsChange, onStatsChange }) {
    const t = locales[lang];
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const isEditing = searchParams.get("edit") === "true";
    const goal = goals.find((g) => g.id === id);

    const [progressAmount, setProgressAmount] = useState(1);

    if (!goal) {
        return (
            <EmptyState
                title={t.noData}
                actionLabel={t.back}
                onAction={() => navigate("/goals")}
            />
        );
    }

    const percent = Math.min(Math.round((goal.progress / goal.target) * 100), 100);

    // Add Progress
    const handleAddProgress = () => {
        const today = new Date().toISOString().split("T")[0];
        const amount = Number(progressAmount) || 1;
        const newProgress = goal.progress + amount;
        const isCompleted = newProgress >= goal.target;

        const updatedGoals = goals.map((g) =>
            g.id === id
                ? {
                    ...g,
                    progress: newProgress,
                    status: isCompleted ? "completed" : g.status,
                    logs: [...(g.logs || []), { date: today, amount }],
                    updatedAt: today,
                }
                : g
        );

        onGoalsChange(updatedGoals);

        const xpGained = isCompleted ? xpForLog() + xpForComplete() : xpForLog();
        onStatsChange({
            ...stats,
            xpTotal: addXP(stats.xpTotal, xpGained),
            streak: calcNewStreak(stats.streak, stats.lastLogDate),
            lastLogDate: today,
        });
    };

    // Pause 
    const handlePause = () => {
        const newStatus = goal.status === "paused" ? "active" : "paused";
        onGoalsChange(goals.map((g) => (g.id === id ? { ...g, status: newStatus } : g)));
    };

    // Edit
    const handleEdit = (formData) => {
        onGoalsChange(
            goals.map((g) =>
                g.id === id ? { ...g, ...formData, updatedAt: new Date().toISOString() } : g
            )
        );
        setSearchParams({});
    };

    return (
        <Box>

            {/* Header*/}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5">{t.goalDetails}</Typography>
            </Box>

            {isEditing ? (
                <Paper sx={{ p: 3, maxWidth: 640 }}>
                    <GoalForm
                        lang={lang}
                        initialData={goal}
                        onSubmit={handleEdit}
                        onCancel={() => setSearchParams({})}
                    />
                </Paper>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 640 }}>

                    {/* Goal Info */}
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                <CategoryBadge category={goal.category} />
                                <Chip label={t[goal.status]} size="small" />
                                <Chip label={t[goal.type]} size="small" variant="outlined" />
                            </Box>
                            <IconButton size="small" onClick={() => setSearchParams({ edit: "true" })}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                            {goal.title}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {goal.progress} / {goal.target}
                                </Typography>
                                <Typography variant="body2" fontWeight={700} color="primary.main">
                                    {percent}%
                                </Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={percent} />
                        </Box>

                        <Typography variant="caption" color="text.secondary">
                            {t.created}: {new Date(goal.createdAt).toLocaleDateString()}
                        </Typography>

                        {goal.notes && (
                            <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                                {goal.notes}
                            </Typography>
                        )}
                    </Paper>

                    {/* Add Progress */}
                    {goal.status === "active" && (
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                                {t.addProgress}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                <TextField
                                    type="number"
                                    label={t.progressAmount}
                                    size="small"
                                    value={progressAmount}
                                    onChange={(e) => setProgressAmount(e.target.value)}
                                    inputProps={{ min: 1 }}
                                    sx={{ width: 120 }}
                                />
                                <Button variant="contained" startIcon={<CheckCircleIcon />} onClick={handleAddProgress}>
                                    {t.markProgress}
                                </Button>
                            </Box>
                        </Paper>
                    )}

                    {/* Actions */}
                    <Box sx={{ display: "flex", gap: 1 }}>
                        {goal.status !== "completed" && (
                            <Button
                                variant="outlined"
                                startIcon={goal.status === "paused" ? <PlayArrowIcon /> : <PauseIcon />}
                                onClick={handlePause}
                            >
                                {goal.status === "paused" ? t.resume : t.pause}
                            </Button>
                        )}
                    </Box>

                    {/* Progress History */}
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                            {t.progressHistory}
                        </Typography>
                        {!goal.logs || goal.logs.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">{t.noLogs}</Typography>
                        ) : (
                            <List disablePadding>
                                {[...goal.logs].reverse().map((log, i) => (
                                    <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                                        <ListItemText
                                            primary={log.date}
                                            secondary={`+${log.amount}`}
                                            primaryTypographyProps={{ variant: "body2" }}
                                            secondaryTypographyProps={{ color: "success.main", fontWeight: 600 }}
                                        />
                                        <Divider />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Paper>

                </Box>
            )}

        </Box>
    );
}