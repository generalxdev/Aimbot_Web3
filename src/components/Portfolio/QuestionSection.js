import * as React from 'react'
import '../../css/project.css';
import { Link } from 'react-router-dom';

function QuestionSection () {
    return (
        <div className='bg-[#030015] flex py-20 justify-center mt-20 md:px-0 px-2'>
            <div className='flex flex-col items-center w-full md:max-w-3xl'>
                <p className='text-4xl font-bold text-white mb-7'>How Does AimBot work?</p>
                <p className='px-4 text-lg text-white md:px-0 md:text-xl mb-7'>AimBot holds tokens in [wallet 1], [wallet 2], [wallet 3] and [wallet 4], it will auto-buy tokens based on different parameters.</p>
                <p className='px-4 text-lg text-white md:px-0 mb-7'>Sells are manually handled (for now) and profit is sent to this wallet.</p>
                <p className='px-4 text-lg text-white md:px-0 mb-7'>Profit is distributed manually to the reward contract, from where investors can claim ETH rewards.</p>
                <p className='px-4 mb-1 text-lg text-white md:px-0'>To calculate your share of rewards, simply do:</p>
                <p className='px-4 text-lg font-semibold text-white md:px-0 mb-7'>[ETH in reward wallet] * (your token balance / total supply)</p>
                <p className='px-4 text-lg text-white md:px-0 mb-7'>Or check it from the dashboard</p>
                <Link to="/claimeth" className="text-lg md:text-xl ml-7 bg-gradient-to-br from-[#D8CEF9] to-[#A58ED7] hover:translate-y-[-10px] transition-transform duration-700 ease-in-out text-[#241357] font-semibold py-2 md:py-3 px-6 md:px-8 rounded-md">
                    Claim Rewards
                </Link>
            </div>
        </div>
    );
}

export default QuestionSection;
