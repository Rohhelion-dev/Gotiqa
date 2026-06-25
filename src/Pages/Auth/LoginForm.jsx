import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const handleSubmit = async (e) => {


e.preventDefault();

try {

  const response = await axios.post(
    "http://localhost:5000/auth/login",
    {
      email,
      password
    }
  );

  console.log(response.data);

  setMessage("Login successful!");

  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

} catch (error) {

  console.error(error);

  setMessage(
    error.response?.data?.error ||
    "Login failed"
  );
}


};

return ( <form
   className="space-y-4"
   onSubmit={handleSubmit}
 >

  <div>
    <label className="block text-sm font-bold text-gray-700 mb-1">
      Email
    </label>

    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-2 rounded-lg border border-gray-200"
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
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 rounded-lg border border-gray-200"
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
    className="w-full bg-[#2d6a4f] text-white py-2.5 rounded-lg font-bold"
  >
    Login
  </button>

</form>

);
}
