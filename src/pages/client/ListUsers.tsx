import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { useEffect, useState } from "react" 
import { Link } from "react-router-dom";


function ListUsers() {

  const [developers, setDevelopers] = useState({}); 

  useEffect(() => { 
    try {
      (async () => {
        const { data } = await apiClientInstance.get('/developers/allDevelopers');
        console.log(data.developers);
        setDevelopers(data.developers);
      })();

    } catch (err: any) {
      console.error('ERROR: ', err.message);
    }
  }, [])


  return (

    <div className='arsenal-sc-regular'>
      <section className='text-center my-12 mt-44'>
        <span className='text-3xl'>Top Freelancers</span> <br />
        <span>List of all freelancers</span>
        <hr className='border-gray-400 mt-12 w-2/4 mx-auto' />

      </section>

      <section>
        <div className='flex flex-wrap mt-20 gap-12 px-60 mx-auto justify-center arsenal-sc-regular'> 
          {
            Object.entries(developers).map((developer: any) => (
              <div className="relative rounded-lg group gap-20 transition-all border duration-500 w-[248px] h-[350px]">
                <div>
                  <Link to={`/client/userProfile/view/${developer[1]?._id}/client-view`}>
                    <img className="transition-all duration-500 group-hover:grayscale-0 rounded-lg object-cover group-hover:rounded-br-[80px] w-[248px] h-[248px]"
                      src={developer[1]?.profilePicture || 'https://img.freepik.com/premium-vector/professional-grey-default-avatar-profile-icon-placeholder_1147429-12635.jpg'} alt='developer-image' />
                  </Link>
                  <div className='flex '>
                    <div className="transition-all duration-500 ">
                      <p className="text-base text-gray-900 ">{developer[1].name}</p>
                      <p className="text-sm text-gray-700 ">{developer[1]?.domain}</p>
                    </div>

                    <div>
                      <span>* * * * *</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default ListUsers