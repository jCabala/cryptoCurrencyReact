import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../api.config';
import { useCryptoState } from '../CryptoContext';
import {
  makeStyles,
  createTheme,
  TableContainer,
  LinearProgress,
  ThemeProvider,
  Container,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

//@TODO maby do only 1 theme provider for the whole app

const useStyles = makeStyles({
  row: {
    backgroundColor: '#16171a',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#131111',
    },
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      color: 'gold',
    },
  },
});

const CoinsTable = () => {
  const classes = useStyles();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = useCryptoState();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  const handleSearch = () =>
    coins.filter(
      coin =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant='h4' style={{ margin: 18 }}>
          Cryptocurrency Prices by Matket Cap
        </Typography>

        <TextField
          style={{ marginBottom: 20, width: '100%' }}
          label='Search For a Crypto Currency..'
          variant='outlined'
          onChange={e => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map(head => (
                    <TableCell
                      style={{ color: 'black', fontWeight: '700' }}
                      key={head}
                      align={head === 'Coin' ? '' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, page * 10)
                  .map(row => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        onClick={() => navigate(`coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          style={{
                            display: 'flex',
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height='50'
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <span
                              style={{
                                textTransform: 'uppercase',
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: 'darkgrey' }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell align='right'>
                          {symbol} {row.current_price.toFixed(2)}
                        </TableCell>

                        <TableCell
                          align='right'
                          style={{
                            color: profit > 0 ? 'green' : 'red',
                            fontWeight: 500,
                          }}
                        >
                          {profit > 0 && '+'}
                          {row.price_change_percentage_24h.toFixed(2)}
                        </TableCell>

                        <TableCell align='right'>
                          {symbol} {row.market_cap.toString().slice(0, -6)}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          classes={{ ul: classes.pagination }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, val) => {
            setPage(val);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
