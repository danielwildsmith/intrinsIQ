import { useEffect, useRef } from "react";
import { createChart } from 'lightweight-charts';
import { Flex, Heading } from "@chakra-ui/react";
import { CompanyStockData } from "@/types/CompanyStockData";

export const RangeChart = ({companyData}: {companyData: CompanyStockData[]}) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (companyData && chartContainerRef.current) {
      
      const chart = createChart(chartContainerRef.current, { width: 800, height: 400, 
        grid: {
          horzLines: {
            color: '#CCCCCC'
          },
          vertLines: {
            color: '#28282B'
          }},
          //@ts-ignore
          layout:{ background:{ type: 'solid', color: '#28282B'}, textColor: '#d1d4dc'}
      });

      const intrinsicSeries = chart.addLineSeries({
        color: 'rgba(255, 192, 0, 0.7)',
        lineWidth: 3,
        lineStyle: 0,
        priceLineVisible: false,
        lastValueVisible: false
      });

      const areaSeries = chart.addAreaSeries({lineColor: 'rgba(33, 150, 243, 1)', topColor: 'rgba(33, 150, 243, 0.56)', bottomColor: 'rgba(0, 0, 0, 0.0)', priceLineVisible: false, lastValueVisible: false});
      const formattedData = companyData.map(item => {
        return { time: item.date, value: Number(item.price) }; // assuming item.day is time and item.price is the desired value
      });

      areaSeries.setData(formattedData);
      intrinsicSeries.setData([{time: '2019-04-03', value: companyData[companyData.length - 1].intrinsicValue!}, {time: '2024-04-03', value: companyData[companyData.length - 1].intrinsicValue!}]);

      return () => chart.remove()
    }
  }, [companyData]);

  return <div ref={chartContainerRef} style={{ width: '800px', height: '400px', backgroundColor: 'transparent' }}></div>;
};

export const IntrinsicValueStat = ({companyData}: {companyData: CompanyStockData}) => {
  return (
    <>
      <Flex fontSize={'32px'} color={'white'} mr={2} alignItems={'center'} mt={2}>
        <span style={{width: 'fit-content', fontWeight: 'bold'}}>Intrinsic Value: </span>
        <Heading fontSize={'32px'} ml={2} color={'#33d778'} style={{color: Number(companyData.intrinsicValue) >= 0 ? '#33d778' : 'red'}}>${companyData.intrinsicValue!.toFixed(2)}</Heading>
      </Flex>
    </>
  )
}