import { useState } from "react";
import apiInstance from "../../api/axiosInstance";
// import ChatHistory from "../../pages/user/chatbot/ChatHistroy";
// import Loading from "../../pages/user/chatbot/Loading";

export const Chatbot = () => {
  interface ChatMessage {
    type: "user" | "bot";
    message: string;
  }

  const [open, setOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserInput = (e: any) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async (e: any) => {
    // Caused the big bug!
    e.preventDefault();

    try {
      const { data } = await apiInstance.post(
        "http://localhost:3000/user/chatbot",
        {
          userInput,
        }
      );

      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: data?.queryResult },
      ]);
      // console.log('TEH RESULT OF CHAT BOT  :', data?.queryResult);
    } catch (err: any) {
      console.log("ERROR: ", err.message);
    }
  };

 

  return (
    <div className="mx-auto py-96 p-3 z-3">
      <button
        onClick={() => setOpen((prev: any) => !prev)}
        className="fixed bottom-4 right-4 inline-flex cursor-pointer items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0  border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
      >
        <svg
          xmlns=" http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            className="border-gray-200"
          ></path>
        </svg>
      </button>

      {open && (
        <div className="fixed z-1 shadow-2xl bottom-[calc(4rem+1.5rem)] bg-white right-0 mr-4 px-10 p-6 rounded-lg w-[450px] h-[650px]">
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="font-semibold text-lg tracking-tight">
              Devlink Chatbot
            </h2>
          </div>

          <div className='h-[500px] overflow-y-scroll '>
            {chatHistory.map((chat) => (
              <div className="pr-4">
                <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">


                  {chat.type === "user" && (
                    <div className='flex gap-3'>

                      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                        <div className="rounded-full bg-gray-100 border p-1">
                          <img src='https://cdn-icons-png.flaticon.com/128/64/64572.png' />
                        </div>
                      </span>
                      <p className="leading-relaxed">
                        <span className="block font-bold text-gray-700">Me</span>
                        {chat?.message}
                      </p>
                    </div>
                  )}

                  {chat.type === "bot" && (
                    <div className='flex gap-3'>
                      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                        <div className="rounded-full bg-gray-100 border p-1">
                          <svg
                            stroke="none"
                            fill="black"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                            ></path>
                          </svg>
                        </div>
                      </span>
                      <p className="leading-relaxed">
                        <span className="block h-10 w-10 font-bold text-gray-700 object-cover">Bot</span>
                        {chat?.message}
                      </p>
                    </div>

                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-[400px] items-center pt-0 bottom-0 fixed mb-44">
            <form className="flex  items-center justify-center w-full space-x-2">
              <input
                onChange={(e: any) => handleUserInput(e)}
                className="flex  w-full rounded-md border border-black px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Ask to bot"
                value={userInput}
              />
              <button
                onClick={sendMessage}
                className="  inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
