import { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const SIDEBAR_WIDTH = 220;

export default function Layout({ lang, mode, onToggleMode, onLangChange }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <Navbar
                lang={lang}
                mode={mode}
                onToggleMode={onToggleMode}
                onLangChange={onLangChange}
                onMenuClick={() => setSidebarOpen((p) => !p)}
            />

            <Box sx={{ display: "flex" }}>
                <Sidebar
                    lang={lang}
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        py: 3,
                        px: { xs: 2, sm: 3 },
                        minWidth: 0,
                        width: isMobile ? "100%" : `calc(100% - ${SIDEBAR_WIDTH}px)`,
                        minHeight: "calc(100vh - 64px)",
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}