import axios from "axios";
import { useState } from "react";
import Calender from '../../components/nextUi/calender'



const DraftJobPost = () => {

    const [ formData, setFormData] = useState({
        title: "",
        keyResponsiblities:"",
        requiredSkills: "",
        paymentType: "",
        description: ""
    });


    const handleChange = (e: any) => {
  
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
 

    const createJobPost = async () => {
        try{
 
            console.log("The form data : ", formData)
            const response = await axios.post('http://localhost:3000/client/createJobPost', formData);

            console.log('The response : ', response);
        }catch(err: any) {
            console.log('ERROR: ', err.message);
        }
    }


    return (

        <div>
            <section className="bg-gray-100 py-44">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="lg:col-span-2 lg:py-12">
                            <p className="max-w-xl text-lg">
                                Post your job on the world’s work marketplace and wait for the proposals to flood in from talented people around the world.

                                Our advanced algorithms help you shortlist candidates who are the best fit. And you can check profiles, portfolios, and reviews before you give someone the green light.
                            </p>

                            <div className="mt-8">
                                <a href="#" className="text-2xl font-bold text-pink-600"> devlinksmart@gmail.com </a>
                                <address className="mt-2 not-italic">282 Kevin Brook, DevLink inc, CA 58517</address>
                            </div>
                        </div>

                        <div className=" bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                            <form action="#" className="space-y-4">
                                <div>
                                    <input onChange={handleChange}
                                        className="w-full p-3 text-sm"
                                        placeholder="Title"
                                        name="title"
                                        type="text" />
                                        <hr />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <input onChange={handleChange}
                                            className="w-full p-3 text-sm"
                                            placeholder="Key Responsiblities"
                                            name="keyResponsiblities"
                                            />
                                          <hr />
                                    </div>

                                    <div>
                                        <input onChange={handleChange}
                                            className="w-full p-3 text-sm"
                                            placeholder="Required Skills"
                                            name="requiredSkills"
                                            type="tel" />
                                         <hr />
                                    </div>

                                    <div>
                                        <input onChange={handleChange}
                                            className="w-full p-3 text-sm"
                                            placeholder="Payment Type"
                                            name="paymentType"
                                            />
                                         <hr />
                                    </div>
                                </div>

                                <div>
                                    <textarea onChange={handleChange}
                                        className="w-full p-3 text-sm"
                                        placeholder="Description" 
                                        name="description"
                                        >
                                    </textarea>
                                    <hr />
                                </div>

                                <div>
                               
                                <input onChange={handleChange}
                                            className="w-full p-3 text-sm"
                                            placeholder="Estimate Time"
                                            name="estimateTime"
                                            type="date" />
                                    {/* <Calender /> */}
                                    <hr />
                                </div>

                                <div className="mt-4">
                                    <button onClick={createJobPost}
                                        type="submit"
                                        className="inline-block w-full rounded-xl bg-black px-5 py-3 font-medium text-white sm:w-auto" >
                                        Checkout Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default DraftJobPost