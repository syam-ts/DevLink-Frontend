import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
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
    const debounceSearch = useDebounce(input);

    useEffect(() => {
        searchFunction(debounceSearch);
    }, [debounceSearch]);


    const searchFunction = async (debounceSearch: string) => {
        try {
            setInput(debounceSearch);
            let response;
            if (roleType === "user") {
                response = await apiUserInstance.post("/searchJobs", {
                    input: debounceSearch,
                });
                setJobs(response.data.jobs);
            } else {
                response = await apiClientInstance.post("/searchDevelopers", {
                    input: debounceSearch,
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
                className="relative flex flex-col md:flex-row items-center justify-center max-w-2xl gap-2 px-4 mx-auto bg-white border rounded shadow-2xl focus-within:border-gray-300"
            >
                <div className="relative w-full">
                    {/* Input Field */}
                    <div className="flex items-center">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            id="search-bar"
                            name="q"
                            value={input}
                            placeholder={roleType === "user" ? "React.js Developer..." : "Aman Gupta..."}
                            className="flex-1 w-full px-6 py-2 bg-white rounded outline-none arsenal-sc-regular"
                        />
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
                            className="w-4 h-4 mx-2 opacity-45"
                            alt="search icon"
                        />
                    </div>

                    {/* Dropdown Results */}
                    {input && (
                        <div className="absolute w-full md:w-[40rem] pt-2 border bg-white overflow-hidden border-gray-300 rounded shadow-lg z-10">
                            <ul className="divide-y text-start divide-gray-200 max-h-80 overflow-y-auto">
                                {roleType === "user" ? (
                                    Object.entries(jobs).map(([key, job]: [string, Jobs]) => (
                                        <li
                                            key={key}
                                            onClick={() => setInput("")}
                                            className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                                        >
                                            <Link
                                                to={`/user/job/${job._id}/user-view`}
                                                className="no-underline text-black arsenal-sc-regular"
                                                reloadDocument
                                            >
                                                {job.title}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    Object.entries(developers).map(([key, developer]: [string, Developers]) => (
                                        <li
                                            key={key}
                                            onClick={() => setInput("")}
                                            className="py-3 px-4 cursor-pointer hover:bg-gray-100"
                                        >
                                            <Link
                                                to={`/client/userProfile/client-view/${developer._id}`}
                                                className="no-underline text-black arsenal-sc-regular"
                                                reloadDocument
                                            >
                                                <div>
                                                    <p>{developer.name}</p>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {developer.skills?.map((skill: string, index: number) => (
                                                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </form>

        </div>
    );
};

export default Search;
