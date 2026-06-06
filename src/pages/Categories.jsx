import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { BarChart } from "@mui/x-charts/BarChart";

import CategoryCard from "../components/categories/CategoryCard";
import EmptyState from "../components/common/EmptyState";
import SummaryStats from "../components/dashboard/SummaryStats";

import en from "../locales/en.json";
import fa from "../locales/fa.json";
import de from "../locales/de.json";

const locales = { en, fa, de };

const ALL_CATEGORIES = ["Health", "Study", "Work", "Personal", "Finance", "Other"];

export default function Categories({ lang, goals, stats }) {
    const t = locales[lang];

    const categoriesWithGoals = ALL_CATEGORIES.filter((cat) =>
        goals.some((g) => g.category === cat)
    );

    const chartData = categoriesWithGoals.map((cat) => ({
        category: cat,
        active: goals.filter((g) => g.category === cat && g.status === "active").length,
        completed: goals.filter((g) => g.category === cat && g.status === "completed").length,
    }));

    return (
        <Box>

            <Typography variant="h5" sx={{ mb: 3 }}>{t.categoriesOverview}</Typography>

            <SummaryStats lang={lang} stats={stats} goals={goals} />

            {categoriesWithGoals.length === 0 ? (
                <EmptyState title={t.noData} />
            ) : (
                <>
                    {/* Bar Chart */}
                    <Paper sx={{ p: 3, mt: 4, mb: 3, overflowX: "auto" }}>
                        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                            {t.categoriesOverview}
                        </Typography>
                        <BarChart
                            height={280}
                            series={[
                                { data: chartData.map((d) => d.active), label: t.activeCount, color: "#6C63FF" },
                                { data: chartData.map((d) => d.completed), label: t.completedCount, color: "#43D9A2" },
                            ]}
                            xAxis={[{ data: chartData.map((d) => d.category), scaleType: "band" }]}
                        />
                    </Paper>

                    {/* Category Cards */}
                    <Grid container spacing={2}>
                        {categoriesWithGoals.map((cat) => {
                            const activeCount = goals.filter((g) => g.category === cat && g.status === "active").length;
                            const completedCount = goals.filter((g) => g.category === cat && g.status === "completed").length;

                            return (
                                <Grid item xs={12} sm={6} md={4} key={cat}>
                                    <CategoryCard
                                        lang={lang}
                                        category={cat}
                                        activeCount={activeCount}
                                        completedCount={completedCount}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}

        </Box>
    );
}