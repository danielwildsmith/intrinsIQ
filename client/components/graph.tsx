import {useState, useEffect, useRef} from "react";
import { createChart } from 'lightweight-charts';
import axios from "axios";

export interface StockDayData {
    date: string;
    price: string;
}

export const RangeChart = ({company}: {company: string}) => {
  const [data, setData] = useState<StockDayData[] | null>(null);
  const chartContainerRef = useRef(null);

  const getData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/stock/${company}`);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data && chartContainerRef.current) {
      console.log(data)
      const chart = createChart(chartContainerRef.current, { width: 800, height: 400 });
      const areaSeries = chart.addAreaSeries();

      const formattedData = data.map(item => {
        return { time: item.date, value: Number(item.price) }; // assuming item.day is time and item.price is the desired value
      });

      areaSeries.setData(formattedData);
    }
  }, [data]);

  return <div ref={chartContainerRef} style={{ width: '800px', height: '400px' }}></div>;
};
