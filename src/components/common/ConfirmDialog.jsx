import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function ConfirmDialog({ open, title, description, confirmLabel, cancelLabel, onConfirm, onCancel, severity }) {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
            <DialogTitle fontWeight={700}>{title}</DialogTitle>

            {description && (
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
            )}

            <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
                <Button onClick={onCancel} variant="outlined" color="inherit">
                    {cancelLabel}
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color={severity === "error" ? "error" : "primary"}
                >
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}