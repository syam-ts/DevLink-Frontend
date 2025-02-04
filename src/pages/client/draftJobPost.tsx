import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Sonner } from '../../components/sonner/Toaster';
import apiInstance from '../../api/axiosInstance'

const DraftJobPost = () => {


  const [skills, setSkills]: any = useState([]);
  const [inputValue, setInputValue]: any = useState("");
  const [formData, setFormData]: any = useState({
    title: "",
    keyResponsiblities: "",
    requiredSkills: "",
    paymentType: "",
    payment: "",
    projectType: "",
    maxProposals: "",
    description: "",
    estimateTime: "",
    location: "",
  });

  const clientId = useSelector((state: any) => state?.client?.currentClient?._id);

 

  useEffect(() => {
    formData.requiredSkills = skills;
  }, [skills]);


  const handleChangeSkills = (e: any) => {
    setInputValue(e.target.value); // Update the input field's value
  };

  const handleAddSkill = (event: any, inputValue: any) => {
    event.preventDefault();
    if (inputValue.trim() && !skills.includes(inputValue)) {
      setSkills((prevSkills: any) => [...prevSkills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveSkill = (skillToRemove: any) => {
    setSkills((prevSkills: any) => prevSkills.filter((skill: any) => skill !== skillToRemove)); // Remove a skill
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const paymentFunction = async () => {
    try {

      const response = await apiInstance.post(`http://localhost:3000/client/jobPost/payment-stripe/${clientId}`, {
        formData,
      });



      if (response.data.success) {
        // console.log(response.data.response.url);

        window.location.href = response.data.response.url;
      } else if (response.data.success === false) {

        toast.error(response.data.message, {
          position: "bottom-right",
          style: {
            backgroundColor: "red",
            color: "white",
            borderRadius: "8px",
            padding: "20px",
          },
        });


      }


      // navigate("/client/draftJobPost/payment-success");

    } catch (err: any) {
      toast.error(err.message);

      console.error("ERROR:", err.message);
      // navigate("/client/payment/failed");
    }
  };

  return (

    <div className='flex justify-center py-32 gap-44'>
      <Sonner />
      <section>
        <div className="lg:col-span-2 lg:py-44">
          <span className='text-4xl'> Draft New Job Post </span>
          <div className='py-5'>
            <hr className=' border-black' />
          </div>
          <p className="max-w-xl text-xl pt-1 comfortaa-regular">
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
      </section>
      {/* <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
         
  
          </div>
        </div>  */}


      <section>
        <div className="bg-white shadow-2xl rounded-3xl border-gray-200 border-1  w-[900px] lg:col-span-3 lg:p-12">
          <form className="space-y-8">
            <div>
            <label className='text-gray-500'>Title</label>
              <input
                onChange={handleChange}
                className="w-full px-4 pt-3  text-sm"
                placeholder="Cloud Engineer for ongoing large scale project"
                name="title"
                type="text"
              />
              <hr />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
              <label className='text-gray-500'>Key Responsiblities</label>
                <input
                  onChange={handleChange}
                  className="w-full px-4 pt-3 text-sm"
                  placeholder="Freelancer need to know amazone web service, digital ocean and firebase"
                  name="keyResponsiblities"
                  type="text"
                />
                <hr />
              </div>
              <div>
                <input
                  value={inputValue}
                  onChange={handleChangeSkills}
                  className="w-auto p-3 text-sm border border-gray-300 rounded"
                  placeholder="Add a skill"
                  name="skills"
                  type="text"
                />
                <button
                  onClick={(e) => handleAddSkill(e, inputValue)}
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              {/* <hr className="my-3" /> */}
              <div>
                {skills.map((skill: any, index: any) => (
                  <div key={index} className="flex items-center w-44 justify-between p-2 bg-gray-100 rounded mb-2">
                    <span className="text-sm">{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
         

        <div className="grid items-center gap-3 mb-4">
            <label className='text-gray-500'>Payment Type</label>
         <div className='flex gap-5'>
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
        </div>


        <div className='flex gap-44'>
        <div>
        <label className='text-gray-500'>Amount Pay for this job</label>
          <input
            onChange={handleChange}
            className="w-full px-4 pt-3  text-sm"
            placeholder="250rs"
            name="payment"
            type="number"
          />
          <hr />
        </div>

        <div>
        <label className='text-gray-500'>Project Type</label> 
        <div>
          <select name="projectType" className='w-full py-2' onChange={handleChange}>
            <option value="ongoing project">Ongoing Project</option>
            <option value="project updation">Project Updation</option> 
          </select>
        </div> 
          <hr className='w-72' />
        </div>

        </div>

        <div className='flex justify-between'>

        <div className='w-80 mx-2'>
        <label className='text-gray-500'>Expertize Level</label> 
          <div>
          <select name="expertLevel" className=' py-2' onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option> 
            <option value="advanced">Advanced</option> 
          </select>
          </div>
          <hr className='w-full' />
        </div>
        

        <div className='w-72 py-2.5'>
        <label className='text-gray-500'>Maximum Proposals </label> 
        <div>
            <input onChange={handleChange} type='number' name='maxProposals' className='px-20' placeholder='7' />
      
        </div>
        <hr className='w-full' />
        </div>

       
         
        </div> 
         

        <div>
        <label className='text-gray-500'>Description</label>
          <textarea
            onChange={handleChange}
            className="w-full px-4 pt-3  text-sm"
            placeholder="Cloud engineer urgent requirement with experties of more than 3 years....."
            name="description"
          />
          <hr />
        </div>
        <div className='flex gap-16'>
        <div>
        <label className='text-gray-500'>Estimate Time</label>
          <input
            onChange={handleChange}
            className="w-full px-4 pt-3  text-sm"
            placeholder="16/hr"
            name="estimateTime"
            type="number"
          />
          <hr />
        </div>

        <div>
        <label className='text-gray-500'>Location</label>
          <input
            onChange={handleChange}
            className="w-full px-4 pt-3 text-sm"
            placeholder="Gurgaon"
            name="location"
            type="string"
          />
          <hr />
        </div>
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
      </section >
    </div >
  );
};

export default DraftJobPost;
