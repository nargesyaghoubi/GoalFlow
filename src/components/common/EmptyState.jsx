import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import InboxIcon from "@mui/icons-material/Inbox";

export default function EmptyState({ title, description, actionLabel, onAction, icon }) {
    const Icon = icon || InboxIcon;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
                gap: 2,
                color: "text.secondary",
            }}
        >
            <Icon sx={{ fontSize: 64, opacity: 0.3 }} />

            <Typography variant="h6" fontWeight={600} color="text.primary">
                {title}
            </Typography>

            {description && (
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    {description}
                </Typography>
            )}

            {actionLabel && onAction && (
                <Button variant="contained" onClick={onAction} sx={{ mt: 1 }}>
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
}