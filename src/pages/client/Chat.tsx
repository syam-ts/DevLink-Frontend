import { createSocketConnection } from '../../utils/socket/socket';
import { ChatBox } from '../../components/common/ChatBox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';


export const Chat = () => {


    const [users, setUsers] = useState({});
    const [openChatBox, setOpenChatBox] = useState(false);
    const [chatBoxData, setChatBoxData] = useState({
        sender: "",
        chatId: ""
    });
    const [chatId, setChatId] = useState("");
    const [message, setMessage] = useState('');
    const { roleId, roleType }: string | any = useParams();


    // new codes
    useEffect(() => {
     
        const socket = createSocketConnection();

        socket.emit("joinChat", chatId)
    }, []);

 


 

 
 
 

    const openChatBoxFunction = (sender: string, chatId: string) => {
        setChatBoxData({
            sender,
            chatId
        });
        setChatId(chatId)
       
     
        setOpenChatBox(true)
    }

console.log('CHAT ID : ', chatId)


    return (
        <div className='flex'>


            <div className='w-1/4 border-r cursor-pointer pt-44 '>
                {
                    Object.entries(users).map((user: any, i) => (
                        <div onClick={() => openChatBoxFunction(roleId, user[1]?._id)} className='my-2 '>
                            <ul className='flex gap-10 bg-gray-100 shadow-md rounded-xl py-2.5'>
                                <li><img src='https://pagedone.io/asset/uploads/1710412177.png' className='w-10 h-10' /></li>
                                <li>  
                                        <span className='arsenal-sc-regualr px-10 text-lg'>Hi</span>
                                   
                                        <span className='arsenal-sc-regualr px-10 text-lg'>hi from opponent</span>
                                
                                </li>
                            </ul>
                        </div>
                    ))
                }

            </div>



            <div className='w-full'>
                {/* {
                    openChatBox && (
                        <ChatBox chatBoxData={chatBoxData} chatId={chatId} roleType={roleType} />
                    )
                } */}
            </div>




        </div>
    )
}



