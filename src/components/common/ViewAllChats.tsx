import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

interface Chat {
    members: string;
    userName: string;
    clientData?: {
        companyName: string;
    };
    userData?: {
        userName: string;
    };
}

function ListAllUserChat() {
    const [currentRoleId, setCurrentRoleId] = useState<string>("");
    const [data, setData] = useState<Chat[]>([]); // Store chat list as an array
    const [searchParams] = useSearchParams();
    const { roleType, roleId } = useParams<{ roleType?: string; roleId?: string }>();
    const targetId = searchParams.get("targetId");

    useEffect(() => {
        if (targetId) {
            setCurrentRoleId(targetId);
        }
    }, []);

    useEffect(() => {
        (async () => {
            let response;
            if (roleType === "user") {
                response = await apiUserInstance.get(`/allChat/view/${roleId}`);
            } else {
                response = await apiClientInstance.get(`/allChat/view/${roleId}`);
            }
            setData(response.data.data); // Ensure data is an array
        })();
    }, []);

    const handleChatClick = (chatId: string) => {
        setCurrentRoleId(chatId);

        // Move the selected chat to the top
        setData((prevData) => {
            const clickedChat = prevData.find((chat) => (roleType === "client" ? chat.members[1] : chat.members[0]) === chatId);
            if (!clickedChat) return prevData; // If chat is not found, return unchanged list

            const updatedChats = prevData.filter((chat) => (roleType === "client" ? chat.members[1] : chat.members[0]) !== chatId);
            return [clickedChat, ...updatedChats]; // Place clicked chat at the top
        });
    };

    return (
        <div className="flex arsenal-sc-regular justify-between pt-20">
            <section className="mx-4">
                <div className="relative flex w-96 flex-col px-4 bg-white rounded-small max-h-[500px]">
                    {data.map((d, index) => {
                        const chatId = roleType === "client" ? d?.members[1] : d?.members[0];

                        return (
                            <div
                                key={index}
                                className="flex border-gray-500 border h-20 shadow-xl rounded-small w-full flex-col gap-2 m-3"
                            >
                                <div
                                    role="button"
                                    className={`text-black flex w-full items-center rounded-large p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 ${
                                        currentRoleId === chatId ? "bg-[#35ec28]" : "bg-white"
                                    }`}
                                    onClick={() => handleChatClick(chatId)}
                                >
                                    <div className="flex gap-4">
                                        <div className="mr-4 grid place-items-center">
                                            <img
                                                alt="candice"
                                                src="https://docs.material-tailwind.com/img/face-1.jpg"
                                                className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                                            />
                                        </div>
                                        <div>
                                            {roleType === "client" && (
                                                <p className="text-black text-xl mx-10 my-2">{d?.userData?.userName}</p>
                                            )}
                                            {roleType === "user" && (
                                                <p className="text-black text-xl mx-10">{d?.clientData?.companyName}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <span className="inline-block mx-3 h-screen min-h-[1em] border bg-black"></span>

            <section className="w-full">
                <div>
                    <ChatBox roleType={roleType} targetId={currentRoleId} />
                </div>
            </section>
        </div>
    );
}

export default ListAllUserChat;
