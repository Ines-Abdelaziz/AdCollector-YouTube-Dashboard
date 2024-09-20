import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

// Define the props for the TablePoliticalAds component
interface PoliticalAdData {
      adId: string,
      advertiser: string,
      advertiserLink: string,
      advertiserLocation: string,
      brand : string,
      id: string,
      strategyCombination: string,
}

// Define the props for the TablePoliticalAds component
interface TablePoliticalAdsProps {
  ads: PoliticalAdData[];
}
 const opts = {
      height: '144',
      width: '256',
     playerVars: {
      autoplay: 0, // Ensure video does not autoplay
    },
     rel: 0, // Do not show related videos
    showinfo: 0, // 
    };
 const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

const TablePoliticalAds: React.FC<TablePoliticalAdsProps> = ({ ads }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Political Ads Details
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Video Format
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Advertiser
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Location
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Targeting Strategies
            </h5>
          </div>
        </div>

        {ads.map((ad, key) => (
          <div
            className={`grid grid-cols-4 sm:grid-cols-4 ${
              key === ads.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black text-center dark:text-white">
                <YouTube videoId={ad.id} opts={opts} onReady={onPlayerReady} />
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black text-center dark:text-white">
                <a href={ad.advertiserLink} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  {ad.advertiser}
                </a>
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{ad.advertiserLocation}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{ad.strategyCombination}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablePoliticalAds;
