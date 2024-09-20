import React, { useEffect, useState, useMemo } from 'react';
import { Column } from 'react-table';
import TableAds from '../../components/Tables/TableAds';
import AdminLayout from '../../layout/AdminLayout';
import { fetchAdminAds } from '../../services/apiService'; // Import the service function
import Loader from '../../common/Loader';

const AdminAds: React.FC = () => {

  interface AdData {
    id: string; // Video ID
    advertiser: string;
    advertiser_location: string;
    topic: string;
    google_information?: string;
    other_information?: [];
    advertiser_link: string;
    brand: string;
  }

  const [data, setData] = useState<AdData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchAdminAds()
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
  }, []); // Ensure the effect runs only once by adding an empty dependency array

  const columns = useMemo<Column<AdData>[]>(
    () => [
      {
        Header: 'Video ID',
        accessor: 'id',  // Accessor for the video ID
        Cell: ({ cell: { value } }) => (
          <a
            href={`https://www.youtube.com/watch?v=${value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </a>
        ),
      },
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
        Header: 'Brand',
        accessor: 'brand',  // Display the brand column
      },
      {
        Header: 'Google Information',
        accessor: 'google_information',  // Display the Google information column
        Cell: ({ value }) => (
          <span>{value ? value : 'N/A'}</span>
        ),
      },
      {
        Header: 'Information Used To Target You',
        accessor: 'other_information',
        Cell: ({ value }) => {
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
    ],
    []
  );

  if (loading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <AdminLayout>
      <TableAds columns={columns} data={data} />
    </AdminLayout>
  );
};

export default AdminAds;
