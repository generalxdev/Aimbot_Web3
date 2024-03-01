import './App.css';
import ClaimEth from './components/ClaimEth';
import Landing from './components/Landing';
import PortfolioPage from './components/PortfolioPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PortfolioPage />}></Route>
        <Route path='/claimeth' element={<ClaimEth />}></Route>
        <Route path='/landing' element={<Landing />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*
Updated list
-Navbar links on mobile not working fixed
-Join community clickable on whole button, not only icon
-Etherscan link target="_blank" added
-Claim button hide when wallet not connected
-Share of ETH calculation fixed(not tested cause my share is always 0)
*/
