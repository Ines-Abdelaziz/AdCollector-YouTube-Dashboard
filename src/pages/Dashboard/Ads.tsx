import React, { useEffect, useState ,useMemo  } from 'react';
import { Column } from 'react-table';
import TableAds from '../../components/Tables/TableAds';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchUserAds } from '../../services/apiService'; // Import the service function
import Loader from '../../common/Loader';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useSession } from '../../context/SessionContext';
const Ads: React.FC = () => {
const { sessionId } = useSession();

interface AdData {
  advertiser: string;
  advertiser_location: string;
  topic: string;
  google_information: string;
  other_information: [];
  advertiser_link: string;
  id: string;
  brand:string;
}

  const [data, setData] = useState<AdData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    fetchUserAds(sessionId)
      .then(data => {
        setData(data);
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        setError(error);
        setLoading(false);
      });
  }, [sessionId]);
 


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
      // {
      //   Header: 'Topic',
      //   accessor: 'topic',
      // },
      // {
      //   Header: 'Google Information',
      //   accessor: 'google_information',
      // },
      {
        Header: 'Information Used To Target You',
        accessor: 'other_information',
        Cell: ({ value }) => {
          // Check if the value is an array
          if (Array.isArray(value)) {
            return (
              <ul>
                {value.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            );
          }
          return value; // If it's not an array, just render the value as-is
        },
      },
      {
        Header: 'Video',
        accessor: 'id',
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
