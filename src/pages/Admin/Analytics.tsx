import React, { useEffect, useState } from 'react';

import AdminLayout from '../../layout/AdminLayout';

import { fetchAdminPlacementPerVideo,fetchAdminPolitical,fetchAdminPoliticalCount,fetchAdminPoliticalPlacement,fetchAdminTargetingCombinations,fetchAdminTargetingStrategies } from '../../services/apiService'; // Import the service function
import Loader from '../../common/Loader';
import PieChart from '../../components/Charts/PieChart';
import ColumnChart from '../../components/Charts/ColumnChart';
import StackedColumnChart from '../../components/Charts/StackecBarChart';
import ChartThree from '../../components/Charts/ChartThree';
import TableAdminPoliticalAds from '../../components/Tables/TableAdminPoliticalAds';
import { PoliticalAdminAd } from '../../types/interfaces'; // Import the interface
interface ChartDataItem {
  item: string;
  count: number;
}

interface ChartDataItem1 {
  item: string;
  placementBasedAdCount: number;
  restCount: number;
}


interface PoliticalDataState {
  politicalAds: PoliticalAdminAd[] | null;
}

const AdminAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error] = useState<Error | null>(null);
  
  const [placementPerVideoData, setPlacementPerVideoData] = useState<{
    videoData: { videoId: string; totalAdsCount: number; placementBasedAdCount: number }[];
  } | null>(null);
const [politicalData, setPoliticalData] =  useState<PoliticalDataState>({
  politicalAds: null, // or [] if you prefer an empty array initially
});
const [politicalCounts, setPoliticalCounts] = useState<{
    politicalAdCount?: number;
    nonPoliticalAdCount?: number;
  } | null>(null);
  const [placementBasedPoliticalAdCount, setPlacementBasedPoliticalAdCount] = useState<{
    politicalAdCount?: number;
    placementBasedPoliticalAdCount?: number;
  } | null>(null);
  const [targetingCombinations, setTargetingCombinations] = useState<{ [combination: string]: number } | null>(null);
  const [targetingStrategies, setTargetingStrategies] = useState<{
    placementBased?: number;
    interestBased?: number;
    other?: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          placementPerVideoResponse,
          politicalResponse,
          politicalCountResponse,
          politicalPlacementResponse,
          targetingCombinationsResponse,
          targetingStrategiesResponse,
        ] = await Promise.all([
          fetchAdminPlacementPerVideo(), // Replace with actual user ID
          fetchAdminPolitical(),
          fetchAdminPoliticalCount(),
          fetchAdminPoliticalPlacement(),
          fetchAdminTargetingCombinations(),
          fetchAdminTargetingStrategies(),
        ]);

        setPlacementPerVideoData(placementPerVideoResponse);
        setPoliticalData(politicalResponse);
        setPoliticalCounts(politicalCountResponse);
        setPlacementBasedPoliticalAdCount(politicalPlacementResponse);
        setTargetingCombinations(targetingCombinationsResponse);
        setTargetingStrategies(targetingStrategiesResponse);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  
  
 console.log(placementBasedPoliticalAdCount)
    
  });

  if (loading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;
  
 const chartData: ChartDataItem1[] = (placementPerVideoData?.videoData || []).map(video => ({
    item: video.videoId,
    placementBasedAdCount: video.placementBasedAdCount,
    restCount: video.totalAdsCount - video.placementBasedAdCount,
  })).sort((a, b) => b.placementBasedAdCount - a.placementBasedAdCount).filter(data => data.placementBasedAdCount > 0);

  return (
    <AdminLayout>
       <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <PieChart
      title='Placement-Based VS Interest-Based '
      data={targetingStrategies ? [
        { item: 'Placement-Based', count: targetingStrategies.placementBased || 0 },
        { item: 'Interest-Based', count: targetingStrategies.interestBased || 0 },
      ] : []}
    />
   <ColumnChart 
  title='Targeting Strategies Combinations Used'
  data={targetingCombinations
    ? Object.entries(targetingCombinations).map(([item, count]): ChartDataItem => ({ item, count }))
    : []}  // Fallback to an empty array if targetingCombinations is null
/>
</div>
<div className=" mt-4  md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
  <StackedColumnChart
    title=" Placement-Based Ad Count by Video"
        data={chartData}
        series={[
          {
            name: 'Placement-Based Ads',
            data: chartData.map(item => item.placementBasedAdCount),
          },
          {
            name: 'Rest Ads',
            data: chartData.map(item => item.restCount),
          },
        ]}
       
  />
</div>
<div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <ChartThree 
      title='Frequency of Political Ads' 
         data={politicalCounts ? [
        { item: 'Political ', count: politicalCounts.politicalAdCount || 0 },
        { item: 'Non-Political', count: politicalCounts.nonPoliticalAdCount || 0 },
      ] : []} />
      <ChartThree 
      title='Placement-Based Targeting in Political Ads' 
         data={placementBasedPoliticalAdCount ? [
        { item: 'Other', count: placementBasedPoliticalAdCount.politicalAdCount || 0 },
        { item: 'Placement-Based ', count: placementBasedPoliticalAdCount.placementBasedPoliticalAdCount || 0 },
       
      ] : []} />

</div>

      <div className=" mt-4  md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 col-span-14 xl:col-span-12">
      <TableAdminPoliticalAds ads={politicalData?.politicalAds || []} />
        </div>

    </AdminLayout>
  );
};

export default AdminAnalytics;
