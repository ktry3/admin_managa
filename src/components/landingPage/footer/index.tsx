import { Box, Grid, Typography, Button } from '@mui/material';

const Footer = () => {
  return (
    <Box className='bg-[$F9FAFE] g-padding py-[5%]'>
      <div className='g-padding'>
        <Grid
          container
          alignItems='center'
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            borderRadius: '20px',
            padding: '2rem',
          }}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Typography variant='h6' className='text-[#1A1A1A] font-semibold'>
              Get Started for free
            </Typography>
            <p className='text-[16px]'>
              Sign up and get $200 in credit for your first 60 days with DigitalOcean.
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Button
              variant='contained'
              color='primary'
              className='bg-[#0069FF] text-white'
              sx={{ borderRadius: '20px' }}>
              Get Started
            </Button>
            <p className='text-[12px] mt-[1rem]'>
              This promotional offer applies to new accounts only.
            </p>
          </Grid>
        </Grid>
        <Grid container justifyContent='center' alignItems='center' sx={{ marginTop: '4rem' }}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            SrongData © 2021 All rights reserved
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Footer;
