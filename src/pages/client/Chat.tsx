import { ChatBox } from '../../components/common/ChatBox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


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


 



    useEffect(() => {

        try {
            (async () => {


                const { data } = await axios.get(`http://localhost:3000/${roleType}/chat/${roleId}`);
                setUsers(data?.data);
                //  console.log('THE RESULT FROM GET ALL CHATS ', data.data);
            })();

        } catch (err: any) {
            console.error('ERROR: ', err.message);
        }
    }, [chatId]);


 
 
 

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
                                <li> {
                                    roleType === 'user' ? (
                                        <span className='arsenal-sc-regualr px-10 text-lg'>{user[1]?.members?.clientName}</span>
                                    ) : (
                                        <span className='arsenal-sc-regualr px-10 text-lg'>{user[1]?.members?.userName}</span>
                                    )
                                }
                                </li>
                            </ul>
                        </div>
                    ))
                }

            </div>



            <div className='w-full'>
                {
                    openChatBox && (
                        <ChatBox chatBoxData={chatBoxData} chatId={chatId} roleType={roleType} />
                    )
                }
            </div>




        </div>
    )
}



