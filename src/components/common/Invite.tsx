import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
    // const { roleId, type } = useParams<{ roleId: string; type: string }>();

    useEffect(() => {
        try {
            const fetchInvites = async () => {
                //roleType render pending
                const { data } = await apiUserInstance.get(`/invites`);
                setInvites(data.invites);
            };
            fetchInvites();
        } catch (error: unknown) {
            const err = error as { message: string };
            console.log("ERROR: ", err.message);
        }
    }, []);

    return (
        <div className="w-full py-20">
            <section className="text-center">
                <span className="font-bold text-2xl arsenal-sc-regular"> Invites </span>
                <hr />
            </section>
            <section>
                <div className="w-3/5 py-2 h-full mx-auto arsenal-sc-regular flex-col my-6">
                    {Object.entries(invites).map((invite: any) => (
                        <div className="flex my-12 rounded-xl p-4 shadow-large">
                            <div className="flex w-2/3 items-center gap-4 text-slate-800 mx-auto">
                                <div className="flex w-full flex-col">
                                    <div className="flex justify-between">
                                        <div className="grid">
                                            <h5 className="text-xl font-semibold text-slate-800">
                                                Title: {invite[1]?.jobPostData?.title}
                                            </h5>
                                            <p className="text-xs uppercase font-bold text-black mt-0.5">
                                                {invite[1]?.jobPostData?.expertLevel}
                                            </p>
                                            <p className="text-md uppercase font-bold text-black mt-0.5">
                                                Description: {invite[1]?.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-24 flex gap-3">
                                <button
                                    className="rounded-small bg-[#ff0000] py-2 px-4 text-white font-bold text-center text-sm  ml-2"
                                    type="button"
                                >
                                    Reject
                                </button>
                                <button
                                    className="rounded-small bg-[#0000ff] py-2 px-4 font-bold text-center text-sm  ml-2"
                                    type="button"
                                >
                                    <Link
                                        to={`/user/job/${invite[1]?.jobPostData?._id}/invite-view`}
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

export default InviteComponent;
