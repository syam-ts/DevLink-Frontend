import { UserProfileCard } from "../../components/nextUi/cards/userProfileCard";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { useEffect, useState } from "react";

interface Developer {
  _id: string;
  domain: string;
  location?: string;
  rating: {
    avgRating: number;
  };
  name: string;
  profilePicture: string;
}

function ListUsers() {
  const [developers, setDevelopers] = useState({});

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const { data } = await apiClientInstance.get("/developers");
        setDevelopers(data.developers);
      };
      fetchUsers();
    } catch (error: unknown) {
      const err = error as { message: string };
      console.error("ERROR: ", err.message);
    }
  }, []);

  return (
    <div className="arsenal-sc-regular pt-10">
      <section className="text-center my-12 mt-44">
        <span className="text-3xl">Top Freelancers</span> <br />
        <span>List of all freelancers</span>
        <hr className="border-gray-400 mt-12 w-2/4 mx-auto" />
      </section>
    <section className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-32">
  <div className="w-full max-w-7xl flex gap-12 flex-wrap justify-center">
    {Object.entries(developers).map(([key, developer]: [string, Developer]) => (
      <div key={key}>
        <UserProfileCard developer={developer} />
      </div>
    ))}
  </div>
</section>


    </div>
  );
}

export default ListUsers;
