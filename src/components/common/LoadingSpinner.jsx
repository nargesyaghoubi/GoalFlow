import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function LoadingSpinner({ text }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
                gap: 2,
            }}
        >
            <CircularProgress size={40} />
            {text && (
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            )}
        </Box>
    );
}