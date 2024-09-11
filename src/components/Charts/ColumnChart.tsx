import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartDataItem {
  item: string;
  count: number;
}

interface ChartThreeProps {
  data: ChartDataItem[];
  title: string;
}

const ColumnChart: React.FC<ChartThreeProps> = ({ data, title }) => {
  const [chartData, setChartData] = useState<{ series: { data: number[] }[]; categories: string[] }>({
    series: [{ data: [] }],
    categories: [],
  });

  useEffect(() => {
    if (data) {
      const sortedData = data
        .sort((a, b) => b.count - a.count)

      const categories = sortedData.map(i => i.item);
      const seriesData = sortedData.map(i => i.count);
      setChartData({ categories, series: [{ data: seriesData }] });
    }
  }, [data]);

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar', // Changed to 'bar'
    },
    colors: ['#8FD0EF', '#0FADCF', '#5061CF', '#70A9D4'],
    xaxis: {
      categories: chartData.categories,
      title: {
        text: 'Targeting Strategies',
        style: {
          color: '#333',
        },
        
      },
      labels: {
        formatter: (value: string) => value.replace(/-Based/g, '').trim(), // Remove all occurrences of 'Based'
        style: {
          fontSize: '10px', // Adjust font size here
          fontFamily: 'Arial, sans-serif', // Optionally, set a different font
        },
      },
    },
    yaxis: {
      title: {
        text: 'Count',
        style: {
          color: '#333',
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#FF0000'], // Set color for data labels
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false, // Set to true for a horizontal bar chart
      },
    },
    legend: {
      show: true,
      position: 'bottom',
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
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white pt-3.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">{title}</h5>
        </div>
        <div></div>
      </div>

      <div>
        <div id="chartThree" className="pt-10 mx-auto flex justify-center pb-10">
          <ReactApexChart options={options} series={chartData.series} type="bar" height={350} />
        </div>
      </div>
    </div>
  );
};

export default ColumnChart;
