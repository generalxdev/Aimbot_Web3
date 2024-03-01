import React, { useEffect, useState } from 'react';
import '../../css/project.css';
import axios from 'axios';
import DataTable from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import { FaRecycle } from 'react-icons/fa';

function DataTables() {
    const [flag, setFlag] = useState(0); 

    const stringToSeconds = (timeString) => {
      const pattern = /(?:(\d+)\s*days?)?\s*(?:(\d+)\s*hours?)?\s*(?:(\d+)\s*minutes?)?\s*(?:(\d+)\s*seconds?)?/i;

      // Extract the time components using the regular expression
      const matches = timeString.match(pattern);

      // Extract the days, hours, minutes, and seconds from the matches
      const days = parseInt(matches[1]) || 0;
      const hours = parseInt(matches[2]) || 0;
      const minutes = parseInt(matches[3]) || 0;
      const seconds = parseInt(matches[4]) || 0;

      // Calculate the total seconds
      const totalSeconds = days * 24 * 3600 + hours * 3600 + minutes * 60 + seconds;
      
      return totalSeconds;
    }

    const stringToNumber = (subscrStr) => {
      let tempStr = [];
      var j = 0;
      for(var i = 0; i < subscrStr.length; i ++) {
        if((subscrStr[i] >= '0' && subscrStr[i] <= '9') || subscrStr[i] == '.'){
          tempStr[j] = subscrStr[i];
          j ++;
        }
        else if(subscrStr[i] == '$')
          continue;
        else {
          let cnt = 0;
          if(subscrStr == undefined || subscrStr[i] == undefined || subscrStr[i] == null)
            break;
          console.log(subscrStr);
          if(subscrStr[i - 1].codePointAt(0) >= '₀'.codePointAt(0) && subscrStr[i - 1].codePointAt(0) <= '₀'.codePointAt(0) + 9) {
            cnt = (subscrStr[i - 1].codePointAt(0) - '₀'.codePointAt(0)) * 9;
          }
          cnt += subscrStr[i].codePointAt(0) - '₀'.codePointAt(0);

          while(cnt >= 1) {
            tempStr[j ++] = '0';
            cnt --;
          }
        }
      }
      return tempStr.join('');
    }

    const returnWalletID = (wallet) => {
        if (wallet == "0x116d1edd539e5e93551973eb2a71898c9095122f") {
          return "Legacy Contract"
        } else if (wallet == "0x74349190f630e7d220192ee2123d5aa820fc44d8") {
          return "Legacy 1"
        } else if (wallet == "0x0d2e78134f05bd2706bdef9249464d2e10130495") {
          return "Legacy 2"
        } else if(wallet == "0x41107d725b1daa17c979cbc02fbeefaf84cedd4c") {
          return "Legacy 3"
        } else if (wallet == "0xe03a775f364612688c1c897efcf84812f9b14e5c") {
          return "Wallet 1"
        } else if (wallet == "0x9e678213687f03b73d931aae4019409c6a052050") {
          return "Wallet 2"
        } else if (wallet == "0x0863433f1cfe32e73630c8d626d9cb04fc733f79") {
          return "Wallet 3"
        } else if (wallet == "0x2d307c7154bef1a2e6ae5ce68d2f839c60ea0b50") {
          return "Wallet 4"
        } else {
          console.log("did not find match", wallet)
          return "AI Contract"
        }
      }

    const calculateDurationInSeconds = (timestamp1, timestamp2) => {
        if (timestamp1 === null || timestamp2 === null) {
          return 0;
        }
      
        const millisecondsPerSecond = 1000;
      
        if (isNaN(timestamp1) || isNaN(timestamp2)) {
          return 0;
        }
      
        const timeDifference = Math.abs(timestamp2 - timestamp1);
      
        if (isNaN(timeDifference)) {
          return 0;
        }
      
        const seconds = Math.floor(timeDifference / millisecondsPerSecond);
      
        return seconds;
    }

    const formatDuration = (seconds) => {
      const secondsPerMinute = 60;
      const secondsPerHour = 60 * secondsPerMinute;
      const secondsPerDay = 24 * secondsPerHour;
    
      const days = Math.floor(seconds / secondsPerDay);
      const hours = Math.floor((seconds % secondsPerDay) / secondsPerHour);
      const minutes = Math.floor((seconds % secondsPerHour) / secondsPerMinute);
      const remainingSeconds = seconds % secondsPerMinute;
    
      let durationString = '';
    
      if (days > 0) {
        durationString += `${days} day${days > 1 ? 's' : ''}`;
      }
    
      if (hours > 0) {
        durationString += ` ${hours} hour${hours > 1 ? 's' : ''}`;
      }
    
      if (minutes > 0) {
        durationString += ` ${minutes} minute${minutes > 1 ? 's' : ''}`;
      }
    
      if (remainingSeconds > 0) {
        durationString += ` ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`;
      }
    
      return durationString.trim();
    }

    const formatFloat = (number) => {
      if(number >= 1) {
          return number.toFixed(2)
      }
      else if(number >= 0.00001) {
          // Use toPrecision to get 4 significant figures.
          return parseFloat(number.toPrecision(4)).toString()
      } else {
          let str = number.toFixed(20); // Convert number to a string with many decimal places.
          let zeros = str.split(".")[1].match(/^0+/)[0].length  // Count leading zeros.
          
          if(zeros >= 5) {
              let significantDigits = str.split(".")[1].substring(zeros, zeros + 4)
              // Remove trailing zeros after the fourth significant figure
              significantDigits = parseFloat('0.' + significantDigits).toString().substring(2)
              
              // Convert number of zeros into subscript
              let zerosSubscript = Array.from(String(zeros)).map(digit => 
                  String.fromCodePoint("₀".codePointAt(0) + parseInt(digit))
              ).join('')
              
              return "0.0" + zerosSubscript + significantDigits;
          } else {
              // Just return the number rounded to 4 sig figs.
              return parseFloat(number.toPrecision(4)).toString()
          }
      }
    }

    useEffect(() => {
        const getData = async () => {
            {/* Current Holdings Table */}
            const response = await axios.get('https://aimbotapi.onrender.com/api/accounts/audit/portfolio');
            const sellData = response.data.balances;
            
            var tableData = [];
            for(let i = 0 ; i < sellData.length; i ++){
                var temp = new Date(sellData[i].firstBuyTime != undefined ? sellData[i].firstBuyTime : 1694661887000);
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                  };
                
                var amountToken = sellData[i].balanceWholeTokens != null ? parseInt(sellData[i].balanceWholeTokens.toFixed(0), 10).toLocaleString() : "0";
                var selValue = sellData[i].valueUSD.toFixed(2);
                var currentValue = formatFloat(sellData[i].currentPriceUSD);
                var currentProfit = sellData[i].profitX != undefined ? sellData[i].profitX.toFixed(2) : "1.00";
                tableData[i] = [`${amountToken}${" "}${sellData[i].symbol.length >= 20 ? (sellData[i].symbol.slice(0, 20) + "...") : sellData[i].symbol}`, `$${selValue}`, `$${currentValue}`, `${returnWalletID(sellData[i].account)}`, `${temp.toLocaleString('en-US', options)}`, `${currentProfit}X`, "https://etherscan.io/token/" + sellData[i].token];
            }

            const priceDescSort = (x, y) => {
              return parseFloat(stringToNumber(x)) > parseFloat(stringToNumber(y)) ? 1 : -1;
            };
        
            const priceAscSort = (x, y) => {
              return parseFloat(stringToNumber(x)) > parseFloat(stringToNumber(y)) ? -1 : 1;
            };
        
            DataTable.ext.type.order['price-desc'] = priceDescSort;
            DataTable.ext.type.order['price-asc'] = priceAscSort;  

            let table = new DataTable('#myTable', {
                // config options...
                retrieve: true,
                paging: true,
                searching: true,
                data: tableData,
                // responsive: true,
                order: [[1, 'desc']],
                columnDefs: [{
                  "targets" : 6,
                  "render": function ( data, type, row, meta ) {
                    const etherscanLink = row[6];
                    return `<a href= ${etherscanLink} target="_blank">Link</a>`;
                  }},
                  {
                    "targets": 2,
                    "type": "price"
                  }
                ]
            });

            {/* AI Sells */} 
            const response1 = await axios.get('https://aimbotapi.onrender.com/api/accounts/aimbot/sells');
            var buyData = response1.data.sells;

            var tableData1 = [];
            for(let i = 0 ; i < buyData.length; i ++){
                var temp = new Date(buyData[i].sellTime != undefined ? buyData[i].sellTime : 1694661887000);
                const options = {                          
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                  };

                var tokenAmount = parseInt(buyData[i].sellTokens.toFixed(0), 10).toLocaleString();
                var buyPrice = buyData[i].buyWithETH != undefined ? buyData[i].buyWithETH.toFixed(2) : 0.03;
                var sellPrice = buyData[i].sellForETH != undefined ? buyData[i].sellForETH.toFixed(2) : 0.07;
                var profitValue = (sellPrice - buyPrice).toFixed(2);
                var profitPercent  = (sellPrice / buyPrice).toFixed(2);
                var duration = calculateDurationInSeconds(buyData[i].buyTime,buyData[i].sellTime);
                var durationString = formatDuration(duration);
            
                tableData1[i] = [`${tokenAmount}${' '}${buyData[i].symbol.length >= 20 ? (buyData[i].symbol.slice(0, 20) + "...") : buyData[i].symbol}`, `${buyPrice} ETH`, `${sellPrice} ETH`, `${profitValue} ETH${' '}(${profitPercent}X)`, `${temp.toLocaleString('en-US', options)}`, `${durationString}`, `${returnWalletID(buyData[i].seller)}`, "https://etherscan.io/tx/" + buyData[i].sellHash];
            }

            const testDescSort = (x, y) => {
              return stringToSeconds(x) > stringToSeconds(y) ? 1 : -1;
            };
        
            const testAscSort = (x, y) => {
              return stringToSeconds(x) > stringToSeconds(y) ? -1 : 1;
            };
        
            DataTable.ext.type.order['test-desc'] = testDescSort;
            DataTable.ext.type.order['test-asc'] = testAscSort;  

            let myTable1 = new DataTable('#myTable1', {
                // config options...
                retrieve: true,
                paging: true,
                searching: true,
                data: tableData1,
                // responsive: true,
                order: [[2, 'desc']],
                columnDefs: [
                  {
                  "targets" : 7,
                  "render": function ( data, type, row, meta ) {
                    const etherscanLink = row[7];
                    return `<a href= ${etherscanLink} target="_blank">Link</a>`;
                  }},
                  {
                    "targets": 5,
                    "type": "test"
                  }
                ]
            });
        };

        getData();
    }, [flag]);

  return (
    <div className="bg-[#030015] h-full claim_section_portfolio text-white overflow-auto">
      <p className='text-[#C0B0E9] font-bold text-5xl mb-12'>AI Portfolio Tracker</p>
      <button className="mb-10 ml-7 bg-gradient-to-br from-[#D8CEF9] to-[#A58ED7] hover:translate-y-[-10px] transition-transform duration-700 ease-in-out text-[#241357] font-medium py-2 px-10 rounded-md">
        <div className='flex flex-row items-center gap-3 text-lg' onClick={() => setFlag(flag + 1)}><FaRecycle />Refresh Portfolio</div>
      </button>
      {/* Current Holdings Table */}
      <p className='mb-6 text-3xl font-bold text-white'>Current Holdings</p>
      <p className='px-4 mb-20 text-xl text-white md:px-0'>Check our AI holdings in real-time. The list is updated after new buys or sells.</p>

      <div className='flex items-center justify-center'>
        <div className='w-full px-10 lg:w-2/3 lg:px-0'>
            <table id="myTable" className="display">
                <thead>
                    <tr>
                        <th className='equal-width-td-focus'>Token</th>
                        <th className='equal-width-td'>Token Value</th>
                        <th className='equal-width-td-light-focus'>Price Per Token</th>
                        <th className='equal-width-td'>Wallet</th>
                        <th className='equal-width-td-strong-focus'>Buy Time</th>
                        <th className='equal-width-td'>Current Profit</th>
                        <th className='equal-width-td'>Etherscan</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
       </div>

       {/* AI Sells */}
      <p className='mt-20 mb-6 text-3xl font-bold text-white'>AI Sells</p>
      <p className='px-4 mb-20 text-xl text-white md:px-0'>Check all the sells from our AI. The list is updated every few minutes.</p>
    
      <div className='flex items-center justify-center'>
        <div className='w-full px-10 lg:w-3/4 lg:px-0'>
            <table id="myTable1">
                <thead>
                    <tr className="header">
                        <td className='equal-width-td-strong-focus'>Token</td>
                        <td className='equal-width-td'>Buy Size</td>
                        <td className='equal-width-td'>Sell Size</td>
                        <td className='equal-width-td-focus'>Profit</td>
                        <td className='equal-width-td-AI'>Sell Time</td>
                        <td className='equal-width-td-AI'>Duration</td>
                        <td className='equal-width-td'>Wallet</td>
                        <td className='equal-width-td'>Etherscan</td>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
       </div>
    </div>
  );
}

export default DataTables;
