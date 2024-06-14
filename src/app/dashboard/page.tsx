"use client";
import React, {  useState } from "react";
import { Grid, Badge } from "@mui/material";;
import ServerChart from "@/components/charts/server-chart";
import GridBarTop from "@/components/dashboard/bar-top/bar-top";
import CustomizedTables from "@/components/dashboard/data-table-filter/table-tenant";
import GridBarBottom from "@/components/dashboard/bar-top/bar-bottom";

export default function Dashboard() {
  return (
    <main>
      {/* <div className='flex justify-between mb-[1%]'>
        <div className='flex items-center'>
          <DashboardIcon />
          <p>Dashboard</p>
        </div>
        <div className='flex items-center'>
          <Button variant='contained' color='primary' className='mr-2'>
            Calibration
          </Button>
          <Button variant='contained' onClick={() => setOpenRequestLog(!isOpenRequestLog)}>
            <Badge badgeContent={4} color='success' sx={{ marginRight: '1rem' }}>
              <MailIcon sx={{ color: 'white' }} />
            </Badge>
            Request Logs
          </Button>
        </div>
      </div> */}
      <Grid style={{ paddingBottom: "20px" }}>
        <GridBarTop />
      </Grid>

      <Grid container spacing={3} style={{ paddingBottom: "20px" }}>
        <Grid item xs={8}>
          <div className="g-dashboard-boxShadow h-[100%] p-[1rem]">
            <CustomizedTables />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="g-dashboard-boxShadow h-[100%] p-[1rem] flex justify-center">
            <ServerChart />
          </div>
        </Grid>
      </Grid>

      <Grid>
        <GridBarBottom />
      </Grid>
      {/* <Grid container spacing={3}>
        <Grid item xs={isOpenRequestLog ? 8.5 : 12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableDataFilteringSelect />
            </Grid>

            <Grid item xs={7.5}>
              <div className="g-dashboard-boxShadow h-[100%] p-[1rem]">
                <BarChartCard />
              </div>
            </Grid>
          </Grid>
        </Grid>
        {isOpenRequestLog && (
          <Grid item xs={3.5}>
            <RequestLogs />
          </Grid>
        )}
      </Grid> */}
    </main>
  );
}
