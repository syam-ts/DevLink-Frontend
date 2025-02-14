import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


interface Invite {
    clientId?: String;
    userId?: String;
    description: String;
    jobPostData?: {
        title: string;
        description: string;
        expertLevel: String;
        location: string;
        requiredSkills: string[];
        amount: number,
        paymentType: String,
        estimateTimeinHours: Number;
        projectType: String;
    };
    status: String;
    createdAt: String;
};

const InviteComponent = () => {

    const [invites, setInvites] = useState<Invite>({
        clientId: "",
        userId: "",
        description: "",
        jobPostData: {
            title: "",
            description: "",
            expertLevel: "",
            location: "",
            requiredSkills: [],
            amount: 0,
            paymentType: "",
            estimateTimeinHours: 0,
            projectType: "",
        },
        status: "",
        createdAt: ""
    });
    const { roleId, type } = useParams<{ roleId: string, type: string }>();


    useEffect(() => {
        try {

            (async () => {
                const { data } = await axios.get(`http://localhost:3000/user/invites/view/${roleId}`);

                setInvites(data.invites);
            })();
        } catch (err: any) {
            console.log(err.message);
        }

    }, []);
    console.log('The result , ', invites);


    return (
        <div className='w-full my-20'>
            <section className='text-center'>
                <span className='font-bold text-2xl arsenal-sc-regular'> Invites </span>
                <hr />
            </section>
            <section>
                <div className="flex w-2/4 px-10 py-2 h-full mx-auto arsenal-sc-regular flex-col rounded-lg shadow-sm border border-slate-200 my-6">
                    <div className="flex w-2/3 items-center gap-4 text-slate-800 mx-auto">
                        <div className="flex w-full flex-col">
                            <div className="flex justify-between">
                             <div className='grid'>
                             <h5 className="text-xl font-semibold text-slate-800">
                                    Nutinous compnay
                                </h5>
                            <p className="text-xs uppercase font-bold text-slate-500 mt-0.5">
                                Email @gmail.com
                            </p>
                             </div>
                                <div className="flex items-center gap-0 5">
                                    Location
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-between">
                        <p className="text-base text-slate-600 font-light leading-normal">
                            descripton goes here
                        </p>
                    <div className='flex gap-3'>
                     
                        <button className="rounded-lg bg-[#ff0000] py-1 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                            Reject
                        </button>
                        <button className="rounded-lg bg-[#0000ff] py-1 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                            View
                        </button>
                    </div>
                    </div>
                </div>
            </section>

        </div>

    )
};


export default InviteComponent;