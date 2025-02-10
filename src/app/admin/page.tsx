"use client"
import { useState } from "react";
import Image from "next/image";
import img from "@/assets/pexels-steve-28574351.jpg";
import Form from "./components/Form";
import { Icon } from "@iconify/react/dist/iconify.js";

const AdminPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  // Handle password submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthorized(true); // Grant access if the password is correct
    } else {
      setError("Incorrect password."); // Show error if the password is incorrect
    }
  };

  // If not authorized, show the password form
  if (!isAuthorized) {
    return (
      <div className="p-4 m-auto">
        <header className="md:max-w-[70%] m-auto border-[#ffffff30] border-[1px] rounded-lg bg-white/10 flex">
          <div className="p-4">
            <h1 className="text-[#fff] text-[30px] md:text-[60px] font-bold my-1">
              ADMIN PASSWORD REQUIRED
            </h1>
            <p className="text-[#ffffff75] md:text-[25px]">Please enter the admin password.</p>
          </div>
          <div className="w-[220px] md:w-full md:flex-[4] h-[180px] overflow-hidden rounded-e-lg">
            <Image
              src={img}
              className="w-[300px] md:w-full h-[220px] object-cover rounded-e-lg hover:scale-150 transition-all duration-300 ease-linear"
              alt="Admin Image"
            />
          </div>
        </header>

        <div className="my-4 flex w-full justify-center">
          <form onSubmit={handlePasswordSubmit} className="text-center w-[80%]">
            <div className="flex items-center justify-center gap-1 bg-[#18FFFF] rounded  my-4">
              <input
                type={showPassword ? "text" : "password"}
                className="w-[100%] p-2 rounded-md text-black"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Icon icon={`${showPassword ? "uiw:eye-o" : "mdi:eye-off-outline"}`} width="26" height="26" className="text-[#0c0c0c] p-1 cursor-pointer" onClick={handleShowPassword}/>
            </div>
            <button type="submit" className="bg-[#18FFFF] p-2 text-black rounded-md w-[60%]">
              Submit
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  // If authorized, show the admin content
  return (
    <div>
      <div className="p-4 m-auto">
        <header className="md:max-w-[80%] m-auto border-[#ffffff30] border-[1px] rounded-lg bg-white/10 flex">
          <div className="p-4">
            <h1 className="text-[#fff] text-[30px] md:text-[60px] font-bold my-1">
              WELCOME ADMIN
            </h1>
            <p className="text-[#ffffff75] md:text-[25px]">What do you have for us today!!</p>
          </div>
          <div className="w-[220px] md:w-full md:flex-[4] h-[180px] overflow-hidden rounded-e-lg">
            <Image
              src={img}
              className="w-[300px] md:w-full h-[220px] object-cover rounded-e-lg hover:scale-150 transition-all duration-300 ease-linear"
              alt="Admin Image"
            />
          </div>
        </header>

        <div className="my-4">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
