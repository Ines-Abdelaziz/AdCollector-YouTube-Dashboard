import axios from 'axios';

export const fetchDataForUser = async (userId:any) => {
  try {
    // Fetching the number of ads watched by the user
    const adsWatchedPromise = axios.get(
      `https://ad-collector.onrender.com/user-stats/nbads/${userId}`,
    );
    // Fetching the topics occurrence by the user
    const topicsPromise = axios.get(
      `https://ad-collector.onrender.com/user-stats/topics/${userId}`,
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
      topicsPromise,
      advertisersPromise,
      targetingReasonsPromise,
    ]);
    console.log(results);

    return {
      
      adsWatched: results[0].data.adsCollected,
      topics: results[1].data,
      advertisers: results[2].data,
      targetingReasons: results[3].data,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};
