import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SmallModal } from "../../components/nextUi/modals/SmallModal";

const Role = () => {
  const [checkBox, setCheckBox] = useState<string>("");
  const [modal, showModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkFn = (role: string): void => {
    setCheckBox(role);
  };

  const handleSubmit = (): void => {
    if (checkBox === "") {
      showModal(true);
      setTimeout(() => {
        showModal(false);
      }, 2000);
    } else {
      if (checkBox === "freelancer") {
        navigate("/signup?rt=user");
      } else {
        navigate("/signup?rt=client");
      }
    }
  };

  return (
    <div>
      <div>
        {modal && <SmallModal showModals={true} />}

        <div className="text-center py-24 arsenal-sc-regular">
          <span className="font-bold text-3xl">Join Us For Free</span>
        </div>
        <div className="flex items-center justify-center arsenal-sc-regular">
          <form className="flex flex-col md:flex-row gap-10 md:gap-20">
            <div
              className={` ${checkBox === "freelancer"
                  ? "text-center border border-black"
                  : "text-center"
                }`}
              onClick={() => checkFn("freelancer")}
            >
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="freelancer"
              />
              <label
                className="flex hover:border-blue-500 h-72 md:h-96 w-72 md:w-96 cursor-pointer flex-col rounded-small border border-gray-300 p-4 peer-checked:border-4"
                htmlFor="radio_1"
              >
                <img src="https://media.licdn.com/dms/image/D5612AQGctn1djk31Ww/article-cover_image-shrink_600_2000/0/1721492130919?e=2147483647&v=beta&t=jzv8vvsG25SZIkRID9XEsBNUzHy0G0Aul0CS8QgoHI0" />
                <span className="mt-2 text-lg md:text-xl font-bold">
                  {" "}
                  Freelancer{" "}
                </span>
              </label>
            </div>

            <div
              className={`${checkBox === "client"
                  ? "text-center border border-black"
                  : "text-center"
                }`}
              onClick={() => checkFn("client")}
            >
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="client"
              />
              <label
                className="flex hover:border-blue-500 h-72 md:h-96 w-72 md:w-96 cursor-pointer flex-col rounded-small border border-gray-300 p-4 peer-checked:border-4"
                htmlFor="radio_2"
              >
                <img src="https://st4.depositphotos.com/1075946/23526/i/450/depositphotos_235260704-stock-photo-smart-professional-male-client-office.jpg" />
                <span className="mt-2 text-lg md:text-xl font-bold">
                  {" "}
                  Client{" "}
                </span>
              </label>
            </div>
          </form>
        </div>
        <div className="text-center py-12">
          <button
            onClick={handleSubmit}
            className="w-44 arsenal-sc-regular bg-green-600 h-12 rounded-small text-white font-bold"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Role;
