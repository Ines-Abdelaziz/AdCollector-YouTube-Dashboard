import React, { useState } from 'react';

import { PoliticalAdminAd } from '../../types/interfaces'; // Import the interface


interface TableAdminPoliticalAdsProps {
  ads: PoliticalAdminAd[];
}

const TableAdminPoliticalAds: React.FC<TableAdminPoliticalAdsProps> = ({ ads }) => {
  // Filter unique ads by ID
  const uniqueAdsMap = new Map<string, PoliticalAdminAd>();
  ads.forEach(ad => {
    if (!uniqueAdsMap.has(ad.id)) {
      uniqueAdsMap.set(ad.id, ad);
    }
  });

  const uniqueAds = Array.from(uniqueAdsMap.values());

  // Group ads by user
  const adsByUser = uniqueAds.reduce<Record<string, PoliticalAdminAd[]>>((acc, ad) => {
    if (!acc[ad.user_id]) {
      acc[ad.user_id] = [];
    }
    acc[ad.user_id].push(ad);
    return acc;
  }, {});

  const [selectedUserId, setSelectedUserId] = useState<string>('all');

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Political Ads Details
      </h4>

      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="all">All Users</option>
        {Object.keys(adsByUser).map(userId => (
          <option key={userId} value={userId}>
            User ID: {userId}
          </option>
        ))}
      </select>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 font-semibold text-center border-b border-gray-300">
          <div className="p-2.5">Video ID</div>
          <div className="p-2.5">Advertiser</div>
          <div className="p-2.5">Location</div>
          <div className="p-2.5">Targeting Strategy</div>
          <div className="p-2.5">Transcript</div>
        </div>

        {(selectedUserId === 'all' ? uniqueAds : adsByUser[selectedUserId]).map((ad, index) => (
          <div
            className={`grid grid-cols-5 sm:grid-cols-5 ${
              index === (selectedUserId === 'all' ? uniqueAds.length : adsByUser[selectedUserId].length) - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={ad.id}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black text-center dark:text-white">{ad.id}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black text-center dark:text-white">
                <a href={ad.advertiser_link} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  {ad.advertiser}
                </a>
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{ad.advertiser_location}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{ad.targeting_strategy}</p>
            </div>
            <TranscriptCell transcript={ad.transcript} />
          </div>
        ))}
      </div>
    </div>
  );
};

const TranscriptCell: React.FC<{ transcript: string[] | null }> = ({ transcript }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const transcriptText = transcript ? transcript.join(' ') : null;

  return (
    <div className="flex items-center justify-center p-2.5 xl:p-5 max-w-xs">
      <div className="overflow-hidden">
        <p className={`text-black dark:text-white ${isExpanded ? '' : 'truncate'}`} style={{ maxHeight: isExpanded ? 'none' : '3rem' }}>
          {transcriptText || 'No transcript available'}
        </p>
        {transcriptText && transcriptText.length > 100 && (
          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="text-blue-500 underline mt-1"
          >
            {isExpanded ? 'See less' : 'See more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TableAdminPoliticalAds;
