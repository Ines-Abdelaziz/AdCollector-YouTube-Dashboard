import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
//props for TableOno 

interface AdvertiserData {
  advertiser: string;
  advertiser_link: string;
  advertiser_location: string;
  ad_count: string;
}

// Define the props for the TableOne component
interface TableOneProps {
  advertisers: AdvertiserData[];
}

const TableOne: React.FC<TableOneProps> = ({ advertisers }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Advertisors
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
        <div className="p-2.5 xl:p-5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Source
            </h5>
          </div>
          
          <div className="p-2.5 text-center xl:p-5 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Number of Ads
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Based in
            </h5>
          </div>
        
         
        </div>

         {advertisers.map((advertiser, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${
              key === advertisers.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black text-center dark:text-white">
                 <a href={advertiser.advertiser_link} target="_blank" rel="noopener noreferrer" className="text-primary underline">
               {advertiser.advertiser}
              </a>
               </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{advertiser.ad_count}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{advertiser.advertiser_location}</p>
            </div>

        
          </div>
        ))}
     
      </div>
    </div>
  );
};

export default TableOne;
