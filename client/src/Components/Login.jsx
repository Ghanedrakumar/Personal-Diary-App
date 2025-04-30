
// import React, { useState } from "react"
// import PasswordInput from "../components/Input/PasswordInput"
// import { Link, useNavigate } from "react-router-dom"
// import { validateEmail } from "../utils/helper"
// import { useDispatch } from "react-redux"
// import {
//   signInFailure,
//   signInStart,
//   signInSuccess,
// } from "../redux/user/userSlice"
// import axios from "axios"
// import { toast } from "react-toastify"

// const Login = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")

//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address")
//       return
//     }

//     if (!password) {
//       setError("Please enter the password")
//       return
//     }

//     setError("")

//     // Login API

//     try {
//       dispatch(signInStart())

//       const res = await axios.post(
//         "http://localhost:3000/login/login",
//         { email, password },
//         { withCredentials: true }
//       )

//       if (res.data.success === false) {
//         toast.error(res.data.message)
//         console.log(res.data)
//         dispatch(signInFailure(data.message))
//       }

//       toast.success(res.data.message)
//       dispatch(signInSuccess(res.data))
//       navigate("/dashboard")
//     } catch (error) {
//       toast.error(error.message)
//       dispatch(signInFailure(error.message))
//     }
//   }

//   return (
//     <div className="flex items-center justify-center mt-28">
//       <div className="w-96 border rounded bg-white px-7 py-10">
//         <form onSubmit={handleLogin}>
//           <h4 className="text-2xl mb-7">Login</h4>

//           <input
//             type="text"
//             placeholder="Email"
//             className="input-box border-2 border-black rounded-md px-3 py-2 mb-4 w-full"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <PasswordInput
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

//           <button type="submit" className="btn-primary">
//             LOGIN
//           </button>

//           <p className="text-sm text-center mt-4">
//             Not registered yet?{" "}
//             <Link
//               to={"/signup"}
//               className="font-medium text-[#2B85FF] underline"
//             >
//               Create an account
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login



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

    try {
      dispatch(signInStart())

      const res = await axios.post(
        "http://localhost:3000/login/login",
        { email, password },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        toast.error(res.data.message)
        dispatch(signInFailure(res.data.message))
        return
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-slate to-yellow-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-105">
        <form onSubmit={handleLogin}>
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Login to Your Account
          </h2>

          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm pb-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md mt-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            LOGIN
          </button>

          <p className="text-sm text-center mt-4 text-gray-700">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
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
