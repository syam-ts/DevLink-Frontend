import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";


function ListAllUserChat() {

    const [data, setData] = useState({}); 
    const {roleType, roleId}= useParams<{roleType?: string, roleId?: string}>();
    const [currentRoleId, setCurrentRoleId] = useState<string>("");
 

    useEffect(() => {

        (async () => {
            let response;

            if(roleType === 'user') {
                 response = await apiUserInstance.get(`/allChat/view/${roleId}`); 
            } else {
                 response = await apiClientInstance.get(`/allChat/view/${roleId}`); 
            }
               
            setData(response.data.data); 
        })();

    }, []);
  


    return (
        <div className=' flex my-10 arsenal-sc-regular justify-between'>
            <section className=' mx-4 '>
                <div className="relative flex w-96 flex-col rounded-lg bg-white  ">
                    {
                        Object.entries(data).map((d: any) => (
                            <div className="flex rounded-xl border-gray-500 border h-20 shadow-xl w-full flex-col gap-2 m-3">
                                <div
                                    role="button"
                                    className="text-black flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                                >  
                                    <div className='flex gap-4'>
                                     
                                        <div className="mr-4 grid place-items-center">
                                            <img
                                                alt="candice"
                                                src="https://docs.material-tailwind.com/img/face-1.jpg"
                                                className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                                            />
                                        </div>
                                        <div> 
                                          {
                                            roleType === 'client' && (
                                                <div className='cursor-pointer' onClick={() =>setCurrentRoleId(d[1]?.members[1])}>
                                                      <p className="text-black text-xl  mx-10 my-2">
                                               {d[1]?.userData?.userName} 
                                            </p>
                                            {/* <div> 
                                            <button className='bg-violet-700 py-1.5 px-4 rounded-xl text-white '>
                                                <Link to={`/${roleType}/chat/view/${roleType}/${d[1]?.members[1]}`} className='no-underline text-white arsenal-sc-regular'>
                                                  Chat
                                                </Link>
                                            </button>
                                        </div> */}
                                                </div>
                                            )
                                          }
                                          {
                                            roleType === 'user' && (
                                                <div className='cursor-pointer' onClick={() =>setCurrentRoleId(d[1]?.members[0])}>
                                                      <p className="text-black text-xl mx-10 ">
                                               {d[1]?.clientData?.companyName}
                                            </p>
                                            {/* <div> 
                                            <button className='bg-violet-700 py-1.5 px-4 rounded-xl text-white '>
                                                <Link to={`/${roleType}/chat/view/${roleType}/${d[1]?.members[0]}`} className='no-underline text-white arsenal-sc-regular'>
                                                  Chat
                                                </Link>
                                            </button>
                                        </div> */}
                                                </div>
                                            )
                                          }
                                        </div>
                                      
                                    </div>

                                </div>
                            </div>
                        ))
                    }


                </div>
            </section>

            <span className='inline-block mx-3 h-screen min-h-[1em] border-1  bg-black'></span>

            <section className='w-full'>
                <div> 
                   {/* <ChatBox  /> */}
                   <ChatBox roleType={roleType} targetId={currentRoleId}  />
                </div>
            </section>
        </div>

    )
}

export default ListAllUserChat