import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import en from "../../locales/en.json";
import fa from "../../locales/fa.json";
import de from "../../locales/de.json";

const locales = { en, fa, de };

export default function Navbar({ lang, mode, onToggleMode, onLangChange, onMenuClick }) {
  const t = locales[lang];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ gap: 1 }}>

        <IconButton
          onClick={onMenuClick}
          sx={{ display: { sm: "none" } }}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          {t.appName}
        </Typography>

        {/* Language Switcher */}
        <Select
          value={lang}
          onChange={(e) => onLangChange(e.target.value)}
          size="small"
          sx={{
            fontSize: "0.85rem",
            fontWeight: 600,
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            bgcolor: "action.hover",
            borderRadius: 2,
          }}
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="fa">FA</MenuItem>
          <MenuItem value="de">DE</MenuItem>
        </Select>

       {/* Theme Toggle */}
        <Tooltip title={mode === "light" ? t.darkMode : t.lightMode}>
          <IconButton onClick={onToggleMode} color="inherit">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>

      </Toolbar>
    </AppBar>
  );
}