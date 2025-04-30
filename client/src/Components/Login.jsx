
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';

// const Login = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();

//    const onSubmit = async (data) => {
//         console.log(data);
//         // Handle login logic here (e.g., send data to the server)
//         try {
//             const response = await fetch('http://localhost:3000/login/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: "include",  
//                 body: JSON.stringify(data),
//             });
//             const result = await response.json();
//             console.log(result);
//             if (response.ok) {
//                 setTimeout(() => {
//                     window.location.href = '/dashboard'; // Redirect to dashboard after 2 seconds
//                 },100); // 1 second delay
//                 // Redirect to dashboard or perform other actions
//             } else {
//                 alert('Login failed!');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             // Handle error (e.g., show error message)
//         }
//     }

//     return (
//         <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div style={{ marginBottom: '15px' }}>
//                     <label htmlFor="email">Email</label>
//                     <input
//                         id="email"
//                         type="text"
//                         {...register('email', { required: 'Email is required' })}
//                         style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
//                     />
//                     {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</p>}
//                 </div>
//                 <div style={{ marginBottom: '15px' }}>
//                     <label htmlFor="password">Password</label>
//                     <input
//                         id="password"
//                         type="password"
//                         {...register('password', { required: 'Password is required' })}
//                         style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
//                     />
//                     {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</p>}
//                 </div>
//                 <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//                     Login
//                 </button>
//                 <div>
//                 <Link to="/signup" style={{ color: '#007BFF' }}>Create a New Account</Link>
//                     {/* <p style={{ marginTop: '15px' }}>Don't have an account? <Link to="/signup" style={{ color: '#007BFF' }}>Signup</Link></p> */}
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from "react"
import PasswordInput from "../components/Input/PasswordInput"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../utils/helper"
import { useDispatch } from "react-redux"
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice"
import axios from "axios"
import { toast } from "react-toastify"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError("")

    // Login API

    try {
      dispatch(signInStart())

      const res = await axios.post(
        "http://localhost:3000/login/login",
        { email, password },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        toast.error(res.data.message)
        console.log(res.data)
        dispatch(signInFailure(data.message))
      }

      toast.success(res.data.message)
      dispatch(signInSuccess(res.data))
      navigate("/dashboard")
    } catch (error) {
      toast.error(error.message)
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>

          <input
            type="text"
            placeholder="Email"
            className="input-box border-2 border-black rounded-md px-3 py-2 mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-[#2B85FF] underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login