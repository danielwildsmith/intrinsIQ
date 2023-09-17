import {useState, useEffect, useRef} from "react";
import { createChart } from 'lightweight-charts';
import axios from "axios";

export interface StockDayData {
    date: string;
    price: string;
}

export const RangeChart = ({company}: {company: string}) => {
  const [stockData, setStockData] = useState<StockDayData[] | null>(null);
  const chartContainerRef = useRef(null);

  const getStockData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/stock/${company}`);
      setStockData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStockData();
  }, []);

  useEffect(() => {
    if (stockData && chartContainerRef.current) {
      console.log(stockData)
      const chart = createChart(chartContainerRef.current, { width: 800, height: 400 });
      const areaSeries = chart.addAreaSeries();

      const formattedData = stockData.map(item => {
        return { time: item.date, value: Number(item.price) }; // assuming item.day is time and item.price is the desired value
      });

      areaSeries.setData(formattedData);
    }
  }, [stockData]);

  return <div ref={chartContainerRef} style={{ width: '800px', height: '400px' }}></div>;
};
