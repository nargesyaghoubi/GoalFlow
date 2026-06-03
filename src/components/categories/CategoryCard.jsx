import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import en from "../../locales/en.json";
import fa from "../../locales/fa.json";
import de from "../../locales/de.json";

const locales = { en, fa, de };

const categoryColors = {
    Health: { bg: "#E8F5E9", text: "#2E7D32" },
    Study: { bg: "#E3F2FD", text: "#1565C0" },
    Work: { bg: "#FFF3E0", text: "#E65100" },
    Personal: { bg: "#F3E5F5", text: "#6A1B9A" },
    Finance: { bg: "#E0F7FA", text: "#00695C" },
    Other: { bg: "#F5F5F5", text: "#424242" },
};

export default function CategoryCard({ lang, category, activeCount, completedCount }) {
    const t = locales[lang];
    const colors = categoryColors[category] || categoryColors.Other;
    const total = activeCount + completedCount;
    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        display: "inline-block",
                        bgcolor: colors.bg,
                        color: colors.text,
                        borderRadius: 2,
                        px: 1.5,
                        py: 0.5,
                        mb: 2,
                    }}
                >
                    <Typography variant="subtitle2" fontWeight={700}>
                        {category}
                    </Typography>
                </Box>

                {/* Counts */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                        {t.activeCount}: <strong>{activeCount}</strong>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {t.completedCount}: <strong>{completedCount}</strong>
                    </Typography>
                </Box>

                {/* Progress */}
                <LinearProgress variant="determinate" value={percent} color="primary" />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                    {percent}%
                </Typography>

            </CardContent>
        </Card>
    );
}