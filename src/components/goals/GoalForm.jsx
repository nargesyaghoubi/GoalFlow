import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import en from "../../locales/en.json";
import fa from "../../locales/fa.json";
import de from "../../locales/de.json";

const locales = { en, fa, de };

const CATEGORIES = ["Health", "Study", "Work", "Personal", "Finance", "Other"];
const GOAL_TYPES = ["daily", "countBased", "timeBased"];

const defaultForm = {
    title: "",
    category: "",
    type: "daily",
    target: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    notes: "",
};

export default function GoalForm({ lang, initialData, onSubmit, onCancel }) {
    const t = locales[lang];

    const [form, setForm] = useState(initialData || defaultForm);
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = t.titleRequired;
        if (!form.category) newErrors.category = t.categoryRequired;
        if (!form.target) newErrors.target = t.targetRequired;
        if (Number(form.target) < 1) newErrors.target = t.targetMin;
        return newErrors;
    };

    const handleSubmit = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onSubmit({ ...form, target: Number(form.target) });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

            {/* Title */}
            <TextField
                label={t.titleLabel}
                placeholder={t.titlePlaceholder}
                value={form.title}
                onChange={handleChange("title")}
                error={!!errors.title}
                helperText={errors.title}
                fullWidth
            />

            {/* Category + Goal Type */}

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                    select
                    label={t.categoryLabel}
                    value={form.category}
                    onChange={handleChange("category")}
                    error={!!errors.category}
                    helperText={errors.category}
                    sx={{ flex: 1, minWidth: 160 }}
                >
                    {CATEGORIES.map((cat) => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label={t.goalType}
                    value={form.type}
                    onChange={handleChange("type")}
                    sx={{ flex: 1, minWidth: 160 }}
                >
                    {GOAL_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>{t[type]}</MenuItem>
                    ))}
                </TextField>
            </Box>

            {/* Target */}
            <TextField
                label={t.targetLabel}
                type="number"
                value={form.target}
                onChange={handleChange("target")}
                error={!!errors.target}
                helperText={errors.target}
                fullWidth
                inputProps={{ min: 1 }}
            />

            {/* Start Date + End Date */}
            
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                    label={t.startDate}
                    type="date"
                    value={form.startDate}
                    onChange={handleChange("startDate")}
                    sx={{ flex: 1, minWidth: 160 }}
                    InputLabelProps={{ shrink: true }}
                />
                <Box sx={{ flex: 1, minWidth: 160 }}>
                    <TextField
                        label={t.endDate}
                        type="date"
                        value={form.endDate}
                        onChange={handleChange("endDate")}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: form.startDate }}
                    />
                </Box>
            </Box>

            {/* Notes */}
            <TextField
                label={t.notes}
                placeholder={t.notesPlaceholder}
                value={form.notes}
                onChange={handleChange("notes")}
                multiline
                rows={3}
                fullWidth
            />

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                {onCancel && (
                    <Button variant="outlined" color="inherit" onClick={onCancel}>
                        {t.cancel}
                    </Button>
                )}
                <Button variant="contained" onClick={handleSubmit}>
                    {t.save}
                </Button>
            </Box>

        </Box>
    );
}