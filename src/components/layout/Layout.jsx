import { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ lang, mode, onToggleMode, onLangChange }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleMenuClick = () => {
        setSidebarOpen((prev) => !prev);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <Navbar
                lang={lang}
                mode={mode}
                onToggleMode={onToggleMode}
                onLangChange={onLangChange}
                onMenuClick={handleMenuClick}
            />

            <Box sx={{ display: "flex" }}>
                <Sidebar
                    lang={lang}
                    open={sidebarOpen}
                    onClose={handleSidebarClose}
                />

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        py: 3,
                        px: { xs: 2, sm: 3 },
                        minHeight: "calc(100vh - 64px)",
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}