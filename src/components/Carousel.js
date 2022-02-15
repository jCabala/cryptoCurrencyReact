import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TrendingCoins } from '../api.config';
import { useCryptoState } from '../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

//@TODO coinProfit,price

const useStyles = makeStyles(theme => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
  },
}));

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  const { currency, symbol } = useCryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => fetchTrendingCoins(), [currency]);

  const items = trending.map(coin => (
    <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
      <img
        src={coin.image}
        alt={coin.name}
        height='80px'
        style={{ marginBottom: 10 }}
      />
      <span>{coin.sybmol}</span>
    </Link>
  ));

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        autoPlayInterval={1000}
        infinite
        animationDuration={1200}
        autoPlay
        responsive={responsive}
        items={items}
      />
    </div>
  );
};

export default Carousel;
