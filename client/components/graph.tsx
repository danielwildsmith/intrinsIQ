import { useEffect, useRef } from "react";
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { CompanyStockData } from "@/types/CompanyStockData"; 
import { Flex, Heading } from "@chakra-ui/react";

export const RangeChart = ({ companyData }: {companyData: CompanyStockData[]}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current && chartInstanceRef.current) {
        const { width, height } = chartContainerRef.current.getBoundingClientRect();
        chartInstanceRef.current.applyOptions({ width, height });
      }
    };

    if (companyData.length > 0 && chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        grid: {
          horzLines: {
            color: '#CCCCCC',
          },
          vertLines: {
            color: '#28282B',
          },
        },
        layout: {
          background: { color: '#28282B' },
          textColor: '#d1d4dc',
        }      
      });
      chartInstanceRef.current = chart;

      const areaSeries: ISeriesApi<"Area"> = chart.addAreaSeries({
        lineColor: 'rgba(33, 150, 243, 1)',
        topColor: 'rgba(33, 150, 243, 0.56)',
        bottomColor: 'rgba(33, 150, 243, 0.0)',
        priceLineVisible: false,
        lastValueVisible: false,
      });

      const intrinsicSeries: ISeriesApi<"Line"> = chart.addLineSeries({
        color: '#33d778',
        lineWidth: 3,
        lineStyle: 0,
        priceLineVisible: false,
        lastValueVisible: false,
      });

      const formattedData = companyData.map(item => ({
        time: item.date,
        value: Number(item.price),
      }));

      areaSeries.setData(formattedData);
      intrinsicSeries.setData([
        { time: '2019-04-03', value: companyData[companyData.length - 1].intrinsicValue! },
        { time: '2024-04-03', value: companyData[companyData.length - 1].intrinsicValue! },
      ]);

      const lastDate = new Date(companyData[companyData.length - 1].date);
      const fiveYearsAgo = new Date(lastDate);
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

      // Set the visible range to the last 5 years
      chart.timeScale().setVisibleRange({
        from: fiveYearsAgo.toISOString().split('T')[0], // Converts the date to YYYY-MM-DD format
        to: lastDate.toISOString().split('T')[0],
      });

      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          handleResize();
        }
      });

      resizeObserver.observe(chartContainerRef.current);

      return () => {
        if (chartContainerRef.current) {
          resizeObserver.unobserve(chartContainerRef.current);
        }
        if (chartInstanceRef.current) {
          chartInstanceRef.current.remove();
        }
      };
    }
  }, [companyData]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '400px', backgroundColor: 'transparent' }} />;
};

export const IntrinsicValueStat = ({companyData}: {companyData: CompanyStockData}) => {
  return (
    <>
      <Flex fontSize={'32px'} color={'white'} alignItems={'center'} mt={2}>
        <span style={{width: 'fit-content', fontWeight: 'bold'}}>Intrinsic Value: </span>
        <Heading fontSize={'32px'} ml={2} color={'#33d778'} style={{color: Number(companyData.intrinsicValue) >= 0 ? '#33d778' : 'red'}}>${companyData.intrinsicValue!.toFixed(2)}</Heading>
      </Flex>
    </>
  )
}