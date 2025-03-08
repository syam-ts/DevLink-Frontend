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
                const { data } = await apiClientInstance.get(`/invites`);
                setInvites(data.invites);
            };
            fetchInvites();
        } catch (error: unknown) {
            const err = error as { message: string };
            console.log("ERROR: ", err.message);
        }
    }, []);

    return (
        <div className="w-full pt-28">
            <section className="text-center">
                <span className="font-bold text-2xl arsenal-sc-regular"> Invites </span>
                <hr />
            </section>
            <section>
                <div className="w-2/4 px-10 py-2 mx-auto arsenal-sc-regular flex-col my-6">
                    {Object.entries(invites).map((invite: any) => (
                        <div className="grid my-12 border h-[13rem] border-black rounded-xl p-3">
                            <div className="flex w-2/3  items-center gap-4 text-slate-800 mx-auto">
                                <div className="flex w-full flex-col">
                                    <div className="flex justify-between">
                                        <div className="grid">
                                            <h5 className="text-xl font-semibold text-slate-800">
                                                {invite[1]?.jobPostData?.title}
                                            </h5>
                                            <p className="text-xs uppercase font-bold text-slate-500 mt-0.5">
                                                {invite[1]?.jobPostData?.expertLevel}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-0 5">
                                            {invite[1]?.jobPostData?.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between ">
                                <div className="mx-auto">
                                    <p className="text-slate-600 font-light leading-normal">
                                        {invite[1]?.description}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        className="rounded-small bg-[#0000ff] py-1 px-4 font-bold text-center text-sm  ml-2"
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
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Invite;
