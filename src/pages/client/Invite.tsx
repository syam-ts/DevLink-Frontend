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
    const [inviteType, setInviteType] = useState<string>("pending");
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
                <div className="justify-end flex mx-[5rem] arsenal-sc-regular">
                    <form className="w-[15rem] justify-center">
                        <select
                            onChange={(e) => setInviteType(e.currentTarget.value)}
                            className="border shadow-2xl border-gray-300 text-gray-900 text-sm rounded-small block w-full outline-none p-2.5"
                        >
                            <option selected value="pending">
                                Pending
                            </option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </form>
                </div>
            </section>

            <section>
                <div className="px-10 arsenal-sc-regular grid gap-5 justify-center pt-5">
                    {Object.entries(invites).length === 0 && (
                        <p className="text-xl py-44">No invites Found</p>
                    )}

                    {Object.entries(invites).map((invite) => (
                        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-8 flex flex-col md:flex-row justify-between gap-6 transition-all duration-300 hover:shadow-2xl">
                            <div className="flex-1 space-y-3">
                                <h2 className="text-2xl font-bold text-gray-800 leading-snug">
                                    {invite[1]?.jobPostData?.title}
                                </h2>

                                <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase px-3 py-1 rounded-full">
                                    {invite[1]?.jobPostData?.expertLevel}
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {invite[1]?.description}
                                </p>

                                <p className="text-gray-500 text-sm font-medium">
                                    📍 Location:{" "}
                                    <span className="font-normal">
                                        {invite[1]?.jobPostData?.location}
                                    </span>
                                </p>
                            </div>

                            <div className="flex items-start md:items-center justify-end">
                                <Link
                                    to={`/client/job/${invite[1]?.jobPostData?._id}/client-view`}
                                    className="inline-block bg-[#0000ff] text-white px-6 py-2 rounded-small no-underline text-sm font-semibold shadow-md hover:bg-blue-700 transition duration-200"
                                >
                                    View Job
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Invite;
