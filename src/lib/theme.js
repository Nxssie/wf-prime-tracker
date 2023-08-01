'use client'
import {createTheme} from '@mui/material/styles';
import {purple, green} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
});
