import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Define the ChartDataItem interface
interface ChartDataItem1 {
  item: string;
  placementBasedAdCount: number;
  restCount: number;
}
interface StackedColumnChartProps {
  data: ChartDataItem1[];
  title: string;
  series: { name: string; data: number[] }[]; // Series as props
}

const StackedColumnChart: React.FC<StackedColumnChartProps> = ({ data, title, series }) => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Paginate the data
  const paginatedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Create two series: placement-based count and rest count
  const placementSeries = series[0];
  const restSeries = series[1];
  const paginatedPlacementSeries = placementSeries ? {
    ...placementSeries,
    data: placementSeries.data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
  } : null;

  const paginatedRestSeries = restSeries ? {
    ...restSeries,
    data: restSeries.data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
  } : null;

  const paginatedSeries = [paginatedRestSeries,paginatedPlacementSeries].filter(serie => serie !== null);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
    },
   
    xaxis: {
      categories: paginatedData.map((item) => item.item),
      labels: {
        style: {
          fontSize: '12px', // Adjust font size here
          fontFamily: 'Arial, sans-serif',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Count',
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
       
      },
      
    },
     dataLabels: {
          enabled: false, // Disable data labels
        },
    legend: {
      position: 'bottom',
    },
  };

  // Pagination handlers
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white pt-3.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
         <div className="mb-3 justify-between sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">{title}</h5>
        </div>
        <div></div>
      </div>

    <div >

      <ReactApexChart options={options} series={paginatedSeries} type="bar" height={350} />
      <div className=" flex justify-center p-2 sm:p-2 xl:p-5.5">
      <nav className="mt-4">
        <ul className="flex flex-wrap items-center gap-2">
          <li>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className={`flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium ${
                currentPage === 0 ? 'bg-[#EDEFF1] text-black cursor-not-allowed' : 'bg-[#EDEFF1] text-black hover:bg-primary hover:text-white'
              } dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => setCurrentPage(index)}
                className={`flex items-center justify-center rounded px-3 py-1.5 font-medium ${
                  index === currentPage ? 'bg-primary text-white' : 'bg-[#EDEFF1] text-black hover:bg-primary hover:text-white'
                } dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className={`flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium ${
                currentPage === totalPages - 1 ? 'bg-[#EDEFF1] text-black cursor-not-allowed' : 'bg-[#EDEFF1] text-black hover:bg-primary hover:text-white'
              } dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      </div>
    </div>
    </div>
  );
};

export default StackedColumnChart;