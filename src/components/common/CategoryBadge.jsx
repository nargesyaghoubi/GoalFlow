import Chip from "@mui/material/Chip";

const categoryColors = {
    Health: { bg: "#E8F5E9", text: "#2E7D32" },
    Study: { bg: "#E3F2FD", text: "#1565C0" },
    Work: { bg: "#FFF3E0", text: "#E65100" },
    Personal: { bg: "#F3E5F5", text: "#6A1B9A" },
    Finance: { bg: "#E0F7FA", text: "#00695C" },
    Other: { bg: "#F5F5F5", text: "#424242" },
};

export default function CategoryBadge({ category }) {
    const colors = categoryColors[category] || categoryColors.Other;

    return (
        <Chip
            label={category}
            size="small"
            sx={{
                bgcolor: colors.bg,
                color: colors.text,
                fontWeight: 600,
                fontSize: "0.75rem",
                borderRadius: 1.5,
            }}
        />
    );
}