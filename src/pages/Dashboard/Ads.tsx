import React, { useEffect, useState ,useMemo  } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from 'react-table';
import TableAds from '../../components/Tables/TableAds';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchUserAds } from '../../services/apiService'; // Import the service function
import Loader from '../../common/Loader';
import YouTube, { YouTubeProps } from 'react-youtube';

const Ads: React.FC = () => {
interface AdData {
  advertiser: string;
  advertiser_location: string;
  topic: string;
  google_information: string;
  other_information: string;
  advertiser_link: string;
  adlink: string;
}
  const { userId } = useParams(); 

  const [data, setData] = useState<AdData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    fetchUserAds(userId)
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        setError(error);
        setLoading(false);
      });
  }, [userId]);

 const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
 const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  const columns = useMemo<Column<AdData>[]>(
    () => [
      {
        Header: 'Advertiser',
        accessor: 'advertiser',
        Cell: ({ cell: { value }, row: { original } }) => (
          <a href={original.advertiser_link} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        ),
      },
      {
        Header: 'Location',
        accessor: 'advertiser_location',
      },
      {
        Header: 'Topic',
        accessor: 'topic',
      },
      {
        Header: 'Google Information',
        accessor: 'google_information',
      },
      {
        Header: 'Other Information',
        accessor: 'other_information',
      },
      {
        Header: 'Video',
        accessor: 'adlink',
        Cell: ({ cell: { value } }) => <YouTube videoId={value} opts={opts} onReady={onPlayerReady}  />,
      },
    ],
    []
  );
  
   if (loading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <DefaultLayout>
     <TableAds columns={columns} data={data} />
    </DefaultLayout>
  );
};

export default Ads;
