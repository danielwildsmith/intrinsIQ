import {useState, useEffect, useRef} from "react";
import { createChart } from 'lightweight-charts';
import axios from "axios";

export interface StockDayData {
    day: string;
    price: string;
}

export const RangeChart = ({company}: {company: string}) => {
  const [data, setData] = useState<StockDayData | null>();
  const chartContainerRef = useRef(null);

  const getData = () => {
    axios
      .get(`http://127.0.0.1:5000/stock/${company}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
        await getData();
    };
  
    fetchData();

    //@ts-ignore
    const chart = createChart(chartContainerRef.current, { width: 800, height: 400 });

    const areaSeries = chart.addAreaSeries();

    // Convert range data to the format suitable for areaSeries
    //@ts-ignore
    const formattedData = data.map(item => {
      return { time: item.time, value: (item.low + item.high) / 2 }; // Here we take the midpoint as value
    });

    areaSeries.setData(formattedData);
  }, [data]);

  if(data) {
    console.log(data)
    return <div ref={chartContainerRef} style={{ width: '800px', height: '400px' }}></div>;
  }
};
