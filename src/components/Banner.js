import { Container, makeStyles, Typography } from '@material-ui/core';

import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: 'url(./images/banner2.jpg)',
  },
  bannerContainer: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
  },
  tagline: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContainer}>
        <div className={classes.tagline}>
          <Typography
            variant='h2'
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant='subtitle2'
            style={{
              color: 'darkgrey',
              textTransform: 'capitalize',
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>

        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
