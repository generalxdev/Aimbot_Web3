import * as React from 'react'
import '../css/project.css'
import '../css/animations.css';

import Navbar from './Navbar';
import Portfolio from './Portfolio/Portfolio';
import Footer from './Footer';

function PortfolioPage () {
    return (
      <div className="App">
        <div className='relative w-full h-full body'>
          <Navbar />
          <Portfolio />
          <Footer />
          <div className='flex justify-center w-full'>
              <div className='hidden md:block gradient-1'></div>
          </div>
        </div>
      </div>
    );
}

export default PortfolioPage;
