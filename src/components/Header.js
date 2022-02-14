import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  makeStyles,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useCryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: 'gold',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency } = useCryptoState();

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
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography
              variant='h5'
              onClick={() => navigate('/')}
              className={classes.title}
            >
              CryptoHunter
            </Typography>

            <Select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              variant='outlined'
              style={{ width: 100, height: 40, marginRight: 15 }}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'PLN'}>PLN</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
