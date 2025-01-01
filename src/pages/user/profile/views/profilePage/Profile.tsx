 
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Modal from '../../../../../components/nextUi/modals/editProfileUserModal'
 


const Profile = () => {
  
 const navigate = useNavigate();
//  const isUser = useSelector((state: any) => state?.user?.isUser);

 const [ user, setUser]: any = useState({});

 const userId = useSelector((state: any) => state?.user?.currentUser?.user?.user)
  

 const { _id } = userId; 

useEffect(() => {
  const getUserData = async () => {

    try {
      
      const response = await axios.get(`http://localhost:3000/user/profile/view/${_id}`,{
        withCredentials: true
    }); 
   
  
      setUser(response.data.data);
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
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-3xl -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="">
                    <img alt="user-profile" src="data:image/jpeg;base64,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" className="shadow-xl rounded-full h-44 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                    <Modal /> 
                    </button>
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
                     Name: {user?.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-thin">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  Email: {user?.email}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-thin">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  mobile:  {user?.mobile}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  Location: {user?.location}
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
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400">Skills - </i>React.js Node.js Express.js php Typescipt
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
 



