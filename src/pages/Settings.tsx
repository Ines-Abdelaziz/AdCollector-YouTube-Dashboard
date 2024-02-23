import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { Modal } from 'flowbite-react';
import CheckboxOne from '../components/Checkboxes/CheckboxOne';

const Settings = () => {
    const [openModal, setOpenModal] = useState(false);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
              {/* <!--  Prefrences--> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Prefrences
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
            

             
                <div className="mb-4.5">
                 <p>Thank you for participating in our research study! <br/>Our aim is to investigate the targeting of advertisements by collecting data on the ads you encounter while browsing.  <br/>Your participation provides valuable insights into the effectiveness and reach of targeted advertising strategies.  <br/>However, we understand the importance of privacy and respect your autonomy. If at any point you wish to withdraw from the study or no longer wish to participate, you can easily unsubscribe by clicking the button below. <br/> We greatly appreciate your support and contribution to our research efforts.</p>
                </div>



                <button onClick={(e) => {
                    e.preventDefault();
                    setOpenModal(true)}} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Unsubscribe From Study 
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Body>
                    <div className="fixed left-20 top-5 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-5 py-5 block">
                        <div className=" md:px-10.5 w-full max-w-142.5 rounded-lg bg-white px-6 py-10 text-center dark:bg-boxdark md:py-15">
                            <span className="mx-auto inline-block">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.1" width="60" height="60" rx="30" fill="#DC2626"></rect><path d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z" stroke="#DC2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                </span>
                                <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">Unsubscribe From Study</h3>
                                <p className="text-sm mb-8">Are you sure you want to unsubscribe from our research study? Your participation has been invaluable in our efforts to understand ad targeting online. If you proceed, your data will continue to be used for research purposes. However, if you prefer that we do not use your data, you can choose to delete it permanently by checking the box below.<br/> Thank you for your participation!</p>
                                <div className="font-bold pb-10 px-5">
                                <CheckboxOne labelText='Yes, I want to  delete my data permanently' />
                                </div>
                                
                                <div className="-mx-3 flex flex-wrap gap-y-4">
                                    <div className="2xsm:w-1/2 w-full px-3">
                                        <button  onClick={() => setOpenModal(false)} className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">Cancel</button>
                                    </div>
                                        <div className="2xsm:w-1/2 w-full px-3">
                                            <button onClick={() => setOpenModal(false)} className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90">Unsubscribe</button>
                                        </div>
                                </div>
                        </div>
                    </div>
                    </Modal.Body>
                  
                </Modal>
              </div>
            </form>
          </div>
          </div>
          <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
            

             
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Select subject"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>


                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
       
        
        </div>
        </div>
    </DefaultLayout>
  );
};

export default Settings;
