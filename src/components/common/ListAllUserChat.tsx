import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";


function ListAllUserChat() {

    const [data, setData] = useState({});
    const {roleType, roleId}= useParams();

    useEffect(() => {

        (async () => {
            const { data } = await axios.get(`http://localhost:3000/${roleType}/all${roleType}`);

            console.log('THE DATA RESPONSE : ', data)
            setData(data.data)

        })();

    }, []);




    return (
        <div className=' flex my-10 arsenal-sc-regular'>
            <div className='mx-auto flex '>
                <div className="relative flex w-96 flex-col rounded-lg bg-white shadow-sm">
                    {
                        Object.entries(data).map((d: any) => (
                            <nav className="flex rounded-xl border-black h-full border w-full flex-col gap-4 m-4">
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
                                            <h6 className="text-black font-medium">
                                              {
                                                roleType === 'user' ? (
                                                    <span>  {d[1].companyName} {console.log('solo', d[1])}</span>
                                                ) : (
                                                    <span>  {d[1].name}</span>
                                                )
                                              } 
                                            </h6>
                                            <p className="text-black text-sm">
                                                {d[1].email}
                                            </p>
                                        </div>
                                        <div>
                                            <button className='bg-violet-700 py-1.5 px-4 rounded-xl text-white '>
                                                <Link to={`/${roleType}/chat/view/${roleType}/${d[1]._id}`} className='no-underline text-white arsenal-sc-regular'>
                                                  Chat
                                                </Link>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </nav>
                        ))
                    }


                </div>
            </div>
        </div>

    )
}

export default ListAllUserChat