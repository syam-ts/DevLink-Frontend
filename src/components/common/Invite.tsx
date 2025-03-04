import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";

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
        amount: number;
        paymentType: String;
        estimateTimeinHours: Number;
        projectType: String;
    };
    status: String;
    createdAt: String;
}

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
        createdAt: "",
    });
    const { roleId, type } = useParams<{ roleId: string; type: string }>();

    useEffect(() => {
        try {
            const fetchInvites = async () => {
                //roleType render pending
                const { data } = await apiUserInstance.get(`/invites`);
                console.log("the dat", data);

                setInvites(data.invites);
            };
            fetchInvites();
        } catch (error: unknown) {
            const err = error as { message: string };
            console.log("ERROR: ", err.message);
        }
    }, []);
    console.log("The result , ", invites);

    return (
        <div className="w-full my-20">
            <section className="text-center">
                <span className="font-bold text-2xl arsenal-sc-regular"> Invites </span>
                <hr />
            </section>
            <section>
                <div className="w-2/4 px-10 py-2 h-full mx-auto arsenal-sc-regular flex-col my-6">
                    {Object.entries(invites).map((invite: any) => (
                        <div className="grid my-12 border border-black rounded-xl p-10">
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
                                            {" "}
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
                                        className="rounded-small bg-[#ff0000] py-1 px-4 text-white font-bold text-center text-sm  ml-2"
                                        type="button"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        className="rounded-small bg-[#0000ff] py-1 px-4 text-white font-bold text-center text-sm  ml-2"
                                        type="button"
                                    >
                                        View
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

export default InviteComponent;
