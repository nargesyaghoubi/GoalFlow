import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import en from "../locales/en.json";
import fa from "../locales/fa.json";
import de from "../locales/de.json";

const locales = { en, fa, de };

export default function Settings({ lang, mode, onToggleMode, onLangChange }) {
    const t = locales[lang];

    return (
        <Box>

            {/* Header */}
            <Typography variant="h5" sx={{ mb: 3 }}>{t.settings}</Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 480 }}>

                {/* Language */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                        {t.language}
                    </Typography>
                    <ToggleButtonGroup
                        value={lang}
                        exclusive
                        onChange={(_, val) => { if (val) onLangChange(val); }}
                    >
                        <ToggleButton value="en">English</ToggleButton>
                        <ToggleButton value="fa">فارسی</ToggleButton>
                        <ToggleButton value="de">Deutsch</ToggleButton>
                    </ToggleButtonGroup>
                </Paper>

                {/* Theme */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                        {t.theme}
                    </Typography>
                    <ToggleButtonGroup
                        value={mode}
                        exclusive
                        onChange={(_, val) => { if (val && val !== mode) onToggleMode(); }}
                    >
                        <ToggleButton value="light">
                            <LightModeIcon sx={{ mr: 1 }} fontSize="small" />
                            {t.lightMode}
                        </ToggleButton>
                        <ToggleButton value="dark">
                            <DarkModeIcon sx={{ mr: 1 }} fontSize="small" />
                            {t.darkMode}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Paper>

            </Box>

        </Box>
    );
}