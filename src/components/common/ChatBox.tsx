import { createSocketConnection } from "../../utils/socket/socket";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"; 
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

interface Messages {
    name: string,
    roleType: string,
    text: string
}

const ChatBox = ({roleType, targetId}: any) => {

    const [messages, setMessages] = useState<Messages[]>([]);
    const [newMessage, setNewMessage] = useState("");
    // const { roleType, targetId } = useParams();
    const socketRef = useRef<any>(null);

    let name, roleId; 

    if (roleType === 'user') {
        name = useSelector((state: any) => state?.user?.currentUser?.name);
        roleId = useSelector((state: any) => state?.user?.currentUser?._id);
    } else {
        name = useSelector((state: any) => state?.client?.currentClient?.companyName);
        roleId = useSelector((state: any) => state?.client?.currentClient?._id);
    }


    const fetchChatMessages = async () => {
        let response;
        if(roleType === 'user') {
            response = await apiUserInstance.get(`/chat/view/${roleType}/${roleId}/${targetId}`, {
                withCredentials: true
            });
        } else {
            response = await apiClientInstance.get(`/chat/view/${roleType}/${roleId}/${targetId}`, {
                withCredentials: true
            });
        }
     
        console.log(response.data.messages.messages);
        setMessages(response.data.messages?.messages);
    };

    console.log('id, ',roleId)

    useEffect(() => {
        fetchChatMessages();
    }, [targetId]);



    useEffect(() => {
        if (!roleId || !targetId) return;
        if (!socketRef.current) {
            socketRef.current = createSocketConnection();
        }

        const socket = socketRef.current;
        socket.emit("joinChat", { name, roleId, targetId });

        socket.on("messageReceived", ({ name, text, roleType }: any) => {
            setMessages((messages) => [...messages, { name, text, roleType }]);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.off("messageReceived");
            }
        };
    }, [roleId, targetId]);





    const sendMessage = () => {
        if (!socketRef.current) return;

        socketRef.current.emit("sendMessage", {
            name,
            roleType,
            roleId,
            targetId,
            text: newMessage,
        });
        setNewMessage("");
    };


    return (

        <section>
            <div className="flex-1  sm:p-6 flex rounded-xl justify-between shadow-2xl flex-col h-[50rem] w-[70rem] mx-10 border border-gray-800">
                <div className="flex sm:items-center justify-between py-3 ">

                </div>
                <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-hide scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">

                    <div className="chat-message">

                        {
                            messages.map((message: Messages) => (
                                <div>{
                                    roleType === 'user' ? (
                                        <div className={`grid gap-3 ${message.roleType === "user" ? "justify-end" : "justify-start"} `} >
                                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">

                                                <div >

                                                    <div>
                                                        <div>
                                                            <span>{message.name}</span>
                                                        </div>
                                                        <div>
                                                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                                {message.text}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                                        </div>
                                    ) : (
                                        <div className={`grid gap-3 ${message.roleType === "client" ? "justify-end" : "justify-start"}`}  >
                                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2" >

                                                <div >
                                                    <div>
                                                        <div>
                                                            <span>
                                                                {message.name}
                                                            </span>
                                                        </div> 
                                                        <div>
                                                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                                {message.text}
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                                        </div>
                                    )
                                }

                                </div>

                            ))
                        }


                    </div>

 
              

                </div>
                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="relative flex">

                        <input value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)} type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" />
                        <div className="absolute right-0 items-center inset-y-0 sm:flex">


                            <button
                                onClick={sendMessage} type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out  text-white bg-[#0000ff] hover:bg-blue-400 focus:outline-none">
                                <span className="font-bold">Send </span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>



        </section>

    );
};


export default ChatBox;