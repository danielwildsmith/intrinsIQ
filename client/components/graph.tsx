import {useState, useEffect, useRef} from "react";
import { createChart } from 'lightweight-charts';
import axios from "axios";

export interface StockDayData {
    date: string;
    price: string;
}

export interface IntrinsicData {
  intrinsicValue: Number;
}

export const RangeChart = ({company}: {company: string}) => {
  const [stockData, setStockData] = useState<StockDayData[] | null>(null);
  const [intrinsicData, setIntrinsicData] = useState<IntrinsicData[] | null>(null);
  const chartContainerRef = useRef(null);

  const getStockData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/stock/${company}`);
      setStockData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const GetIntrinsicData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/intrinsic/${company}`);
      setIntrinsicData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStockData();
    GetIntrinsicData();
  }, []);

  useEffect(() => {
    if (stockData && chartContainerRef.current && intrinsicData) {
      console.log(intrinsicData)
      
      const chart = createChart(chartContainerRef.current, { width: 800, height: 400, grid: {
        horzLines: {
          color: '#CCCCCC'
        },
        vertLines: {
          color: '#28282B'
        }
      },
      layout:{
        background:{
          //@ts-ignore
          type: 'solid',
          color: '#28282B',
        },
        textColor: '#d1d4dc',
      }
    }
 );
 const intrinsicSeries = chart.addLineSeries({
  color: 'rgba(255, 192, 0, 0.7)',
  lineWidth: 3,
  lineStyle: 0,
  priceLineVisible: false,
  lastValueVisible: false
});

      const areaSeries = chart.addAreaSeries({lineColor: 'rgba(33, 150, 243, 1)', topColor: 'rgba(33, 150, 243, 0.56)', bottomColor: 'rgba(0, 0, 0, 0.0)', priceLineVisible: false, lastValueVisible: false});

      const formattedData = stockData.map(item => {
        return { time: item.date, value: Number(item.price) }; // assuming item.day is time and item.price is the desired value
      });

      areaSeries.setData(formattedData);
      console.log(intrinsicData[0].intrinsicValue)
      //@ts-ignore
      intrinsicSeries.setData([{time: '2018-09-15', value: intrinsicData[0].intrinsicValue}, {time: '2023-09-15', value: intrinsicData[0].intrinsicValue}]);

      return () => chart.remove()
    }
  }, [stockData]);

  return <div ref={chartContainerRef} style={{ width: '800px', height: '400px', backgroundColor: 'transparent' }}></div>;
};
