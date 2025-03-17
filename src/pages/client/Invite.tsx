import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

interface Invite {
    userId?: String;
    clientId?: String;
    description: String;
    jobPostData?: {
        title: string;
        description: string;
        expertLevel: String;
        location: string;
        requiredSkills: string[];
        amount: number;
        paymentType: String;
        estimateTimeinHours: Number;
        projectType: String;
    };
    status: String;
    createdAt: String;
}
 
const Invite = () => {
    const [inviteType, setInviteType] = useState<string>('pending');
    const [invites, setInvites] = useState<Invite>({
        userId: "",
        clientId: "",
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
        createdAt: "",
    });

    useEffect(() => {
        try {
            const fetchInvites = async () => {
                const { data } = await apiClientInstance.get(`/invites/${inviteType}`);
                setInvites(data.invites);
            };
            fetchInvites();
        } catch (error: unknown) {
            const err = error as { message: string };
            console.log("ERROR: ", err.message);
        }
    }, [inviteType]);

    return (
        <div className="w-full pt-28">
            <section className="text-center">
                <span className="font-bold text-2xl arsenal-sc-regular"> Invites </span>
                <hr />
            </section>

            <section>
                <div className='justify-end flex mx-[5rem] arsenal-sc-regular'>
                    <form className="w-[15rem] justify-center">
                        <select onChange={(e) => setInviteType(e.currentTarget.value)} className="border shadow-2xl border-gray-300 text-gray-900 text-sm rounded-small block w-full outline-none p-2.5">
                            <option selected value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </form>
                </div>
            </section>

            <section>
                <div className="px-10 arsenal-sc-regular grid gap-5 justify-center pt-5">
                    {
                        Object.entries(invites).length === 0 && (
                            <p className='text-xl py-44'>
                                No invites Found
                            </p>
                        )
                    }

                    {Object.entries(invites).map((invite: any) => (
                        <div className="flex border h-[10rem] shadow-xl rounded-xl w-[70rem] py-3 px-5">

                            <div className="grid w-full flex-col ">
                                <h5 className="text-xl font-semibold text-slate-800">
                                    Title: {invite[1]?.jobPostData?.title}
                                </h5>
                                <span className="text-xs uppercase font-bold text-slate-500 mt-0.5">
                                    Expert level: {invite[1]?.jobPostData?.expertLevel}
                                </span>
                                <span className="text-slate-600 font-light leading-normal">
                                    {invite[1]?.description}
                                </span>
                                <p className="text-slate-600 font-light leading-normal">
                                    Location: {invite[1]?.jobPostData?.location}
                                </p>
                            </div>

                            <div className='flex justify-end h-[2.5rem] mt-10'>
                                <button
                                    className="rounded-small bg-[#0000ff] px-5 font-bold text-sm ml-2"
                                    type="button"
                                >
                                    <Link
                                        to={`/client/job/${invite[1]?.jobPostData?._id}/client-view`}
                                        className="no-underline text-white font-bold"
                                    >
                                        View
                                    </Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Invite;
