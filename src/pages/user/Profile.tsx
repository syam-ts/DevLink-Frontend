 
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';  
import apiInstance from '../../api/axiosInstance'
import BoostPopover from '../../components/nextUi/popover/BoostAcc-Pop';
import { ProfileShimmer } from '../../components/shimmer/ProfileShimmer'
 

const Profile = () => {
  
 const navigate = useNavigate();
//  const isUser = useSelector((state: any) => state?.user?.isUser);

 const [ user, setUser]: any = useState({});

 const userId = useSelector((state: any) => state?.user?.currentUser?.user?._id)
   
 

useEffect(() => {
  const getUserData = async () => {

    try {
      
      const response = await apiInstance.axiosInstanceUser.get(`http://localhost:3000/user/profile/view/${userId}`,{
        withCredentials: true
    }); 
   
    console.log('The response ', response.data?.data)
  
      setUser(response.data.data?.user);
    } catch (err: any) { 
    if(err.response.data.message == 'No token provided') {
      navigate('/user/login')
    }
    }
  }

  getUserData();
}, []);
 



  return ( 
 <>
    {
      Object.entries(user).length == 0 ? (
        <ProfileShimmer />
      ): (
         
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
         
      </div>
      </main>
        )
      }
    
    </>
      
  );
};

export default Profile;
 



