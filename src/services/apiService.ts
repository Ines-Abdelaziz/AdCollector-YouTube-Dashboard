import axios from 'axios';

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

interface AdData {
  advertiser: string;
  advertiser_location: string;
  topic: string;
  google_information: string;
  other_information: string;
  advertiser_link: string;
  adlink: string;
}

export const fetchUserAds = async (userId: any): Promise<AdData[]> => {
  try {
    const adsPromise =  axios.get(`https://ad-collector.onrender.com/user-stats/ads/${userId}`,);

    const results = await Promise.all([adsPromise])
    const ads= results[0].data.ads
    console.log(ads)

    return ads.map((ad: any) => ({
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