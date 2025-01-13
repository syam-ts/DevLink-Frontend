 
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"; 
import apiInstance from '../../api/axiosInstance'


const Profile = () => {
  
 const navigate = useNavigate();
//  const isUser = useSelector((state: any) => state?.user?.isUser);

 const [ user, setUser]: any = useState({});
 const {userId} = useParams()

 

 console.log('The id',userId )
 

useEffect(() => {
  const getUserData = async () => {

    try {
      
      const response = await apiInstance.axiosInstanceClient.get(`http://localhost:3000/client/userProfile/view/${userId} `,{
        withCredentials: true
    }); 
   
    console.log('The response ', response.data.response)
  
      setUser(response.data.response);
    } catch (err: any) { 
    if(err.response.data.message == 'No token provided') {
      navigate('/user/login')
    }
    }
  }

  getUserData();
}, []);
 

// useEffect(() => {
//   console.log('Enterd')
//   if(isUser=== undefined) {
//       navigate('/user/login')
//   }

// }, []);

  return ( 
 
    <main className="profile-pag mt-96">
    

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
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-3xl -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="">
                    <img alt="user-profile" src={user?.profilePicture} className="shadow-xl rounded-full h-44 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                  </div>
                </div>
           
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">
                        Total Jobs
                        </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">
                        Finished
                        </span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{user?.budget}</span><span className="text-sm text-blueGray-400">
                        Pay/hour
                        </span>
                    </div>
                  </div>
                </div>
              </div>
     
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {user?.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-thin">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                   {user?.email}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-thin">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                   {user?.mobile}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user?.location}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"> </i>
                  Male - 27
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"> Education </i>University of Computer Science
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400">Domain - </i> Backend Developer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400">Skills - </i> 
                  {
                     user?.skills?.map((skill: string) => (
                             <span className='px-2 uppercase'>{skill}</span>   
                     ))
                  }
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    {user?.description}
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
  );
};

export default Profile;
 



