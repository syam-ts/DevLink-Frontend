import { Link } from "react-router-dom";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { useState } from "react";

const Search = () => {
    const [jobs, setJobs] = useState({});
    const [input, setInput] = useState<string>("");

    const searchFuntion = async (input: string) => {
        try {
            setInput(input);
            const { data } = await apiUserInstance.post("/searchJobs", {
                input,
            });
            setJobs(data.jobs);
        } catch (error: unknown) {
            const err = error as { message: string };
            console.error(err.message);
        }
    };

    return (
        <div>
            <form
                action="https://eliteai.tools/search"
                className="relative flex flex-col items-center justify-center max-w-2xl gap-2 px-2 mx-auto bg-white border rounded shadow-2xl min-w-sm md:flex-row focus-within:border-gray-300"
            >
                <div className="relative w-full">
                   <div className='flex'>
                   <input
                        onChange={(e) => searchFuntion(e.target.value)}
                        id="search-bar"
                        placeholder="React.js Developer....."
                        name="q"
                        value={input}
                        className="flex-1 w-full px-6 py-2 bg-white rounded outline-none arsenal-sc-regular "
                    />
                    <img src='https://cdn-icons-png.flaticon.com/128/54/54481.png' className='w-4 h-4 mt-2.5 mx-2 opacity-45' alt='search icon'/>
                   </div>
                    {input !== "" && (
                        <div className="absolute w-[40rem] pt-2 border bg-white overflow-hidden border-gray-300 rounded shadow-lg z-10">
                            <ul className="divide-y text-start divide-gray-200">
                                {Object.entries(jobs).map((job: any) => (
                                    <li
                                        onClick={() => setInput("")}
                                        className="py-3 cursor-pointer hover:bg-gray-100"
                                    >
                                        <Link
                                            to={`/user/job/${job[1]._id}/user-view`}
                                            className="no-underline text-black arsenal-sc-regular"
                                        >
                                            {job[1].title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Search;
