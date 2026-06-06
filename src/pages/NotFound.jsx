import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import HomeIcon from "@mui/icons-material/Home";

import en from "../locales/en.json";
import fa from "../locales/fa.json";
import de from "../locales/de.json";

const locales = { en, fa, de };

export default function NotFound({ lang = "en" }) {
    const t = locales[lang];
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                bgcolor: "background.default",
            }}
        >
            <Typography variant="h1" fontWeight={800} color="primary.main">
                404
            </Typography>

            <Typography variant="h5" fontWeight={600}>
                {t.notFound}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                {t.notFoundMsg}
            </Typography>

            <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={() => navigate("/")}
                sx={{ mt: 1 }}
            >
                {t.goHome}
            </Button>
        </Box>
    );
}