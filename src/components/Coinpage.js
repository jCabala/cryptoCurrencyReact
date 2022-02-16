import { makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../api.config';
import { useCryptoState } from '../CryptoContext';
import CoinInfo from './CoinInfo';
import parse from 'html-react-parser';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  sidebar: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey',
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    width: '100%',

    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify',
  },
  marketData: {
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start',
    },
  },
}));

const Coinpage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = useCryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  console.log(coin);

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          style={{ marginBottom: 20, height: 200 }}
        />
        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>

        <Typography variant='subtitle1' className={classes.description}>
          {parse(`<div>${coin?.description.en.split('. ')[0]}</div>`)}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'>{coin?.market_cap_rank}</Typography>
          </span>

          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'>
              {symbol} {coin?.market_data.current_price[currency.toLowerCase()]}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'>
              {symbol}{' '}
              {coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)}
              M
            </Typography>
          </span>
        </div>
      </div>

      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coinpage;
