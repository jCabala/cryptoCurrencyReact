import { useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from '../api.config';
import { useCryptoState } from '../CryptoContext';
import {
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
} from '@material-ui/core';

//@TODO maby do only 1 theme provider for the whole app

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = useCryptoState();
  const [search, setSearch] = useState();

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
          onCHange={e => setSearch(e.target.value)}
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
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
