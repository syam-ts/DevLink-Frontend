import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

function SuccessPayment() {

  const { data } = useParams<{
    clientId: string;
    data: string;
  }>();

  const finalData = JSON.parse(decodeURIComponent(data));
  console.log('The final Set of Data: ', finalData)

  useEffect(() => {
    try {
      (async () => {
        const response = await apiClientInstance.post(
          `/paymentSuccess`,
          { data: finalData },
          {
            withCredentials: true,
          }
        );

        console.log("The Response: ", response.data);
      })();
    } catch (err) {
      console.error("ERROR: ", err.messsage);
    }
  }, []);

  return (
    <div>
      <div className="h-screen py-44">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <Link to="/client/home">
                <a
                  href="#"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  GO BACK
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPayment;
