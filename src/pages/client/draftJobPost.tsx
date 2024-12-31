import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
 
const DraftJobPost = () => {
  const navigate = useNavigate(); 


  const [formData, setFormData] = useState({
    title: "",
    keyResponsiblities: "",
    requiredSkills: "",
    paymentType: "",
    description: "",
    payment: "",
    estimateTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const paymentFunction = async () => {
    try {
  
      const response = await axios.post("http://localhost:3000/client/jobPost/payment-stripe", {
        formData,
      });

      if(response && response.status === 200) {
              console.log(response.data.response.url);

              window.location.href = response.data.response.url;
      }

     
        // navigate("/client/draftJobPost/payment-success");
      
    } catch (err: any) {
      console.error("ERROR:", err.message);
      // navigate("/client/payment/failed");
    }
  };

  return (
    <div>
      <section className="bg-gray-100 py-32">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                Post your job on the world’s work marketplace and wait for proposals from talented
                people worldwide.
              </p>
              <div className="mt-8">
                <a href="#" className="text-2xl font-bold text-pink-600">
                  devlinksmart@gmail.com
                </a>
                <address className="mt-2 not-italic">282 Kevin Brook, DevLink inc, CA 58517</address>
              </div>
            </div>

            <div className="bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form className="space-y-4">
                <div>
                  <input
                    onChange={handleChange}
                    className="w-full p-3 text-sm"
                    placeholder="Title"
                    name="title"
                    type="text"
                  />
                  <hr />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      onChange={handleChange}
                      className="w-full p-3 text-sm"
                      placeholder="Key Responsibilities"
                      name="keyResponsiblities"
                      type="text"
                    />
                    <hr />
                  </div>
                  <div>
                    <input
                      onChange={handleChange}
                      className="w-full p-3 text-sm"
                      placeholder="Required Skills"
                      name="requiredSkills"
                      type="text"
                    />
                    <hr />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <label>
                    <input
                      onChange={handleChange}
                      type="radio"
                      value="hourly"
                      name="paymentType"
                      className="w-4 h-4"
                    />
                    Hourly
                  </label>
                  <label>
                    <input
                      onChange={handleChange}
                      type="radio"
                      value="fixed"
                      name="paymentType"
                      className="w-4 h-4"
                    />
                    Fixed
                  </label>
                </div>

                <div>
                  <input
                    onChange={handleChange}
                    className="w-full p-3 text-sm"
                    placeholder="Amount Pay For This Job"
                    name="payment"
                    type="number"
                  />
                  <hr />
                </div>

                <div>
                  <textarea
                    onChange={handleChange}
                    className="w-full p-3 text-sm"
                    placeholder="Description"
                    name="description"
                  />
                  <hr />
                </div>

                <div>
                  <input
                    onChange={handleChange}
                    className="w-full p-3 text-sm"
                    placeholder="Estimate Time (in Days)"
                    name="estimateTime"
                    type="number"
                  />
                  <hr />
                </div>

                <div className="mt-4">
                  <button
                    onClick={paymentFunction}
                    type="button"
                    className="inline-block w-full rounded-xl bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Proceed Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> 
    </div>
  );
};

export default DraftJobPost;
