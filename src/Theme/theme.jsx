import { createTheme } from "@mui/material/styles";

export const categoryColors = {
  Health:   { bg: "#E8F5E9", text: "#2E7D32" },
  Study:    { bg: "#E3F2FD", text: "#1565C0" },
  Work:     { bg: "#FFF3E0", text: "#E65100" },
  Personal: { bg: "#F3E5F5", text: "#6A1B9A" },
  Finance:  { bg: "#E0F7FA", text: "#00695C" },
  Other:    { bg: "#F5F5F5", text: "#424242" },
};

export default function getTheme(mode = "light", direction = "ltr") {
  return createTheme({
    direction,
    palette: {
      mode,
      primary: { main: "#6C63FF" },
      secondary: { main: "#FF6584" },
      success: { main: "#43D9A2" },
      warning: { main: "#FFB547" },
      error: { main: "#FF5252" },
      background: {
        default: mode === "light" ? "#F7F8FC" : "#0F0F1A",
        paper:   mode === "light" ? "#FFFFFF"  : "#1A1A2E",
      },
      text: {
        primary:   mode === "light" ? "#1A1A2E" : "#F0F0FF",
        secondary: mode === "light" ? "#5A5A7A" : "#9090B0",
      },
      divider: mode === "light" ? "#EAEAF4" : "#2A2A3E",
    },
    typography: {
      fontFamily: ["Vazirmatn", "Plus Jakarta Sans", "sans-serif"].join(","),
      h5: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCard: {
        styleOverrides: { root: { borderRadius: 16 } },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10, boxShadow: "none" },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            height: 8,
            backgroundColor: mode === "light" ? "#EEF0F7" : "#2A2A3E",
          },
          bar: { borderRadius: 6 },
        },
      },
      MuiDialog: {
        styleOverrides: { paper: { borderRadius: 20 } },
      },
    },
  });
}