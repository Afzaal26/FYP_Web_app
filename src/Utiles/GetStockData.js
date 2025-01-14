// import iex from "../config/myAPI";

// import React, { useState, useEffect } from "react";

// export default function GetStockData(props) {

//     let {ticker } = props 

    
//      const latestPriceURL= (ticker) => {
//           // return `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1m?token=${iex.api_token}`
//           return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${iex.Alpha_vantage_API_KEY}&&outputsize=compact&datatype=json&interval=5min&time_period=30`
//       }
//   const formatePriceData = (data) => {
//     const timeseries = data["Time Series (Daily)"];
//     const stockData = Object.keys(timeseries).map((date) => {
//       return {
//         date: date,
//         open: timeseries[date]["1. open"],
//         close: timeseries[date]["4. close"],
//         low: timeseries[date]["3. low"],
//         high: timeseries[date]["2. high"],
//         adjClose: timeseries[date]["5. adjusted close"],
//         volume: timeseries[date]["6. volume"],
//         dividentAmount: timeseries[date]["6. volume"],
//         splitCoefficient: timeseries[date]["8. split coefficient"],
//       };
//     });
//     const formattedData = Object.values(stockData);
//     console.log(
//       "🚀 ~ file: GetStockData.js:30 ~ GetStockData ~ formattedData:",
//       formattedData
//     );
//     return formattedData;
//   };


//   const [graphdata, setgraphdata] = useState();
  
//   console.log("🚀 ~ file: GetStockData.js:40 ~ GetStockData ~ ticker:", ticker)
//   useEffect( () => {
//       fetch(latestPriceURL(ticker))
//       .then((response) => response.json())
//       .then((data) =>{
//         const formatData = formatePriceData(data)
//         setgraphdata(formatData)
        
//       })
//   }, []);


   
// console.log("🚀 ~ file: GetStockData.js:45 ~ GetStockData ~ graphdata:", graphdata)
//   return (
//    <div>{
//     (graphdata === undefined) ? <p>loading </p>:  graphdata.map((item) => <p>{item.date}</p>)
//    }</div>
//   );
// }



import iex from "../config/myAPI";
import React, { useEffect, useState } from "react";

export default function GetStockData({ ticker }) {
  const latestPriceURL = (ticker) => {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${iex.Alpha_vantage_API_KEY}&&outputsize=compact&datatype=json&interval=5min&time_period=30`;
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month -1, day).getTime() /1000;
  };

  const formatePriceData = (data) => {
    const timeseries = data["Time Series (Daily)"];
    const stockData = Object.keys(timeseries).map((date) => {
      return {
        date: formatDate(date),
        open: timeseries[date]["1. open"],
        close: timeseries[date]["4. close"],
        low: timeseries[date]["3. low"],
        high: timeseries[date]["2. high"],
        adjClose: timeseries[date]["5. adjusted close"],
        volume: timeseries[date]["6. volume"],
        dividentAmount: timeseries[date]["6. volume"],
        splitCoefficient: timeseries[date]["8. split coefficient"],
      };
    });
    const formattedData = Object.values(stockData);
    return formattedData;
  };

  const [graphdata, setGraphdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(latestPriceURL(ticker));
        const data = await response.json();
        const formattedData = formatePriceData(data);
        if(formatDate !== undefined){

          setGraphdata(formattedData);
        }
        else{
          console.log("Data Undefined")
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, [ticker]);

  return graphdata;
}
