import { useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import DashboardIcon from "@mui/icons-material/Dashboard";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";

import en from "../../locales/en.json";
import fa from "../../locales/fa.json";
import de from "../../locales/de.json";

const locales = { en, fa, de };

const SIDEBAR_WIDTH = 220;

const navItems = [
    { key: "dashboard", path: "/", icon: <DashboardIcon /> },
    { key: "goals", path: "/goals", icon: <TrackChangesIcon /> },
    { key: "categories", path: "/categories", icon: <CategoryIcon /> },
    { key: "settings", path: "/settings", icon: <SettingsIcon /> },
];

function SidebarContent({ lang, onClose }) {
    const t = locales[lang];
    const location = useLocation();
    const navigate = useNavigate();

    const handleNav = (path) => {
        navigate(path);
        if (onClose) onClose();
    };

    return (
        <Box sx={{ width: SIDEBAR_WIDTH, pt: 2 }}>
            <Typography
                variant="caption"
                sx={{ px: 2, color: "text.secondary", fontWeight: 600, letterSpacing: 1 }}
            >
                MENU
            </Typography>

            <Divider sx={{ my: 1 }} />

            <List disablePadding>
                {navItems.map((item) => {
                    const isActive =
                        item.path === "/"
                            ? location.pathname === "/"
                            : location.pathname.startsWith(item.path);

                    return (
                        <ListItemButton
                            key={item.key}
                            onClick={() => handleNav(item.path)}
                            sx={{
                                mx: 1,
                                borderRadius: 2,
                                mb: 0.5,
                                bgcolor: isActive ? "primary.main" : "transparent",
                                color: isActive ? "primary.contrastText" : "text.primary",
                                "&:hover": {
                                    bgcolor: isActive ? "primary.dark" : "action.hover",
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 36,
                                    color: isActive ? "primary.contrastText" : "text.secondary",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={t[item.key]}
                                slotProps={{
                                    primary: {
                                        sx: {
                                            fontWeight: isActive ? 700 : 500,
                                            fontSize: "0.9rem",
                                        },
                                    },
                                }}
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </Box>
    );
}

export default function Sidebar({ lang, open, onClose }) {
    return (
        <>
            {/* Desktop: permanent sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: SIDEBAR_WIDTH,
                        boxSizing: "border-box",
                        position: "relative",
                        height: "calc(100vh - 64px)",
                        borderRight: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                    },
                }}
            >
                <SidebarContent lang={lang} />
            </Drawer>

            {/* Mobile: temporary drawer */}
            <Drawer
                variant="temporary"
                open={open}
                onClose={onClose}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        width: SIDEBAR_WIDTH,
                        bgcolor: "background.paper",
                    },
                }}
            >
                <SidebarContent lang={lang} onClose={onClose} />
            </Drawer>
        </>
    );
}