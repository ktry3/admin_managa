"use client";
import React from "react";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface CustomComponentProps {
  text: string;
  iconName: string;
}

const CustomComponent: React.FC<CustomComponentProps> = ({
  text,
  iconName,
}) => (
  <Paper
    elevation={3}
    sx={{
      display: "flex",
      justifyContent: "center",
      height: "100%",
      flexDirection: "column",
      padding: 1,
      backgroundColor: "#2E96FF",
    }}
  >
    <Typography
      sx={{
        color: "white", // Change to your desired color
        fontWeight: "bold",
        fontSize: "1.2rem", // Adjust the font size as needed
      }}
    >
      {text}
    </Typography>
    <Typography
      sx={{
        color: "white", // Change to your desired color
      }}
    >
      this is the most ironic way.
    </Typography>

    <Typography
      sx={{
        color: "white", // Change to your desired color
        fontWeight: "bold",
        fontSize: "3rem", // Adjust the font size as needed
        display: "flex",
      }}
    >
      86
    </Typography>
  </Paper>
);

const GridBarTop: React.FC = () => {
  const items = [
    { text: "Subscribed Tenant", iconName: "subscriptions" },
    { text: "Free Plan Tenant", iconName: "free_breakfast" },
    { text: "Unpaid Tenant", iconName: "payment" },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        height: 180,
        backgroundColor: "#E6F4F1",
      }}
    >
      <Grid container spacing={2} sx={{ height: "100%" }}>
        {items.map(({ text, iconName }, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={2.5}>
            <CustomComponent text={text} iconName={iconName} />
          </Grid>
        ))}
        <Grid item xs={4.5}>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: 1,
              height: "100%",
              color: "#1565C0",
              backgroundColor: "#6F53C0",
            }}
          >
            <Typography
              sx={{
                color: "#F4F9FF", // Change to your desired color
                fontWeight: "bold",
                fontSize: "1.2rem", // Adjust the font size as needed
              }}
            >
              Total Tenant
            </Typography>
            <Typography
              sx={{
                color: "white", // Change to your desired color
              }}
            >
              this is the most ironic way.
            </Typography>

            <Typography
              sx={{
                color: "white", // Change to your desired color
                fontWeight: "bold",
                fontSize: "3rem", // Adjust the font size as needed
                display: "flex",
              }}
            >
              86
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GridBarTop;
