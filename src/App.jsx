import { useMemo, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import getTheme from "./Theme/theme";
import { getGoals, saveGoals, getStats, saveStats } from "./utils/storage";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import GoalsList from "./pages/GoalsList";
import CreateGoal from "./pages/CreateGoal";
import GoalDetails from "./pages/GoalDetails";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export default function App() {
    // Settings State
    const [mode, setMode] = useState("light");
    const [lang, setLang] = useState("en");

    const direction = lang === "fa" ? "rtl" : "ltr";
    const theme = useMemo(() => getTheme(mode, direction), [mode, direction]);

    useEffect(() => {
        document.documentElement.dir = direction;
        document.documentElement.lang = lang;
      }, [direction, lang]);

    const toggleMode = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    const handleLangChange = (newLang) => {
        setLang(newLang);
    };

    // Goals State 
    const [goals, setGoals] = useState(() => getGoals());
    const [stats, setStats] = useState(() => getStats());

    const handleGoalsChange = (newGoals) => {
        setGoals(newGoals);
        saveGoals(newGoals);
    };

    const handleStatsChange = (newStats) => {
        setStats(newStats);
        saveStats(newStats);
    };

    // Shared Props
    const sharedProps = {
        lang,
        mode,
        goals,
        stats,
        onGoalsChange: handleGoalsChange,
        onStatsChange: handleStatsChange,
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout
                                lang={lang}
                                mode={mode}
                                onToggleMode={toggleMode}
                                onLangChange={handleLangChange}
                            />
                        }
                    >
                        <Route index element={<Dashboard {...sharedProps} />} />
                        <Route path="goals" element={<GoalsList {...sharedProps} />} />
                        <Route path="goals/new" element={<CreateGoal {...sharedProps} />} />
                        <Route path="goals/:id" element={<GoalDetails {...sharedProps} />} />
                        <Route path="categories" element={<Categories {...sharedProps} />} />
                        <Route
                            path="settings"
                            element={
                                <Settings
                                    {...sharedProps}
                                    onToggleMode={toggleMode}
                                    onLangChange={handleLangChange}
                                />
                            }
                        />
                    </Route>

                    <Route path="*" element={<NotFound lang={lang} />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}