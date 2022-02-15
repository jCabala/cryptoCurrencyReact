import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Header from './components/Header';
import Coinpage from './components/Coinpage';

import { makeStyles } from '@material-ui/styles';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      minHeight: '100vh',
      color: 'white',
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/coins/:id' element={<Coinpage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
