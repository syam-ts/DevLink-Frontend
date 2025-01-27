import { ChatBox } from '../../components/common/ChatBox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

  const socket = io('http://localhost:3000');

export const Chat = () => {
 

    const [users, setUsers] = useState({});
    const [openChatBox, setOpenChatBox] = useState(false);
    const [chatBoxData, setChatBoxData] = useState({
        sender: "",
        chatId: ""
    })
    const [message, setMessage] = useState('');
    const { roleId, roleType }: string | any = useParams();
  
 
    // useEffect(() => {
    //   socket.on('message', (message) => {
    //     console.log('hi')
    //   });
    // }, []);


    useEffect(() => {

        try{
           (async() => {
           

             const { data } = await axios.get(`http://localhost:3000/${roleType}/chat/${roleId}`);
             setUsers(data?.data);
            //  console.log('THE RESULT FROM GET ALL CHATS ', data.data);
           })();

        }catch(err: any) {
            console.error('ERROR: ',err.message);
        }
    }, []);


    const handleChange = (e: any) => {
        setMessage(e.target.value)
    }
    
  
    const sendMessage = async ( ) => {
       
         socket.emit('sendMessage', {message})
    };

    const openChatBoxFunction = (sender: string, chatId: string ) => {
        setChatBoxData({
            sender,
            chatId
        });

        setOpenChatBox(true)
    }




    return (
        <div className='flex'>

     
                   <div className='w-1/4 border-r cursor-pointer pt-44 '>
                   {
                    Object.entries(users).map((user: any, i) => (
                        <div onClick={() => openChatBoxFunction(roleId, user[1]?._id)} className='my-2 '>  
                        <ul className='flex gap-10 bg-gray-100 shadow-md rounded-xl py-2.5'>
                            <li><img src='https://pagedone.io/asset/uploads/1710412177.png' className='w-10 h-10' /></li>
                            <li> <span className='arsenal-sc-regualr px-10 text-lg'>{user[1]?.members?.userName}</span> </li> 
                        </ul>
                        </div>
                    ))
                   }
                     
                   </div>
        

            
              <div className='w-full'>
                {
                    openChatBox && (
                        <ChatBox chatBoxData={chatBoxData} />
                    )
                }
              </div>

  
       

        </div>
    )
}

 

