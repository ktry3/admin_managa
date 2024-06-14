import * as React from "react";
import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import Stack from "@mui/material/Stack";
// import { HighlightedCode } from '@mui/docs/HighlightedCode';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

export default function BorderRadius() {
  const [layout, setLayout] = React.useState<"horizontal" | "vertical">(
    "vertical"
  );
  const [radius, setRadius] = React.useState(10);

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        width: "100%",
        maxWidth: 600,
      }}
    >
      <Stack
        direction="row"
        spacing={4}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {/* <Stack direction="column" spacing={1} flex={1}>
          <Typography gutterBottom>Border Radius</Typography>
          <Slider
            value={radius}
            onChange={(e, v) => setRadius(v as number)}
            valueLabelDisplay="auto"
            min={10}
            max={50}
            sx={{ mt: 2 }}
          />
        </Stack> */}
        <p className="text-blue-500 text-lg">The Subscribe Tenant</p>

        <TextField
          select
          sx={{ minWidth: 150 }}
          label="layout"
          value={layout}
          onChange={(event) =>
            setLayout(event.target.value as "horizontal" | "vertical")
          }
        >
          <MenuItem value="horizontal">Horizontal</MenuItem>
          <MenuItem value="vertical">Vertical</MenuItem>
        </TextField>
      </Stack>
      <BarChart
        series={[
          { dataKey: "high", label: "Unpaid", layout, stack: "stack" },
          { dataKey: "low", label: "paid", layout, stack: "stack" },
        ]}
        {...(layout === "vertical" ? chartSettingsV : chartSettingsH)}
        borderRadius={radius}
      />
    </Stack>
  );
}

const dataset = [
  [3, 7, "Server 1"],
  [3, 4, "Server 2"],
  [2, 8, "Server 3"],
  [4, 5, "Server 4"],
].map(([high, low, order]) => ({
  high,
  low,
  order,
}));
const chartSettingsH: Partial<BarChartProps> = {
  dataset,
  height: 300,
  yAxis: [{ scaleType: "band", dataKey: "order" }],
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
  slotProps: {
    legend: {
      direction: "row",
      position: { vertical: "bottom", horizontal: "middle" },
      padding: -5,
    },
  },
};
const chartSettingsV: Partial<BarChartProps> = {
  ...chartSettingsH,
  xAxis: [{ scaleType: "band", dataKey: "order" }],
  yAxis: undefined,
};
