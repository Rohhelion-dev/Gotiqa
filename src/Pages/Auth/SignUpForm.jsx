import React, { useState } from "react";
import axios from "axios";

export default function SignUpForm() {

const [formData, setFormData] = useState({
name: "",
email: "",
password: ""
});

const [message, setMessage] = useState("");

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {

e.preventDefault();

try {

  const response = await axios.post(
    "http://localhost:5000/auth/register",
    {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "farmer"
    }
  );

  console.log(response.data);

  setMessage("Registration successful!");

  setFormData({
    name: "",
    email: "",
    password: ""
  });

} catch (error) {

  console.error(error);

  setMessage(
    error.response?.data?.message ||
    "Registration failed"
  );
}

};

return ( <form
   className="space-y-4"
   onSubmit={handleSubmit}
 >

  <div>
    <label className="block text-sm font-bold text-gray-700 mb-1">
      Full Name
    </label>

    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2d6a4f] outline-none"
      placeholder="John Doe"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-bold text-gray-700 mb-1">
      Email
    </label>

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2d6a4f] outline-none"
      placeholder="farmer@gotiqa.com"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-bold text-gray-700 mb-1">
      Password
    </label>

    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2d6a4f] outline-none"
      placeholder="••••••••"
      required
    />
  </div>

  {message && (
    <p className="text-center text-sm">
      {message}
    </p>
  )}

  <button
    type="submit"
    className="w-full bg-[#2d6a4f] text-white py-2.5 rounded-lg font-bold hover:bg-[#1e3f20] transition-colors"
  >
    Sign Up
  </button>

</form>

);
}
