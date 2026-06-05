import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import GoalForm from "../components/goals/GoalForm";

import en from "../locales/en.json";
import fa from "../locales/fa.json";
import de from "../locales/de.json";

const locales = { en, fa, de };

export default function CreateGoal({ lang, goals, onGoalsChange }) {
    const t = locales[lang];
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        const newGoal = {
            ...formData,
            id: crypto.randomUUID(),
            progress: 0,
            status: "active",
            logs: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        onGoalsChange([...goals, newGoal]);
        navigate("/goals");
    };

    return (
        <Box>

            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5">{t.createGoal}</Typography>
            </Box>

            {/* Form */}
            <Paper sx={{ p: 3, maxWidth: 640 }}>
                <GoalForm
                    lang={lang}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate(-1)}
                />
            </Paper>

        </Box>
    );
}