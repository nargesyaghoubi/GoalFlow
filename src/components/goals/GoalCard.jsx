import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";

import CategoryBadge from "../common/CategoryBadge";

import en from "../../locales/en.json";
import fa from "../../locales/fa.json";
import de from "../../locales/de.json";

const locales = { en, fa, de };

export default function GoalCard({ goal, lang, onMarkProgress, onPause, onDelete, onComplete }) {
    const t = locales[lang];
    const navigate = useNavigate();

    const percent = Math.min(Math.round((goal.progress / goal.target) * 100), 100);

    const statusColor = {
        active: "success.main",
        paused: "warning.main",
        completed: "primary.main",
    };

    return (
        <Card
            sx={{
                cursor: "pointer",
                "&:hover": { transform: "translateY(-2px)" },
                transition: "transform 0.2s ease",
            }}
            onClick={() => navigate(`/goals/${goal.id}`)}
        >
            <CardContent sx={{ pb: "12px !important" }}>

                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                        <CategoryBadge category={goal.category} />
                        <Typography
                            variant="caption"
                            sx={{ color: statusColor[goal.status], fontWeight: 600 }}
                        >
                            {t[goal.status]}
                        </Typography>
                    </Box>
                </Box>

                {/* Title */}
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                    {goal.title}
                </Typography>

                {/* Progress */}
                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                            {goal.progress} / {goal.target}
                        </Typography>
                        <Typography variant="caption" fontWeight={700} color="primary.main">
                            {percent}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={percent}
                        color={goal.status === "completed" ? "success" : "primary"}
                    />
                </Box>

                {/* Actions */}
                <Box
                    sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end", mt: 1 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {goal.status === "active" && (
                        <>
                            <Tooltip title={t.markProgress}>
                                <IconButton size="small" color="success" onClick={() => onMarkProgress(goal.id)}>
                                    <CheckCircleOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t.pause}>
                                <IconButton size="small" color="warning" onClick={() => onPause(goal.id, "paused")}>
                                    <PauseIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}

                    {goal.status === "paused" && (
                        <Tooltip title={t.resume}>
                            <IconButton size="small" color="success" onClick={() => onPause(goal.id, "active")}>
                                <PlayArrowIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Tooltip title={t.edit}>
                        <IconButton size="small" onClick={() => navigate(`/goals/${goal.id}?edit=true`)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={t.delete}>
                        <IconButton size="small" color="error" onClick={() => onDelete(goal.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>

            </CardContent>
        </Card>
    );
}