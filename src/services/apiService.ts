import axios from 'axios';
interface PoliticalAd {
  adId: string,
  advertiser: string,
  advertiserLink: string,
  advertiserLocation: string,
  id: string,
  strategyCombination: string,
}


import { PoliticalAdminAd } from '../types/interfaces'; // Import the interface

export const fetchDataForUser = async (userId:any) => {
  try {
    // Fetching the number of ads watched by the user
    const adsWatchedPromise = axios.get(
      `http://localhost:3000/user-stats/nbads/${userId}`,
    );
    // Fetching the number of videos watched by the user
    const vidsWatchedPromise= axios.get(
      `http://localhost:3000/user-stats/nbvids/${userId}`,
    );
    // Fetching the topics occurrence by the user
    const googleReasonsPromise = axios.get(
      `http://localhost:3000/user-stats/google-targeting-reasons/${userId}`,
    );
    // Fetching the top advertisers by the user
    const advertisersPromise = axios.get(
      `http://localhost:3000/user-stats/top-advertisers/${userId}`,
    );
    // Fetching targeting reasons by the user
    const targetingReasonsPromise = axios.get(
      `http://localhost:3000/user-stats/targeting-reasons/${userId}`,
    );
    const topicsPromise = axios.get(
      `http://localhost:3000/user-stats/topics/${userId}`,
    );

    const results = await Promise.all([
      adsWatchedPromise,
      vidsWatchedPromise,
      googleReasonsPromise,
      advertisersPromise,
      targetingReasonsPromise,
      topicsPromise,
    ]);
    console.log(results);

    return {
      
      adsWatched: results[0].data.adsCollected,
      vidsWatched:results[1].data.VidsWatched,
      googleReasons: results[2].data,
      advertisers: results[3].data,
      targetingReasons: results[4].data,
      topicsPromise : results[5].data,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const fetchDataForAdmin = async () => {
  try {
    // Fetching the number of ads watched by the user
    const adsWatchedPromise = axios.get(
      `http://localhost:3000/nbads/`,
    );
    // Fetching the number of videos watched by the user
    const vidsWatchedPromise= axios.get(
      `http://localhost:3000/nbvids/`,
    );
    // Fetching the topics occurrence by the user
    const googleReasonsPromise = axios.get(
      `http://localhost:3000/google-targeting-reasons/`,
    );
    // Fetching the top advertisers by the user
    const advertisersPromise = axios.get(
      `http://localhost:3000/top-advertisers/`,
    );
    // Fetching targeting reasons by the user
    const targetingReasonsPromise = axios.get(
      `http://localhost:3000/targeting-reasons/`,
    );
    const topicsPromise = axios.get(
      `http://localhost:3000/topics/`,
    );


    const results = await Promise.all([
      adsWatchedPromise,
      vidsWatchedPromise,
      googleReasonsPromise,
      advertisersPromise,
      targetingReasonsPromise,
      topicsPromise,
    ]);
    console.log(results);

    return {
      
      adsWatched: results[0].data.adsCollected,
      vidsWatched:results[1].data.VidsWatched,
      googleReasons: results[2].data,
      advertisers: results[3].data,
      targetingReasons: results[4].data,
      topics : results[5].data,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const fetchPolitical = async (userId: string): Promise<{ politicalAds: PoliticalAd[] }> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user-stats/political/${userId}`
    );

    // Ensure valid response data format (JSON with an array in the "result" property)
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Extract and return an array of political ad objects
    const politicalAds = response.data.result.map((item: { ad_id: any; advertiser: any; advertiser_link: any; advertiser_location: any; id: any; strategy_combination: any;brand:any }) => ({
      adId: item.ad_id,
      advertiser: item.advertiser,
      advertiserLink: item.advertiser_link,
      advertiserLocation: item.advertiser_location,
      brand : item.brand,
      id: item.id,
      strategyCombination: item.strategy_combination,
    }));

    return { politicalAds };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};
export const fetchPoliticalPlacement = async (userId: string): Promise<{
  politicalAdCount?: number;
  placementBasedPoliticalAdCount?: number;
}> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user-stats/political-placement/${userId}`
    );

    // Ensure valid response data format (JSON with an array in the "result" property)
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Extract political ad count and placement-based political ad count
    const { poltical_ad_count, placement_based_ad_count } = response.data.result[0];

    return {
      politicalAdCount: Number(poltical_ad_count), // Convert to number
      placementBasedPoliticalAdCount: Number(placement_based_ad_count), // Convert to number
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};
export const fetchTargetingStrategies = async (userId: string): Promise<{
  placementBased?: number;
  interestBased?: number;
  other?: number;
}> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user-stats/targeting-strategies/${userId}`
    );

    // Ensure response data is valid JSON
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Efficiently extract results
    const targetingData = response.data.result.reduce((acc: { placementBased: number; interestBased: number; other: number; }, item: { targeting_category: any; occurrences: number; }) => {
      switch (item.targeting_category) {
        case 'Placement-Based':
          acc.placementBased = (acc.placementBased || 0) + Number(item.occurrences);
          break;
        case 'Interest-Based':
          acc.interestBased =  (acc.interestBased || 0) + Number(item.occurrences);
          break;
        default:
          acc.other = (acc.other || 0) + Number(item.occurrences); // Accumulate other occurrences
      }
      return acc;
    }, {});

    return targetingData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};
export const fetchTargetingCombinations = async (userId: string): Promise<{ [combination: string]: number }> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user-stats/targeting-combinations/${userId}`
    );

    // Ensure valid response data format (JSON with an array in the "result" property)
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Efficiently extract targeting combinations and occurrences
    const targetingCombinations = response.data.result.reduce((acc: { [x: string]: number; }, item: { strategy_combination: any; occurrences: any; }) => {
      const strategyCombination = item.strategy_combination;
      acc[strategyCombination] = Number(item.occurrences);
      return acc;
    }, {} as { [combination: string]: number }); // Typed accumulator

    return targetingCombinations;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};
export const fetchPlacementPerVideo = async (userId: string): Promise<{
  videoData: { videoId: string; totalAdsCount: number; placementBasedAdCount: number }[];
}> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user-stats/placement-pervideo/${userId}`
    );

    // Ensure valid response data format (JSON with an array in the "result" property)
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Efficiently extract video data with type safety
    const videoData = response.data.result.map((item: { video_id: any; total_ads_count: any; placement_based_ad_count: any; }) => ({
      videoId: item.video_id,
      totalAdsCount: Number(item.total_ads_count),
      placementBasedAdCount: Number(item.placement_based_ad_count),
    }));

    return { videoData };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};

export const fetchPoliticalCount = async (userId: string): Promise<{
  politicalAdCount?: number;
  nonPoliticalAdCount?: number;
}> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user-stats/count-political/${userId}`
    );

    // Ensure valid response data format (JSON with an array in the "result" property)
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Extract political and non-political ad counts (optional properties)
    const { political_ad_count, non_political_ad_count } = response.data.result[0];

    return {
      politicalAdCount: Number(political_ad_count), // Convert to number
      nonPoliticalAdCount: Number(non_political_ad_count), // Convert to number
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};



export const fetchAdminPolitical = async (): Promise<{ politicalAds: PoliticalAdminAd[] }> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/political`
    );

    // Ensure valid response data format (JSON with an array in the "result" property)
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Extract and return an array of political ad objects
    const politicalAds = response.data.result.map((item: { user_id: any; advertiser: any; advertiser_link: any; advertiser_location: any; id: any; targeting_strategy: any ,transcript:any}) => ({
      id: item.id,
      advertiser: item.advertiser,
      advertiserLink: item.advertiser_link,
      advertiserLocation: item.advertiser_location,
      user_id: item.user_id,
      transcript : item.transcript,
      targeting_strategy	: item.targeting_strategy	,
    }));

    return { politicalAds };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};
export const fetchAdminPoliticalPlacement = async (): Promise<{
  politicalAdCount?: number;
  placementBasedPoliticalAdCount?: number;
}> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/political-placement/`
    );

    // Ensure valid response data format (JSON with an array in the "result" property)
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Extract political ad count and placement-based political ad count
    const { poltical_ad_count, placement_based_ad_count } = response.data.result[0];

    return {
      politicalAdCount: Number(poltical_ad_count), // Convert to number
      placementBasedPoliticalAdCount: Number(placement_based_ad_count), // Convert to number
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};
export const fetchAdminTargetingStrategies = async (): Promise<{
  placementBased?: number;
  interestBased?: number;
  other?: number;
}> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/targeting-strategies/`
    );

    // Ensure response data is valid JSON
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Efficiently extract results
    const targetingData = response.data.result.reduce((acc: { placementBased: number; interestBased: number; other: number; }, item: { targeting_category: any; occurrences: number; }) => {
      switch (item.targeting_category) {
        case 'Placement-Based':
          acc.placementBased = (acc.placementBased || 0) + Number(item.occurrences);
          break;
        case 'Interest-Based':
          acc.interestBased =  (acc.interestBased || 0) + Number(item.occurrences);
          break;
        default:
          acc.other = (acc.other || 0) + Number(item.occurrences); // Accumulate other occurrences
      }
      return acc;
    }, {});

    return targetingData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};
export const fetchAdminTargetingCombinations = async (): Promise<{ [combination: string]: number }> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/targeting-combinations/`
    );

    // Ensure valid response data format (JSON with an array in the "result" property)
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Efficiently extract targeting combinations and occurrences
    const targetingCombinations = response.data.result.reduce((acc: { [x: string]: number; }, item: { strategy_combination: any; occurrences: any; }) => {
      const strategyCombination = item.strategy_combination;
      acc[strategyCombination] = Number(item.occurrences);
      return acc;
    }, {} as { [combination: string]: number }); // Typed accumulator

    return targetingCombinations;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};
export const fetchAdminPlacementPerVideo = async (): Promise<{
  videoData: { videoId: string; totalAdsCount: number; placementBasedAdCount: number }[];
}> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/placement-pervideo/`
    );

    // Ensure valid response data format (JSON with an array in the "result" property)
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Efficiently extract video data with type safety
    const videoData = response.data.result.map((item: { video_id: any; total_ads_count: any; placement_based_ad_count: any; }) => ({
      videoId: item.video_id,
      totalAdsCount: Number(item.total_ads_count),
      placementBasedAdCount: Number(item.placement_based_ad_count),
    }));

    return { videoData };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};

export const fetchAdminPoliticalCount = async (): Promise<{
  politicalAdCount?: number;
  nonPoliticalAdCount?: number;
}> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/count-political`
    );

    // Ensure valid response data format (JSON with an array in the "result" property)
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Extract political and non-political ad counts (optional properties)
    const { political_ad_count, non_political_ad_count } = response.data.result[0];

    return {
      politicalAdCount: Number(political_ad_count), // Convert to number
      nonPoliticalAdCount: Number(non_political_ad_count), // Convert to number
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for proper error handling
  }
};










interface AdData {
  advertiser: string;
  advertiser_location: string;
  topic: string;
  google_information?: string;
  other_information?: [];
  advertiser_link: string;
  id: string;
  brand : string;
}

export const fetchUserAds = async (userId: any): Promise<AdData[]> => {
  try {
    const adsPromise = axios.get(`http://localhost:3000/user-stats/ads/${userId}`);

    const results = await Promise.all([adsPromise]);
    const ads = results[0].data.ads;
    console.log(ads);

    // Filter out ads where advertiser is 'N/A'
    const filteredAds = ads.filter((ad: any) => ad.advertiser !== 'N/A');

    // Map to desired structure
    return filteredAds.map((ad: any) => ({
      advertiser: ad.advertiser,
      advertiser_location: ad.advertiser_location,
      topic: ad.topic,
      google_information: ad.google_information,
      other_information: ad.other_information,
      advertiser_link: ad.advertiser_link,
      brand : ad.brand,
      id: ad.id,
    }));
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};




export const fetchAdminAds = async (): Promise<AdData[]> => {
  try {
    // Fetch ads data from the server
    const adsPromise = axios.get(`http://localhost:3000/admin/ads`);

    // Await the promise
    const results = await Promise.all([adsPromise]);
    
    // Correctly access the ads from the response
    const ads = results[0].data.ads; // Access ads through 'data'

    // Filter out ads where advertiser is 'N/A'
    const filteredAds = ads.filter((ad: any) => ad.advertiser !== 'N/A');

    // Map to the desired structure and return
    return filteredAds.map((ad: any) => ({
      advertiser: ad.advertiser,
      advertiser_location: ad.advertiser_location,
      topic: ad.topic,
      google_information: ad.google_information,
      other_information: ad.other_information,
      advertiser_link: ad.advertiser_link,
      brand: ad.brand,
      id: ad.id,
    }));
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};
