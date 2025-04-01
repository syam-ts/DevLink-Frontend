import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const toRolePage = (): void => {
    navigate("/rt");
  };

  return (
    <div>
      <nav>
        <div className="flex items-center justify-center sm:justify-center  py-2 sm:py-3 bg-[#2b3247] w-full px-4">
          <span className="font-bold text-white text-xl sm:text-2xl py-1 nunito-regular">
            DevLink
          </span>
          <div className="block sm:hidden"></div>
        </div>
      </nav>

      <section>
        <div className="text-center pt-12 my-6 arsenal-sc-regular">
          <span className="text-3xl">
            Hiring The Best , Make Us Proud And Joy
          </span>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row justify-center items-center py-12 :mx-auto mx-auto max-w-[1100px] my-20 border border-black rounded-xl px-6 md:px-12">
          <div className="w-full md:w-1/3 flex justify-center md:justify-start">
            <img
              src="http://localhost:5173/public/landingpage_left.png"
              alt="profile-image"
              className="max-w-[80%] md:max-w-full h-auto"
            />
          </div>

          <div className="w-full md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="pt-12 md:pt-52 justify-center flex flex-wrap">
              <div>
                <span className="arsenal-sc-regular text-lg md:text-xl ">
                  We connect people to
                </span>
              </div>
              <span className="arsenal-sc-regular text-lg md:text-xl">
                bring projects to life
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <img
              src="http://localhost:5173/landingpage_right.png"
              alt="profile-image"
              className="max-w-[80%] md:max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="text-center pt-8 sm:pt-10 md:pt-12 my-4 sm:my-6 px-4">
          <span className="text-xl sm:text-2xl md:text-3xl arsenal-sc-regular">
            Unlimited Oppurtunities...
          </span>
        </div>
      </section>

      <section>
        <div className="flex mt-20 justify-end bg-[#2b3247] ">
          <img
            src="/landingpage_2.png"
            alt="freelance-image"
            className="px-20"
          />
        </div>
      </section>

      <section>
        <div className="flex flex-col lg:flex-row p-4 sm:p-8 md:p-12 lg:p-20 mt-12 md:mt-20 lg:mt-28 arsenal-sc-regular">
          <div className="mx-auto lg:ml-4 xl:ml-44">
            <img
              src="/public/landingpage_bigimage.png"
              alt="professional image"
              className="w-full max-w-md lg:max-w-none h-auto"
            />
          </div>

          <div className="text-center mx-auto mt-8 lg:mt-44 px-4">
            <span className="font-bold text-2xl sm:text-3xl md:text-4xl">
              Bussiness Elavators and
            </span>
            <div>
              <span className="font-bold text-2xl sm:text-3xl md:text-4xl">
                Carrer Crafters
              </span>
            </div>
            <div className="pt-6 md:pt-12 text-lg md:text-2xl space-y-2">
              <p className="max-w-md mx-auto">
                Our being able to do what we like best, every pleasure is to be
                welcomed and every pain avoided but in certain circumstances and
                owing to the claims of duty or the obligations.
              </p>
            </div>
            <button
              onClick={toRolePage}
              className="bg-[#0000ff] w-44 rounded-small text-white font-bold hover:bg-green-500 h-10 sm:h-12 mt-6 sm:mt-8 md:mt-12"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center min-h-[12rem] sm:min-h-[14rem] md:min-h-[17rem] w-full bg-[#2b3247] mt-12 sm:mt-20 md:mt-28 lg:mt-36 arsenal-sc-regular px-4 py-6 md:py-[4rem]">
          <ul className="grid gap-0.5 sm:gap-2 text-white max-w-4xl mx-auto">
            <li className="text-lg sm:text-2xl md:text-3xl font-medium mb-1 sm:mb-3">
              Find an Expert for Anything which is Technological
            </li>
            <li className="text-xs sm:text-sm md:text-md">
              Work with highly-efficient freelance talent from around the
              country.
            </li>
            <li className="text-xs sm:text-sm md:text-md">
              Take control of your project with Devlink.
            </li>
            <li className="text-xs sm:text-sm md:text-md">
              Pay securely and confidently.
            </li>
            <li className="text-xs sm:text-sm md:text-md">No hillden fees.</li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
