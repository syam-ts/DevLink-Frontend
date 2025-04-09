import ChatBox from "./ChatBox";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

interface Chat {
    members: string
    userName: string
    clientData?: {
        companyName: string
    }
    userData?: {
        userName: string
    }
};

function ListAllUserChat() {
    const [currentRoleId, setCurrentRoleId] = useState<string>("");
    const [data, setData] = useState<Chat[]>([]);  
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
            setData(response.data.data);  
        })();
    }, []);

    const handleChatClick = (chatId: string) => {
        setCurrentRoleId(chatId);

        // Move the selected chat to the top
        setData((prevData) => {
            const clickedChat = prevData.find((chat) => (roleType === "client" ? chat.members[1] : chat.members[0]) === chatId);
            if (!clickedChat) return prevData;  

            const updatedChats = prevData.filter((chat) => (roleType === "client" ? chat.members[1] : chat.members[0]) !== chatId);
            return [clickedChat, ...updatedChats];  
        });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 px-2 lg:px-10 arsenal-sc-regular pt-44">
            {/* Sidebar (User List) */}
            <section className="w-full lg:w-1/4">
                <div className="relative flex flex-col px-4 bg-white rounded-small max-h-[500px]">
                    {data.map((d, index) => {
                        const chatId = roleType === "client" ? d?.members[1] : d?.members[0];
                        return (
                            <div
                                key={index}
                                className="flex border-gray-500 border shadow-xl rounded-small w-full flex-col gap-2 m-3"
                            >
                                <div
                                    role="button"
                                    className={`text-black flex w-full items-center rounded-large p-3 transition-all hover:bg-slate-100 ${currentRoleId === chatId ? "bg-[#35ec28]" : "bg-white"
                                        }`}
                                    onClick={() => handleChatClick(chatId)}
                                >
                                    <div className="flex gap-4">
                                        <img
                                            alt="profile"
                                            src="https://docs.material-tailwind.com/img/face-1.jpg"
                                            className="inline-block h-12 w-12 rounded-full object-cover"
                                        />
                                        <div>
                                            {roleType === "client" && (
                                                <p className="text-black text-sm">{d?.userData?.userName}</p>
                                            )}
                                            {roleType === "user" && (
                                                <p className="text-black text-sm">{d?.clientData?.companyName}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className="w-full lg:w-2/3">
                <ChatBox roleType={roleType} targetId={currentRoleId} />
            </section>
        </div>
    );
}

export default ListAllUserChat;
