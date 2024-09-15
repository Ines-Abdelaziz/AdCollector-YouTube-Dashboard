import axios from 'axios';
interface PoliticalAd {
      adId: string,
      advertiser: string,
      advertiserLink: string,
      advertiserLocation: string,
      adLink: string,
      strategyCombination: string,
}


export const fetchDataForUser = async (userId:any) => {
  try {
    // Fetching the number of ads watched by the user
    const adsWatchedPromise = axios.get(
      `https://ad-collector.onrender.com/user-stats/nbads/${userId}`,
    );
    // Fetching the number of videos watched by the user
    const vidsWatchedPromise= axios.get(
      `https://ad-collector.onrender.com/user-stats/nbvids/${userId}`,
    );
    // Fetching the topics occurrence by the user
    const googleReasonsPromise = axios.get(
      `https://ad-collector.onrender.com/user-stats/google-targeting-reasons/${userId}`,
    );
    // Fetching the top advertisers by the user
    const advertisersPromise = axios.get(
      `https://ad-collector.onrender.com/user-stats/top-advertisers/${userId}`,
    );
    // Fetching targeting reasons by the user
    const targetingReasonsPromise = axios.get(
      `https://ad-collector.onrender.com/user-stats/targeting-reasons/${userId}`,
    );

    const results = await Promise.all([
      adsWatchedPromise,
      vidsWatchedPromise,
      googleReasonsPromise,
      advertisersPromise,
      targetingReasonsPromise,
    ]);
    console.log(results);

    return {
      
      adsWatched: results[0].data.adsCollected,
      vidsWatched:results[1].data.VidsWatched,
      googleReasons: results[2].data,
      advertisers: results[3].data,
      targetingReasons: results[4].data,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const fetchPolitical = async (userId: string): Promise<{ politicalAds: PoliticalAd[] }> => {
  try {
    const response = await axios.get(
      `https://ad-collector.onrender.com/user-stats/political/${userId}`
    );

    // Ensure valid response data format (JSON with an array in the "result" property)
    if (!response.data || !Array.isArray(response.data.result)) {
      throw new Error('Invalid response data format');
    }

    // Extract and return an array of political ad objects
    const politicalAds = response.data.result.map((item: { ad_id: any; advertiser: any; advertiser_link: any; advertiser_location: any; adlink: any; strategy_combination: any; }) => ({
      adId: item.ad_id,
      advertiser: item.advertiser,
      advertiserLink: item.advertiser_link,
      advertiserLocation: item.advertiser_location,
      adLink: item.adlink,
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
      `https://ad-collector.onrender.com/user-stats/political-placement/${userId}`
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
      `https://ad-collector.onrender.com/user-stats/targeting-strategies/${userId}`
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
      `https://ad-collector.onrender.com/user-stats/targeting-combinations/${userId}`
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
      `https://ad-collector.onrender.com/user-stats/placement-pervideo/${userId}`
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
      `https://ad-collector.onrender.com/user-stats/count-political/${userId}`
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
  google_information: string;
  other_information: [];
  advertiser_link: string;
  adlink: string;
}

export const fetchUserAds = async (userId: any): Promise<AdData[]> => {
  try {
    const adsPromise = axios.get(`https://ad-collector.onrender.com/user-stats/ads/${userId}`);

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
      adlink: ad.adlink,
    }));
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};
