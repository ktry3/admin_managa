import React from "react";
import Link from "next/link";
import AuthActionContainer from "./auth-action";
import { Grid, Button, Box, Typography } from "@mui/material";

type MenuItem = {
  title: string;
  link: string;
};

const menuItem: MenuItem[] = [
  { title: "Products", link: "#" },
  { title: "Pricing", link: "/pricing" },
  { title: "Solutions", link: "#" },
  { title: "Partners", link: "#" },
];

const LandingPageNavbar = () => {
  return (
    <Box component="nav" className="navbar bg-slate-50">
      <Grid
        container
        className="g-padding bg-[#009688] py-2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item className="flex items-center">
          <Box>
            {/* <Image src='/dist/images/srongData.png' alt='DigitalOcean' width={210} height={40} /> */}
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              SrongData
            </Typography>
          </Box>
          <Grid item className="flex navbar-menu">
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
              }}
            >
              <Grid container spacing={2}>
                {menuItem.map((item) => (
                  <Grid item key={item.title}>
                    <Link href={item.link} passHref>
                      <Button sx={{ color: "white" }}>{item.title}</Button>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <AuthActionContainer>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Link href="/auth/login">
                  <Button variant="contained">Login</Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/register">
                  <Button variant="contained" color="primary">
                    Sign Up
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </AuthActionContainer>
      </Grid>
    </Box>
  );
};

export default LandingPageNavbar;
