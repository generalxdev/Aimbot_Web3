import * as React from 'react'
import '../css/project.css'
import '../css/animations.css';

import Navbar from './Navbar';
import Dashboard from './Landing/Dashboard';
import Footer from './Footer';

function Landing () {
    return (
      <div className="App">
        <div className='relative w-full h-full body'>
          <Navbar />
          <Dashboard />
          <Footer />
        </div>
      </div>
    );
}

export default Landing;
