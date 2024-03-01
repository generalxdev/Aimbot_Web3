import React, { useEffect, useState } from 'react';
import '../../css/project.css';
import axios from 'axios';

function RewardPool () {
    const [buyTaxData, setBuyTaxData] = useState([0, 0, 0, 0]);
    const [sellTaxData, setSellTaxData] = useState([0, 0, 0, 0]);
    const [buyPercentData, setBuyPercentData] = useState([0, 0, 0, 0]);
    const [sellPercentData, setSellPercentData] = useState([0, 0, 0, 0]);
    const [totalData, setTotalData] = useState([0, 0, 0, 0]);
    
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('https://aimbotapi.onrender.com/api/aimbot/profits');
            const rewardPoolData = response.data;
            
            setBuyTaxData([rewardPoolData.day.tax.toFixed(2), rewardPoolData.week.tax.toFixed(2), rewardPoolData.month.tax.toFixed(2), rewardPoolData.total.tax.toFixed(2)]);
            setSellTaxData([rewardPoolData.day.bot.toFixed(2), rewardPoolData.week.bot.toFixed(2), rewardPoolData.month.bot.toFixed(2), rewardPoolData.total.bot.toFixed(2)]);
            setBuyPercentData([(rewardPoolData.day.tax / (rewardPoolData.day.tax + rewardPoolData.day.bot) * 100).toFixed(2), (rewardPoolData.week.tax / (rewardPoolData.week.tax + rewardPoolData.week.bot) * 100).toFixed(2), (rewardPoolData.month.tax / (rewardPoolData.month.tax + rewardPoolData.month.bot) * 100).toFixed(2), (rewardPoolData.total.tax / (rewardPoolData.total.tax + rewardPoolData.total.bot) * 100).toFixed(2)]);
            setSellPercentData([(rewardPoolData.day.bot / (rewardPoolData.day.tax + rewardPoolData.day.bot) * 100).toFixed(2), (rewardPoolData.week.bot / (rewardPoolData.week.tax + rewardPoolData.week.bot) * 100).toFixed(2), (rewardPoolData.month.bot / (rewardPoolData.month.tax + rewardPoolData.month.bot) * 100).toFixed(2), (rewardPoolData.total.bot / (rewardPoolData.total.tax + rewardPoolData.total.bot) * 100).toFixed(2)]);
            setTotalData([(rewardPoolData.day.tax + rewardPoolData.day.bot).toFixed(2), (rewardPoolData.week.tax + rewardPoolData.week.bot).toFixed(2), (rewardPoolData.month.tax + rewardPoolData.month.bot).toFixed(2), (rewardPoolData.total.tax + rewardPoolData.total.bot).toFixed(2)]);
        }

        getData();
    }, []);

    return (
        <div className='bg-[#030015] text-white my-24'>
            <p className='md:text-6xl text-5xl text-[#AD99DC] font-semibold'>Reward Pool Live Feed</p>
            <p className='px-6 mt-8 text-xl font-medium md:px-0'>Displaying ETH flowing to the reward pool in real-time.</p>
            <div className='flex flex-col items-center justify-center mt-20 lg:flex-row gap-7'>
                <div className='flex flex-col'>
                    <div className='flex flex-col w-[300px]'>
                        <div className='text-3xl font-bold text-center'>Daily</div>
                        <div className='flex flex-col p-4 mt-6 text-left rounded-md metrics_item'>
                            <p className='text-sm font-bold'>GENERATED FROM AI BOT</p>
                            <p className='mt-6 text-xl font-medium'>{sellTaxData[0]} ETH</p>
                            <p className='mt-1 text-xl font-medium'>{sellPercentData[0]}%</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-[300px] mt-3'>
                        <div className='flex flex-col p-4 text-left rounded-md metrics_item_down'>
                            <p className='text-sm font-bold'>GENERATED FROM TAX</p>
                            <p className='mt-6 text-xl font-medium'>{buyTaxData[0]} ETH</p>
                            <p className='mt-1 text-xl font-medium'>{buyPercentData[0]}%</p>
                        </div>
                        <div className='flex flex-col mt-4 text-center'>
                            <p className='text-3xl font-bold'>{totalData[0]} ETH</p>
                            <p className='text-xl'>Generated today</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col  w-[300px]'>
                        <div className='mt-10 text-3xl font-bold md:mt-0'>Weekly</div>
                        <div className='flex flex-col p-4 mt-6 text-left rounded-md metrics_item'>
                            <p className='text-sm font-bold'>GENERATED FROM AI BOT</p>
                            <p className='mt-6 text-xl font-medium'>{sellTaxData[1]} ETH</p>
                            <p className='mt-1 text-xl font-medium'>{sellPercentData[1]}%</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-[300px] mt-3'>
                        <div className='flex flex-col p-4 text-left rounded-md metrics_item_down'>
                            <p className='text-sm font-bold'>GENERATED FROM TAX</p>
                            <p className='mt-6 text-xl font-medium'>{buyTaxData[1]} ETH</p>
                            <p className='mt-1 text-xl font-medium'>{buyPercentData[1]}%</p>
                        </div>
                        <div className='flex flex-col mt-4 text-center'>
                            <p className='text-3xl font-bold'>{totalData[1]} ETH</p>
                            <p className='text-xl'>Generated this week</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col  w-[300px]'>
                        <div className='mt-10 text-3xl font-bold md:mt-0'>Monthly</div>
                        <div className='flex flex-col p-4 mt-6 text-left rounded-md metrics_item'>
                            <p className='text-sm font-bold'>GENERATED FROM AI BOT</p>
                            <p className='mt-6 text-xl font-medium'>{sellTaxData[2]} ETH</p>
                            <p className='mt-1 text-xl font-medium'>{sellPercentData[2]}%</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-[300px] mt-3'>
                        <div className='flex flex-col p-4 text-left rounded-md metrics_item_down'>
                            <p className='text-sm font-bold'>GENERATED FROM TAX</p>
                            <p className='mt-6 text-xl font-medium'>{buyTaxData[2]} ETH</p>
                            <p className='mt-1 text-xl font-medium'>{buyPercentData[2]}%</p>
                        </div>
                        <div className='flex flex-col mt-4 text-center'>
                            <p className='text-3xl font-bold'>{totalData[2]} ETH</p>
                            <p className='text-xl'>Generated this month</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col  w-[300px]'>
                        <div className='mt-10 text-3xl font-bold md:mt-0'>Since Launch</div>
                        <div className='flex flex-col p-4 mt-6 text-left rounded-md metrics_item'>
                            <p className='text-sm font-bold'>GENERATED FROM AI BOT</p>
                            <p className='mt-6 text-xl font-medium'>{sellTaxData[3]} ETH</p>
                            <p className='mt-1 text-xl font-medium'>{sellPercentData[3]}%</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-[300px] mt-3'>
                        <div className='flex flex-col p-4 text-left rounded-md metrics_item_down'>
                            <p className='text-sm font-bold'>GENERATED FROM TAX</p>
                            <p className='mt-6 text-xl font-medium'>{buyTaxData[3]} ETH</p>
                            <p className='mt-1 text-xl font-medium'>{buyPercentData[3]}%</p>
                        </div>
                        <div className='flex flex-col mt-4 text-center'>
                            <p className='text-3xl font-bold'>{totalData[3]} ETH</p>
                            <p className='text-xl'>Generated since launch</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RewardPool;
