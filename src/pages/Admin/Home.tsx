import React, { useEffect, useState } from 'react';

import CardDataStats from '../../components/CardDataStats';
import ChartThree from '../../components/Charts/ChartThree';
import TableOne from '../../components/Tables/TableOne';
import AdminLayout from '../../layout/AdminLayout';
import TableTopics from '../../components/Tables/TableAdminTopics';
import { fetchDataForAdmin } from '../../services/apiService'; // Import the service function
import Loader from '../../common/Loader';

const Home: React.FC = () => {

  interface TopicData {
    topic: string;
    topic_count: number;
  }
  
  interface AdminData {
  adsWatched: any;  
  vidsWatched:any;
  googleReasons: any;
  advertisers: any;
  targetingReasons: any;
  topics : TopicData[] ;
}
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    fetchDataForAdmin()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        setError(error);
        setLoading(false);
      });
  });

  if (loading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;
  function formatNumber(num: string): string {
  const number = parseInt(num);
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    return (number / 1000).toFixed(2) + 'K'; 
  } else {
    return (number / 1000000).toFixed(2) + 'M'; 
  }
}

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      
         <CardDataStats title="Total Videos Watched" total={data ? formatNumber(data.vidsWatched) : ''} >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""
            />
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""
            />
          </svg>
        </CardDataStats>
          <CardDataStats title="Total Ads Collected" total={data ? formatNumber(data.adsWatched) : ''} >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""
            />
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""
            />
          </svg>
        </CardDataStats>
      
      </div>

      
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne title1='Ads Displayed' title2='Videos Watched' /> */}
        <ChartThree title='Google Informations Used To Target users'  data={data? data.googleReasons.targetingReasons.map((reason: { reason: string; occurrences: string; }) => ({
          item: reason.reason,
          count: parseFloat(reason.occurrences)})) : ''} />
        <ChartThree title='Other Informations Used To Target users' data={data? data.targetingReasons.targetingReasons.map((reason: { normalized_reason: string; occurrences: string; }) => ({
          item: reason.normalized_reason,
          count: parseFloat(reason.occurrences)})) : ''} />
   
        <div className="col-span-14 xl:col-span-12">
          <TableOne advertisers={data?.advertisers.topAdvertisers} />
        </div>
       
      </div>
      
     
          
    </AdminLayout>
  );
};

export default Home;
