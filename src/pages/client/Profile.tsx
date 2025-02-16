import { useSelector } from 'react-redux';
import { useEffect, useState } from "react"; 
import EditModal from '../../components/nextUi/modals/editProfileClientModal'
import { apiClientInstance } from '../../api/axiosInstance/axiosClientRequest';
import ClientProfileAlter from '../../components/shadcn/modal/clientProfileAlterModal';

const Profile = () => {
  

 const [ client, setClient]: any = useState({});
 const [isVerified , setIsVerified] = useState<boolean>(false);

 const clientId = useSelector((state: any) => state?.client?.currentClient?._id)
  
  
 

useEffect(() => {
  const getClientData = async () => { 
    try {
      
      const response = await apiClientInstance.get(`/profile/view/${clientId}`,{
        withCredentials: true
    }); 
    
      setIsVerified(response.data?.data?.isVerified)
      setClient(response.data?.data);
    } catch (err: any) { 
         console.log(err.message);
    }
  };
 
  getClientData();
}, []);
 
 

   return ( 
     <>

      {
        !isVerified ? (
          <div className='text-center p-44 arsenal-sc-regular'>
            <div className='grid text-lg'>
              <span>{client?.companyName}</span>
              <span>{client?.email}</span>
            </div>
           <div className='pt-5'>
             <span className='text-2xl comfortaa-regular'>
               Your Account is not Verified
             </span>
           </div>
             <div className="w-full mx-auto py-10">
                <div className="py-6 px-3 mt-32 sm:mt-0">
                  <button className="bg-[#16b6a5] active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                      {/* <EditModal clientId={clientId?._id} type={'verification'} /> */}
                      <ClientProfileAlter clientId={clientId} type="verify" />
                  </button>
                </div>
              </div>
         
          </div>
        ) : (
<main className="profile-pag py-60">
     
     <div> 
        <section className="relative block h-500-px">
        <div className="absolute top-0 w-full h-full bg-center bg-cover"
         style={{backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')`}}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: 'translateZ(0px)'}}>
          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border-t border-gray-100 shadow-xl rounded-3xl -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
            
                </div>
           
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                <div className="py-6 px-3 mt-32 sm:mt-0">
                  <button className="bg-[#16b6a5] active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                     <EditModal clientId={clientId?._id} type={'edit'} /> 
                  </button>
                </div>
              </div>
           
   
               
              </div>
     
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {client?.companyName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-thin">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                   {client?.domain}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-thin">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                   {client?.email} 
                 {
                  client?.isVerified && (
                    <span className="inline-flex ml-1 items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-[#0661ff]">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                    <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                    </svg>
                    <span className="sr-only">Icon description</span>
                    </span>
                  )
                 }
 

                </div>
           
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                   {client?.location}
                </div>
           
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                   {client?.since}
                </div>
           
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">Total Employees - {client?.numberOfEmployees}</i>
                   
                </div>
           
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                   {client?.location}
                </div>

 
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    { client?.description }
                    </p>  
                    {/* <a href="#pablo" className="font-normal text-pink-500">Show more</a> */}
                   </div>
                  </div>
              </div>


            </div>
          </div>
        </div>
        </section>

    </div>
      
    </main>
        )
      }
    
    </>
  );
};

export default Profile;
 



