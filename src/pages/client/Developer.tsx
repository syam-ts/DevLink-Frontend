import { useEffect, useState } from "react";
import { UserProfileCard } from "../../components/nextUi/cards/userProfileCard";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

interface Developer {
  _id: string
  domain: string
  location?: string
  rating: {
    avgRating: number
  }
  name: string
  profilePicture: string
};

function ListUsers() {
  const [developers, setDevelopers] = useState<Developer>({
    _id: "",
    domain: "",
    location: "",
    rating: {
      avgRating: 0,
    },
    name: "",
    profilePicture: "",
  });

  useEffect(() => {
    try {
      (async () => {
        const { data } = await apiClientInstance.get("/developers");
        setDevelopers(data.developers);
      })();
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
      <section className="flex justify-center mx-44">
        <div className="flex gap-16 flex-wrap ">
          {Object.entries(developers).map(
            ([key, developer]: [string, Developer[]]) => (
              <div key={key}>
                <UserProfileCard developer={developer} />
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default ListUsers;
