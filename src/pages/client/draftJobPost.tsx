import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { jobPostSchema } from "../../utils/validation/jobPostSchema";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

interface JobPost {
  title?: string
  keyResponsiblities?: string
  requiredSkills?: string[]
  paymentType?: string
  amount: number
  projectType?: string
  maxProposals?: number
  description?: string
  estimateTime?: number
  location?: string
};

const DraftJobPost = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [error, setError] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string | number>();
  const [paymentType, setPaymentType] = useState<string>("");
  const [formData, setFormData] = useState<JobPost>({
    title: "",
    keyResponsiblities: "",
    requiredSkills: [],
    paymentType: "",
    amount: 0,
    projectType: "",
    maxProposals: 0,
    description: "",
    estimateTime: 0,
    location: "",
  });

  useEffect(() => {
    formData.requiredSkills = skills;
  }, [skills]);

  const handleChangeSkills = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddSkill = (event, inputValue) => {
    event.preventDefault();
    if (inputValue.trim() && !skills.includes(inputValue)) {
      setSkills((prevSkills: string[]) => [...prevSkills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveSkill = (event, skillToRemove: string) => {
    event.preventDefault();
    setSkills((prevSkills: string[]) =>
      prevSkills.filter((skill: string) => skill !== skillToRemove)
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["amount", "maxProposals", "estimateTime"].includes(name)
        ? Number(value) || 0
        : value,
    }));
  };

  console.log("Validation Errors: ", error);

  const paymentFunction = async () => {
    try {
      const validForm = await jobPostSchema.validate(formData, {
        abortEarly: false,
      });
      if (validForm) {
        const { data } = await apiClientInstance.post(`/jobPaymentStripe`, {
          formData,
        });
        if (data.success) {
          window.location.href = data.response.url;
        } else if (!data.success) {
          toast.error(data.message, {
            position: "bottom-right",
            style: {
              backgroundColor: "red",
              color: "white",
              borderRadius: "8px",
              padding: "20px",
            },
          });
        }
      } else {
        await jobPostSchema.validate(formData, { abortEarly: false });
      }
    } catch (error: unknown) {
      const err = error as { errors: string[] };
      setError(err.errors);
    }
  };

  return (
    <div className="flex justify-center py-16 gap-44 arsenal-sc-regular pt-28">
      <Sonner />
      <section>
        <div className="lg:col-span-2 lg:py-44">
          <span className="text-4xl"> Draft New Job Post </span>
          <div className="py-5">
            <hr className=" border-black" />
          </div>
          <p className="max-w-xl text-xl pt-1 comfortaa-regular">
            Post your job on the world’s work marketplace and wait for proposals
            from talented people worldwide.
          </p>
          <div className="mt-8">
            <a href="#" className="text-lg font-bold text-pink-600">
              devlinksmart@gmail.com
            </a>
            <address className="mt-2 not-italic">
              282 Bruce Stark, DevLink inc, NYC 58517
            </address>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-white shadow-2xl rounded-3xl border-gray-200 border-1  w-[900px] lg:col-span-3 lg:p-12">
          <form className="space-y-8">
            <div>
              <label className="text-black">Title</label>
              <input
                onChange={handleChange}
                className="w-full px-4 pt-3 text-sm outline-none"
                placeholder="Cloud Engineer for ongoing large scale project"
                name="title"
                type="text"
              />
              <hr />
              {error?.some((err: string) => err.includes("Title is required"))
                ? error.map((err: string, index: number) => {
                    if (err.includes("Title is required")) {
                      return (
                        <div key={index} className="text-start">
                          <span className="text-red-400 text-sm">{err}</span>
                        </div>
                      );
                    }
                    return null;
                  })
                : error.map((err: string, index: number) => {
                    if (
                      err.includes("Title is required") ||
                      err.includes("Must be atleast 10 characters") ||
                      err.includes("Must be under 80 characters")
                    ) {
                      return (
                        <div key={index} className="text-start">
                          <span className="text-red-400 text-sm">{err}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
            </div>

            <div className="grid grid-cols-0 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-black">Key Responsiblities</label>
                <input
                  onChange={handleChange}
                  className="w-full px-4 pt-3 text-sm outline-none"
                  placeholder="Freelancer need to know amazone web service, digital ocean and firebase"
                  name="keyResponsiblities"
                  type="text"
                />
                <hr />
                {error?.some((err: string) =>
                  err.includes("KeyResponsiblities is required")
                )
                  ? error.map((err: string, index: number) => {
                      if (err.includes("KeyResponsiblities is required")) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })
                  : error.map((err: string, index: number) => {
                      if (
                        err.includes("KeyResponsiblities is required") ||
                        err.includes(
                          "KeyResponsiblities must be between (20 to 150 characters"
                        ) ||
                        err.includes("KeyResponsiblities should under 150")
                      ) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
              </div>

              <div>
                <input
                  value={inputValue}
                  onChange={handleChangeSkills}
                  className="w-auto p-3 text-sm border border-gray-300 rounded outline-none"
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
                {error.some((err: string) => err.includes("Skills are required"))
                  ? error
                      .filter((err: string) => err.includes("Skills are required"))
                      .map((err: string, index: number) => (
                        <div key={index} className="text-start">
                          <span className="text-red-400 text-sm">{err}</span>
                        </div>
                      ))
                  : error
                      .filter((err: string) =>
                        [
                          "Minimum 3 skills required",
                          "Maximum 10 skills are allowed",
                        ].some((msg) => err.includes(msg))
                      )
                      .map((err: string, index: number) => (
                        <div key={index} className="text-start">
                          <span className="text-red-400 text-sm">{err}</span>
                        </div>
                      ))}
              </div>
              <div>
                {skills.map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center w-44 justify-between p-2 bg-gray-100 rounded mb-2"
                  >
                    <span className="text-sm">{skill}</span>
                    <button
                      onClick={(e) => handleRemoveSkill(e, skill)}
                      className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid items-center gap-3">
              <label className="text-black">Payment Type</label>
              <div className="flex gap-5">
                <label>
                  <input
                    onChange={handleChange}
                    onClick={() => setPaymentType("hourly")}
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
                    onClick={() => setPaymentType("fixed")}
                    type="radio"
                    value="fixed"
                    name="paymentType"
                    className="w-4 h-4"
                  />
                  Fixed
                </label>
              </div>
              {error?.some((err: string) =>
                err.includes("Payment type is required")
              )
                ? error.map((err: string, index: number) => {
                    if (err.includes("Payment type is required")) {
                      return (
                        <div key={index} className="text-start">
                          <span className="text-red-400 text-sm">{err}</span>
                        </div>
                      );
                    }
                    return null;
                  })
                : error.map((err: string, index: number) => {
                    if (
                      err.includes("Payment type is required") ||
                      err.includes(
                        "Payment type must be either 'hourly' or 'fixed'"
                      )
                    ) {
                      return (
                        <div key={index} className="text-start">
                          <span className="text-red-400 text-sm">{err}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
            </div>

            <div className="flex gap-44">
              {paymentType === "hourly" ? (
                <div>
                  <label className="text-black">Amount Pay for this job</label>
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="w-full px-4 pt-3 outline-none text-sm"
                    placeholder="250rs"
                    name="amount"
                    type="number"
                    min="100"
                    max="1500"
                  />
                  <hr />
                  {error.some((err: string) => err.includes("Payment is required"))
                    ? error
                        .filter((err: string) =>
                          err.includes("Payment is required")
                        )
                        .map((err: string, index: number) => (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        ))
                    : error
                        .filter((err: string) =>
                          [
                            "Hourly rate must be at least 100rs",
                            "Hourly rate must be at most 1500rs",
                          ].some((msg) => err.includes(msg))
                        )
                        .map((err: string, index: number) => (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        ))}
                </div>
              ) : (
                <div>
                  <label className="text-black">Amount Pay for this job</label>
                  <input
                    onChange={handleChange}
                    className="w-full px-4 pt-3 outline-none text-sm"
                    placeholder="15000rs"
                    name="amount"
                    type="number"
                  />
                  <hr />
                  {error.some((err: string) => err.includes("Payment is required"))
                    ? error
                        .filter((err: string) =>
                          err.includes("Payment is required")
                        )
                        .map((err: string, index: number) => (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        ))
                    : error
                        .filter((err: string) =>
                          [
                            "Fixed price must be at least 2000rs",
                            "Fixed price must be at most 70000rs",
                          ].some((msg) => err.includes(msg))
                        )
                        .map((err: string, index: number) => (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        ))}
                </div>
              )}
              <div>
                <label className="text-black">Project Type</label>
                <div>
                  <select
                    name="projectType"
                    className="w-full py-2 outline-none"
                    onChange={handleChange}
                  >
                    <option value="ongoing project">Ongoing Project</option>
                    <option value="project updation">Project Updation</option>
                  </select>
                </div>
                <hr className="w-72" />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-80 mx-2">
                <label className="text-black">Expertize Level</label>
                <div>
                  <select
                    name="expertLevel"
                    className=" py-2 outline-none"
                    onChange={handleChange}
                  >
                    <option selected value="beginner">
                      Beginner
                    </option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <hr className="w-full" />
              </div>

              <div className="w-72 py-2.5">
                <label className="text-black">Maximum Proposals </label>
                <div>
                  <input
                    onChange={handleChange}
                    type="number"
                    name="maxProposals"
                    className="px-10 outline-none"
                    placeholder="proposals (7)"
                  />
                </div>
                <hr className="w-full" />
                {error?.some((err: string) =>
                  err.includes("Maximum proposal is required")
                )
                  ? error.map((err: string, index: number) => {
                      if (err.includes("Maximum proposal is required")) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })
                  : error.map((err: string, index: number) => {
                      if (
                        err.includes("Maximum proposal is required") ||
                        err.includes("Minimum 3 proposals are mandatory") ||
                        err.includes("Maximum proposals are 10")
                      ) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
              </div>
            </div>

            <div>
              <label className="text-black">Description</label>
              <textarea
                onChange={handleChange}
                className="w-full px-4 pt-3 outline-none text-sm"
                placeholder="Cloud engineer urgent requirement with experties of more than 3 years....."
                name="description"
              />
              <hr />
              {error?.some((err: string) =>
                err.includes("Description is required")
              )
                ? error.map((err: string, index: number) => {
                    if (err.includes("Description is required")) {
                      return (
                        <div key={index} className="text-start">
                          <span className="text-red-400 text-sm">{err}</span>
                        </div>
                      );
                    }
                    return null;
                  })
                : error.map((err: string, index: number) => {
                    if (
                      err.includes("Description is required") ||
                      err.includes(
                        "Description should have atleast 20 500 characters"
                      ) ||
                      err.includes("Maximum characters are 500")
                    ) {
                      return (
                        <div key={index} className="text-start">
                          <span className="text-red-400 text-sm">{err}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
            </div>

            <div className="flex gap-16">
              {paymentType === "hourly" ? (
                <div>
                  <label className="text-black"> Estimate Time </label>
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="w-full px-4 pt-3 outline-none text-sm"
                    placeholder="15hrs"
                    name="estimateTime"
                    type="number"
                    min="100"
                    max="1500"
                  />
                  <hr />
                  {error.some((err: string) =>
                    err.includes("Estimate time is required")
                  )
                    ? error
                        .filter((err: string) =>
                          err.includes("Estimate time is required")
                        )
                        .map((err: string, index: number) => (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        ))
                    : error
                        .filter((err: string) =>
                          [
                            "Estimate time must be at least 5hr",
                            "Estimate time must be at most 48hrs",
                          ].some((msg) => err.includes(msg))
                        )
                        .map((err: string, index: number) => (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        ))}
                </div>
              ) : (
                <div>
                  <label className="text-black">Estimate Time</label>
                  <input
                    onChange={handleChange}
                    className="w-full px-4 pt-3 outline-none text-sm"
                    placeholder="44hrs"
                    name="estimateTime"
                    type="number"
                  />
                  <hr />
                  {error.some((err: string) =>
                    err.includes("Estimate time is required")
                  )
                    ? error
                        .filter((err: string) =>
                          err.includes("Estimate time is required")
                        )
                        .map((err: string, index: number) => (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        ))
                    : error
                        .filter((err: string) =>
                          [
                            "Estimate time must be at least 10hr",
                            "Estimate time must be at most 120hrs",
                          ].some((msg) => err.includes(msg))
                        )
                        .map((err: string, index: number) => (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        ))}
                </div>
              )}

              <div>
                <label className="text-black">Location</label>
                <input
                  onChange={handleChange}
                  className="w-full px-4 pt-3 text-sm outline-none"
                  placeholder="Gurgaon"
                  name="location"
                  type="string"
                />
                <hr />
                {error?.some((err: string) => err.includes("Location is required"))
                  ? error.map((err: string, index: number) => {
                      if (err.includes("Location is required")) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })
                  : error.map((err: string, index: number) => {
                      if (
                        err.includes("Location is required") ||
                        err.includes(
                          "Location need to be valid(3 characters)"
                        ) ||
                        err.includes(
                          "Location need to be valid(25 characters maximum)"
                        )
                      ) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
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
      </section>
    </div>
  );
};

export default DraftJobPost;
