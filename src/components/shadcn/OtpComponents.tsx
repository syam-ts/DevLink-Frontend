import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Sonner } from "../sonner/Toaster";

export const InputOtpComponent = () => {
  const [value, setValue] = useState<string[]>(["", "", "", ""]);
  const [formData, setFormData] = useState<{ otp: string }>({ otp: "" });
  const [searchParams] = useSearchParams();
  const rt: string | null = searchParams.get("rt");
  const message = useLocation();
  const navigate = useNavigate();


  const handleChange = (index: number, inputValue: string) => {
    if (!/^\d?$/.test(inputValue)) return;
    const newOtp = [...value];
    newOtp[index] = inputValue;
    setValue(newOtp); 
    const otpString = newOtp.join("");
    setFormData({ otp: otpString });
  };


  const handleSubmit = async () => {
    try { 
      const data = {
        user: message.state.message.userData,
        mailOtp: message.state.message.mailOtp,
        userOtp: formData.otp,
      };

      const response = await axios.post(`http://localhost:3000/${rt}/verify-otp`, data, {
        withCredentials: true,
      });
 

      if (!response.data.success) {
        toast.error(response.data.message, { style: { backgroundColor: "red", color: "white" } });
      } else {
        navigate(`/login?rt=${rt}`);
      }
    } catch (err: any) { 
      toast.error(err.response?.data?.message, {
        style: {
          backgroundColor: "red",
          color: "white"
        }
      }
      );
    }
  };

  
  // Resend OTP
  const resendOtp = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/${rt}/resend-otp`, message.state.message.userData);

      if (response.data.success) {
        console.log("New OTP:", response.data.newOtp);
        toast.success(response.data.message, { style: { backgroundColor: "white", color: "black" } });
        message.state.message.mailOtp = response.data.newOtp;  
      }
    } catch (err: any) {
      toast.error(err.message, { style: { backgroundColor: "red", color: "white" } });
    }
  };


  return (
    <div className="space-y-4">
      <Sonner />
      <div className="flex gap-4">
        {value.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-14 h-14 text-2xl text-center outline-none shadow-lg border border-gray-300"
          />
        ))}
      </div>

      <div className="text-center text-sm my-3">
        {value.join("") === "" ? (
          <span className="text-lg">Enter your one-time password.</span>
        ) : (
          <span className="text-lg">You entered: {value.join("")}</span>
        )}
      </div>

      <div className="text-center my-4">
        <button
          onClick={handleSubmit}
          type="button"
          className="py-3 px-5 text-sm tracking-wide rounded-md text-black bg-white shadow-lg hover:bg-blue-700 focus:outline-none"
        >
          Verify OTP
        </button>
      </div>

      <div className="text-center my-4">
        <button onClick={resendOtp} className="text-black underline">
          Resend OTP
        </button>
      </div>
    </div>
  );
};
