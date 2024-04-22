import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const Terms = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Privacy Policy" />

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-7.5 p-4 sm:p-6 xl:p-9">
            <div>
              <h3 className="mb-5 text-title-md2 font-bold text-black dark:text-white">
                Privacy &amp; Data Protection Policy
              </h3>
              <p className="font-medium">
                LIX and CNRS are very attentive and vigilant regarding personal data protection (DCP) issues. CNRS has appointed a Data Protection Officer (DPO) to ensure that labs such as LIX comply with the European General Data Protection Regulation (GDPR).
              </p>
              <h4 className="mb-4 text-title-sm2 font-bold text-black dark:text-white">
                Data Collection
              </h4>
              <p className="font-medium">
                We collect data related to advertisements the user receives on YouTube by watching videos on this platform. This includes:
              </p>
              <ul className="list-disc pl-5">
                <li>Information about the ads users see when watching YouTube, including Video ads and Cards ads.</li>
                <li>Details such as advertisement video ID, advertiser's links, and any information concerning his YouTube channel, if available.</li>
                <li>The link to the service/product offered by the ads and the date/time when the ad appeared.</li>
                <li>Reasons for which an advertisement is sent to a user and the user's behavior towards the advertisement, including if the user has skipped or clicked the advertisement.</li>
                <li>Information from the Google Ad Preference Page that presents what the platform has inferred about the user.</li>
                <li>Details about the videos the user views including URL, title, description, tags, views, and details about the YouTube channel.</li>
                <li>The user's interaction with YouTube, whether logged into a Gmail account or using YouTube without an account, and the user's country.</li>
              </ul>
              <h4 className="mb-4 text-title-sm2 font-bold text-black dark:text-white">
                Special Category Data
              </h4>
              <p className="font-medium">
                Data collected might reveal sensitive information relating to a user's racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, health, criminal convictions, sex life or sexual orientation, or genetic or biometric data.
              </p>
              <h4 className="mb-4 text-title-sm2 font-bold text-black dark:text-white">
                Data Security and Access
              </h4>
              <p className="font-medium">
                The collected data will be stored on a dedicated secured server and provided to academic researchers upon justified request. Access will be granted through an authentication process once their request is validated.
              </p>
              <p className="font-medium">
                In accordance with Article 13 of the GDPR, the representative of the data controller is the director of the LIX lab, Mr. Gilles Schaeffer.
              </p>
              <p className="font-medium">
                For more details, please visit the official GDPR regulation page.
                <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                  EU GDPR Information
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Terms;
