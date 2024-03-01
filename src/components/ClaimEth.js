import * as React from 'react'
import '../css/project.css'
import '../css/animations.css';

import Navbar from './Navbar';
import ClaimRewards from './ClaimRewards/ClaimMain';
import Footer from './Footer';

function ClaimEth () {
    return (
      <div className="App">
        <div className='relative w-full h-full body'>
          <Navbar />
          <ClaimRewards />
          <Footer />
        </div>
      </div>
    );
}

export default ClaimEth;
