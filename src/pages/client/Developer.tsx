import { UserProfileCard } from "../../components/nextUi/cards/userProfileCard";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { useEffect, useState } from "react"; 

function ListUsers() { 
  const [developers, setDevelopers] = useState({});

  useEffect(() => {
    try {
      (async () => {
        const { data } = await apiClientInstance.get('/developers');
        setDevelopers(data.developers);
      })();

    } catch (error: unknown) {
      const err = error as {message: string}
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
      <section className='flex justify-center mx-44'>
        <div className='flex gap-16 flex-wrap '>
          {
            Object.entries(developers).map((developer: any) => (
              <UserProfileCard developer={developer} />
            ))
          }
        </div>
      </section> 
    </div>
  )
}

export default ListUsers;