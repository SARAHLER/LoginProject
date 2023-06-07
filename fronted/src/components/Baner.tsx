import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    // <h1>sa</h1>
    <Box>
   
          <AppBar
        position="static"
        sx={{
          flexGrow: 1,
          backgroundColor: "black",
          ".MuiPaper-root-MuiAppBar-root": {
            backgroundColor: "black !important",
          },
        }}
      >
        <Toolbar>
          <Box
            className="baner"
            sx={{
              alignItems: "flexStart",
              display: "flex",
              flexDirection: "column",
              color: "white",
            }}
          />
         <Box
  sx={{
    marginRight: "10px",
    "& a": {
      color: "white",
      textDecoration: "none",
      marginRight: "10px",
    },
  }}
>
  <Link className="banner-link" to="/">
    Home
  </Link>
  <Link className="banner-link" to="/">
    Login
  </Link>
  <Link className="banner-link" to="/">
    Register
  </Link>
</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
