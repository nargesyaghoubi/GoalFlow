import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import StarIcon from "@mui/icons-material/Star";
import PercentIcon from "@mui/icons-material/Percent";

import en from "../../locales/en.json";
import fa from "../../locales/fa.json";
import de from "../../locales/de.json";

const locales = { en, fa, de };

function StatCard({ icon, label, value, color }) {
    return (
        <Card>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                        sx={{
                            bgcolor: `${color}.main`,
                            color: "white",
                            borderRadius: 2,
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {icon}
                    </Box>
                    <Box>
                        <Typography variant="h5" fontWeight={800}>
                            {value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            {label}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default function SummaryStats({ lang, stats, goals }) {
    const t = locales[lang];

    const activeCount = goals.filter((g) => g.status === "active").length;
    const completedCount = goals.filter((g) => g.status === "completed").length;
    const totalGoals = goals.length;
    const completionPercent = totalGoals > 0 ? Math.round((completedCount / totalGoals) * 100) : 0;

    const items = [
        { icon: <PercentIcon />, label: t.completion, value: `${completionPercent}%`, color: "primary" },
        { icon: <EmojiEventsIcon />, label: t.totalCompleted, value: completedCount, color: "success" },
        { icon: <LocalFireDepartmentIcon />, label: t.streak, value: stats.streak, color: "warning" },
        { icon: <StarIcon />, label: t.xpPoints, value: stats.xpTotal, color: "secondary" },
    ];

    return (
        <Grid container spacing={2}>
            {items.map((item) => (
                <Grid
                    key={item.label}
                    size={{ xs: 6, md: 3 }}
                >
                    <StatCard {...item} />
                </Grid>
            ))}
        </Grid>
    );
}