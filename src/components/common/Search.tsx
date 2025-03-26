import { useState } from "react";
import { Link } from "react-router-dom";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

interface SearchProps {
    roleType: string
};

interface Jobs {
    _id: string
    title: string
};

interface Developers {
    _id: string
    name: string
    skills: string[]
};

const Search: React.FC<SearchProps> = ({ roleType }) => {
    const [jobs, setJobs] = useState<Jobs>({
        _id: "",
        title: ""
    });
    const [developers, setDevelopers] = useState<Developers>({
        _id: "",
        name: "",
        skills: [""],
    });
    const [input, setInput] = useState<string>("");
 

    const searchFuntion = async (input: string) => {
        try {
            setInput(input);
            let response;
            if (roleType === "user") {
                response = await apiUserInstance.post("/searchJobs", {
                    input,
                });
                setJobs(response.data.jobs);
            } else {
                response = await apiClientInstance.post("/searchDevelopers", {
                    input,
                });
                setDevelopers(response.data.developers);
            }
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
                    <div className="flex">
                        {roleType === "user" ? (
                            <input
                                onChange={(e) => searchFuntion(e.target.value)}
                                id="search-bar"
                                placeholder="React.js Developer....."
                                name="q"
                                value={input}
                                className="flex-1 w-full px-6 py-2 bg-white rounded outline-none arsenal-sc-regular "
                            />
                        ) : (
                            <input
                                onChange={(e) => searchFuntion(e.target.value)}
                                id="search-bar"
                                placeholder="Aman Gupta....."
                                name="q"
                                value={input}
                                className="flex-1 w-full px-6 py-2 bg-white rounded outline-none arsenal-sc-regular "
                            />
                        )}
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
                            className="w-4 h-4 mt-2.5 mx-2 opacity-45"
                            alt="search icon"
                        />
                    </div>
                    {roleType === "user" ? (
                        <div>
                            {input !== "" && (
                                <div className="absolute w-[40rem] pt-2 border bg-white overflow-hidden border-gray-300 rounded shadow-lg z-10">
                                    <ul className="divide-y text-start divide-gray-200">
                                        {Object.entries(jobs)?.map(([key, job]: [string, Jobs]) => (
                                            <li
                                                key={key}
                                                onClick={() => setInput("")}
                                                className="py-3 cursor-pointer hover:bg-gray-100"
                                            >
                                                <Link
                                                    to={`/user/job/${job._id}/user-view`}
                                                    className="no-underline text-black arsenal-sc-regular"
                                                    reloadDocument
                                                >
                                                    {job.title}  
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {input !== "" && (
                                <div className="absolute w-[40rem] pt-2 border bg-white overflow-hidden border-gray-300 rounded shadow-lg z-10">
                                    <ul className="divide-y text-start divide-gray-200">
                                        {Object.entries(developers)?.map(
                                            ([key, developer]: [string, Developers]) => (
                                                <li
                                                    key={key}
                                                    onClick={() => setInput("")}
                                                    className="py-3 cursor-pointer hover:bg-gray-100"
                                                >
                                                    <Link
                                                        to={`/client/userProfile/client-view/${developer?._id}`}
                                                        className="no-underline text-black arsenal-sc-regular"
                                                        reloadDocument
                                                    >
                                                        <div>
                                                            <div>
                                                                <p>{developer?.name} </p>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                {developer?.skills.map((skill: string) => (
                                                                    <div className=" gap-1  ">
                                                                        <p className="text-xs">{skill}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Search;
