import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../../ui/label";
import React, { useEffect, useState } from "react";
import {
  clientProfileEditSchema,
  clientProfileVerifySchema,
} from "../../../utils/validation/clientProfileSchema";
import { apiClientInstance } from "../../../api/axiosInstance/axiosClientRequest";
import { useDispatch } from "react-redux";
import { addRequest } from "../../../redux/slices/adminSlice";
import { toast } from "sonner";
import { Sonner } from "../../../components/sonner/Toaster";
import { useNavigate } from "react-router-dom";

interface ClientProfileAlterProps { 
  type: string;
}

interface Client {
  companyName: string;
  location: string;
  description: string;
  numberOfEmployees: number;
  since: number;
}

const  ClientProfileAlter: React.FC<ClientProfileAlterProps> = ({ 
  type,
}) => {
 
  const [clientData, setClientData] = useState<Client>({
    companyName: "",
    location: "",
    description: "",
    numberOfEmployees: 0,
    since: 0,
  });
  const [formData, setFormData] = useState<Client>({
    companyName: "",
    location: "",
    description: "",
    numberOfEmployees: 0,
    since: 0,
  });
  const [error, setError] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Loads client existing data's
  useEffect(() => {
   try{
    (async () => {
      const response = await apiClientInstance.get(
        `/profile`,
        {
          withCredentials: true,
        }
      );
      setClientData(response?.data?.data);
    })();
   }catch(error: unknown) {
    const err = error as {message: string};
    console.error('Error: ',err.message);
   }
  }, []);
 
  const handleChange = (e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >) => {
    const { id, value }: { id: number | string, value: string | number } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }; 


  const submitForm = async () => {
    try {
      let validForm;
      if (type === "verify") {
        validForm = await clientProfileVerifySchema.validate(formData, {
          abortEarly: false,
        });
      } else {
      
        validForm = await clientProfileEditSchema.validate(formData, {
          abortEarly: false,
        });
      }

      if (validForm) {
        try {
          setError([])
          const data = {
            editData: formData,
            unhangedData: clientData,
          };

          const response = await apiClientInstance.post(
            `/profile/${type}`,
            data,
            {
              withCredentials: true,
            }
          );
 

          if (response.data.success) {
            dispatch(addRequest(response.data));
            toast.success(response.data.message);
            navigate("/client/home");
          } else {
            toast.error(response.data.message, {
              style: {
                backgroundColor: "red",
                color: "white",
              },
            });
          }
        } catch (error: unknown) { 
          const err = error as {response: {data: {message: string}}}; 
          toast.error(err.response.data.message, {
            style: {
              backgroundColor: "red",
              color: "white",
              width: "13.5rem",
              height: "3rem",
              justifyContent: "center",
              fontFamily: "cursive"
            },
            position: "top-center"
          }); 
        }
      }
    } catch (error: unknown) {
      const err = error as {errors: string[]}; 
      setError(err.errors);
    }
  };

  console.log('Validation Errors: ', error);

  return (
    <Dialog>
      <DialogTrigger>
        <Sonner />
        <Button className="bg-[#0000ff] hover:bg-[#16b6a5] rounded-small text-white font-bold text-md"> {type} </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] h-[900px] justify-center bg-white !rounded-3xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>{type} profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-3">
            <Label htmlFor="name" className="text-right">
              CompanyName
            </Label>
            <Input
              onChange={handleChange}
              id="companyName"
              className="col-span-3"
            />
          </div>
          <div className="flex">
            {error?.some((err: string) => err.includes("CompanyName is required"))
              ? error.map((err: string, index: number) => {
                  if (err.includes("CompanyName is required")) {
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
                    err.includes("CompanyName is required") ||
                    err.includes("Must be atleast 10 characters") ||
                    err.includes("Must be under 30 characters") ||
                    err.includes("Must be at least 10 characters and under 30 characters") 
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

          <div className="flex items-center gap-3">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Input
              onChange={handleChange}
              id="description"
              className="col-span-3"
            />
          </div>

          <div className="flex">
            {error?.some((err: string) => err.includes("Description is required"))
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
                    err.includes("Description must be atleast 20 characters") ||
                    err.includes("Description must be under 100 characters") ||
                    err.includes("Must be at least 20 - 100 characters") 
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

          <div className="flex items-center gap-3">
            <Label htmlFor="name" className="text-right">
              Loacation
            </Label>
            <Input
              onChange={handleChange}
              id="location"
              className="col-span-3"
            />
          </div>

          <div className="flex">
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
                    err.includes("Must be atleast 4 characters") ||
                    err.includes("Must be valid location (4 - 20)") ||
                    err.includes("Must be under 20 characters")
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

          <div className="flex items-center gap-3">
            <Label htmlFor="name" className="text-right">
              Domain
            </Label>
            <Input onChange={handleChange} id="domain" className="col-span-3" />
          </div>

          <div className="flex">
            {error?.some((err: string) => err.includes("Domain is required"))
              ? error.map((err: string, index: number) => {
                  if (err.includes("Domain is required")) {
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
                    err.includes("Domain is required") ||
                    err.includes("Domain must be atleast 10 characters") ||
                    err.includes("Must be at least 10 characters and under 25 characters") ||
                    err.includes("Domain must be under 25 characters")
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

          <div className="grid grid-cols-4 items-center gap-44">
            <Label htmlFor="name" className="text-right">
              Total Employees
            </Label>
            <Input
              onChange={handleChange}
              id="numberOfEmployees"
              type="number"
              className="col-span-3"
            />
          </div>

          <div className="flex">
            {error?.some((err: string) =>
              err.includes("Total Employees are required")
            )
              ? error.map((err: string, index: number) => {
                  if (err.includes("Total Employees are required")) {
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
                    err.includes("Total Employees must be at least 10") ||
                    err.includes("Must be atleast 10 characters") ||
                    err.includes("Must be at least 10 - 2000 employees") ||
                    err.includes("Total Employees must be at most 2000")
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

          <div className="flex items-center gap-3">
            <Label htmlFor="name" className="text-right">
              Since
            </Label>
            <Input
              onChange={handleChange}
              id="since"
              type="number"
              className="col-span-3"
            />
          </div>

          <div className="flex">
            {error?.some((err: string) =>
              err.includes("Establishment Year is required")
            )
              ? error.map((err: string, index: number) => {
                  if (err.includes("Establishment Year is required")) {
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
                    err.includes("Establishment Year is required") ||
                    err.includes(
                      "Establishment Year must be valid(after 1990)"
                    ) ||
                    err.includes(
                      "Establishment Year must be valid(before 2025)"
                    ) ||
                    err.includes(
                      "Establishment Year must be valid(1990 - 2025)"
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
        <DialogFooter>
          <Button className='rounded-small' onClick={submitForm} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientProfileAlter;
