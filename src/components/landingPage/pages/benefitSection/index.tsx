import { Box, Grid, Typography } from '@mui/material';
import ImageCard from '../../ImageCard';

const BenefitSection = () => {
  return (
    <Box className='g-padding py-[5%] bg-[url("https://www.digitalocean.com/_next/static/media/benefits-bg.d8486e3e.svg")]'>
      <Grid container justifyContent='center' spacing={5}>
        <Grid item xs={6} className='text-center'>
          <Typography variant='h4' className='font-bold text-center' gutterBottom>
            Benefits to activate the builder in you
          </Typography>
          <Typography variant='body2' className='text-[1rem] text-gray-500'>
            From simple tools and predictable pricing to support designed for growing businesses,
            DigitalOcean cloud is built to serve the unique needs of startups and SMBs.
          </Typography>
        </Grid>
        <Grid item xs={12} className='g-padding'>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <ImageCard
                containerStyle={'py-[5%] bg-[white]'}
                cardShadow
                mainImageSize={3}
                mainImageStyle={'p-[2rem] h-[100%]'}
                mainImage='/dist/images/ceo.jpg'
                description='
                <p class="text-[1rem] mb-[0.5rem] font-semibold text-gray-500">Build and ship faster using simple tools</p> 
                <p class="text-[1rem] text-gray-500">All of our products are built with simplicity at their core, so you can spend your time focusing on building apps, not infrastructure.</p>'
                descriptionSize={9}
              />
            </Grid>
            <Grid item xs={6}>
              <ImageCard
                containerStyle={'py-[5%] bg-[white]'}
                cardShadow
                mainImageSize={3}
                mainImageStyle={'p-[2rem] h-[100%]'}
                mainImage='/dist/images/ceo.jpg'
                description='
                <p class="text-[1rem] mb-[0.5rem] font-semibold text-gray-500">Build and ship faster using simple tools</p> 
                <p class="text-[1rem] text-gray-500">All of our products are built with simplicity at their core, so you can spend your time focusing on building apps, not infrastructure.</p>'
                descriptionSize={9}
              />
            </Grid>
            <Grid item xs={6}>
              <ImageCard
                containerStyle={'py-[5%] bg-[white]'}
                cardShadow
                mainImageSize={3}
                mainImageStyle={'p-[2rem] h-[100%]'}
                mainImage='/dist/images/ceo.jpg'
                description='
                <p class="text-[1rem] mb-[0.5rem] font-semibold text-gray-500">Build and ship faster using simple tools</p> 
                <p class="text-[1rem] text-gray-500">All of our products are built with simplicity at their core, so you can spend your time focusing on building apps, not infrastructure.</p>'
                descriptionSize={9}
              />
            </Grid>
            <Grid item xs={6}>
              <ImageCard
                containerStyle={'py-[5%] bg-[white]'}
                cardShadow
                mainImageSize={3}
                mainImageStyle={'p-[2rem] h-[100%]'}
                mainImage='/dist/images/ceo.jpg'
                description='
                <p class="text-[1rem] mb-[0.5rem] font-semibold text-gray-500">Build and ship faster using simple tools</p> 
                <p class="text-[1rem] text-gray-500">All of our products are built with simplicity at their core, so you can spend your time focusing on building apps, not infrastructure.</p>'
                descriptionSize={9}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box className='mt-[10%] g-padding'>
        <ImageCard
          cardShadow
          containerStyle={'bg-[rgb(0,44,155)] text-white p-[2rem] benefit-section-temp'}
          mainImageStyle={'p-[2rem]'}
          descriptionTitle='Quick product tours'
          description="Check out our brief product tours to see how simple, easy, and pleasant it is to use DigitalOcean's cloud hosting products."
          descriptionSize={8}
          buttonText='Take a tour'
          buttonArrow
        />
      </Box>
    </Box>
  );
};

export default BenefitSection;
