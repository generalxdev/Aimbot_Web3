import React from 'react';
import '../../css/project.css';
import { FaTelegram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function JoinCommunity() {
  return (
    <div className="bg-[#030015] py-20">
      <p className="text-4xl font-bold text-white">Join the community</p>
      <div className='flex flex-col items-center justify-center px-8 mt-12 md:px-0 md:flex-row gap-7'>
        <Link to="https://t.me/Aimbotportal" target='_blank'>
          <div className='bg-[#26A5E4] md:w-[600px] w-full h-[120px] rounded-xl social-grid-content-telegram p-4 flex items-center gap-5'>
            <FaTelegram className='w-10 h-10 text-white hover:cursor-pointer'/>
            <p className='text-xl font-medium text-white'>Telegram</p>
          </div>
        </Link>
        <Link to="https://twitter.com/aimbot_coin" target='_blank'>
          <div className='bg-[#26A5E4] md:w-[600px] w-full h-[120px] rounded-xl social-grid-content-twitter p-4 flex items-center gap-5'>
            <FaTwitter className='w-10 h-10 text-white hover:cursor-pointer'/>
            <p className='text-xl font-medium text-white'>Twitter</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default JoinCommunity;
