import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';


interface ChartDataItem {
  item: string;
  count: number;  // Changed from 'topic_count' to a more generic 'value'
}

interface ChartThreeProps {
  data: ChartDataItem[];  // Renamed from 'topics' to 'data' to generalize its use
  title: string;          // To dynamically set the chart title
}



const ChartThree: React.FC<ChartThreeProps> = ({ data, title }) => {


  const [chartData, setChartData] = useState<{ series: number[], labels: string[] }>({
    series: [],
    labels: [],
  });

   useEffect(() => {
    if (data) {
      const sortedData = data
        .filter(i => i.item.trim() !== "N/A")
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);  // Take only the top 6 items

      const labels = sortedData.map(i => i.item);
      const series = sortedData.map(i => i.count);
      console.log(labels, series);
      setChartData({ labels, series });
    }
  }, [data]);

   const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF', '#5061CF', '#70A9D4'], 
    labels: chartData.labels,
    legend: {
      show: true,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 400,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };


  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white   pt-3.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between  sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
           {title}
          </h5>
        </div>
        <div>
         
        </div>
      </div>

      <div >
        <div id="chartThree" className="pt-10 mx-auto flex justify-center pb-10">
           <ReactApexChart options={options} series={chartData.series} type="donut" />

        </div>
      </div>

      
    </div>
  );
};

export default ChartThree;
