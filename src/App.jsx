import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import User from "./component/User";

const App = () => {
  // const [fullName, setfullName] = useState(""); //Two way binding
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPass, setConfirmPass] = useState("");

// Optimising the data in to
 const [formData, setformData] = useState({
  fullName:'',
  email: '',
  password:'',
  confirmPass:'',
 })


  const [error, seterror] = useState(" ");
  const [user, setUser] = useState([]);

  const handleChanges=(e)=>{
    const {name,value}=e.target;
    setformData((prevData)=>({
      ...prevData,
      [name]:value
    }))
    
  }

  // Handling the submission of form so the page dooes not reload
  const submitHandler = (e) => {
    e.preventDefault(); // to prevent from clearing or reloading the page
    console.log("Form Submitted");
    if (formData.password.length < 8) {
      seterror("Password must be 8 characters");
      return;
    }
    if (formData.password != formData.confirmPass) {
      seterror("Password and Confirm Password must be same :");
      return;
    }
    if (!/["!@#$%&*()<>,."]/.test(formData.password)) {
      seterror("Password must be contain any Special Character :");
      return;
    }

    setUser((prevUsers)=>[
      ...prevUsers,{
        fullName:formData.fullName,
        email:formData.email,
        password:formData.password
      }

    ]);

    toast.success(" Login Successfull ❤️", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    seterror(' ');
    setformData({
      fullName:'',
      email:'',
      password:'',
      confirmPass:' ',
    })
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-lg rounded-xl w-96">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Create an Account
          </h2>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex flex-col gap-4"
          >
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter Name here"
              name="fullName"
              value={formData.fullName}
              onChange={handleChanges }
            />
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleChanges}
            />
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChanges}
            />

            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Confirm Password"
              name="confirmPass"
              value={formData.confirmPass}
              onChange={handleChanges}
            />

            {error && (
              <p className="text-sm font-medium text-center text-red-400">
                {error}
              </p>
            )}

            <button className="w-full px-4 py-2 mt-3 text-xl font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
              Submit
            </button>

            <p className="mt-3 text-sm text-center text-gray-600">
              By registering, you agree to our{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a
                href="https://thatfunnyagency.com/terms-conditions/"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
          <ToastContainer></ToastContainer>
        </div>
      </div>

      {user.map(function (elem,idx) {
        return <User elem={elem} />
      })}
    </>
  );
};

export default App;
