import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
//props for TableOno 

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    category: 'Technology',
    ads: 1234,
    basedIn: "United States",
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    category: 'Social Media',
    ads: 2345,
    basedIn: "United States",
  },
  {
    logo: BrandThree,
    name: 'Github',
    category: 'Technology',
    ads: 3456,
    basedIn: "United States",
    
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    category: 'Entertainment',
    ads: 4567,
    basedIn: "United States",
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    category: 'Social Media',
    ads: 5678,
    basedIn: "United States",
  },
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Advertisors
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
        <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Source
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Category
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

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={brand.logo} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.category}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.ads}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.basedIn}</p>
            </div>

          
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
