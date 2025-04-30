import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const onSubmit = (data) => {
    //     console.log(data);
    // };
const onSubmit = async (data)=>{
    console.log(data);
    // Handle signup logic here (e.g., send data to the server)
    try{
        const response = await fetch('http://localhost:3000/signup/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
        if(response.ok){
            setTimeout(() => {
                window.location.href = '/login'; // Redirect to login page after 2 seconds
            },100); // 1 second delay
            // Redirect to login page or perform other actions
        }
        else{
            alert('Signup failed!');
        }
        // Handle success (e.g., redirect to login page)
    }
    catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., show error message)
    }
}


    return (
        <div className="signup-form">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>

                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 3,
                                message: 'Password must be at least 3 characters',
                            },
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div>
                    <label>Confirm Password: </label>
                    <input
                        type="password"
                        {...register('confirmPassword', {
                            required: 'Confirm Password is required',
                            validate: (value, { password }) =>
                                value === password || 'Passwords do not match',
                        })}
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>

                <button type="submit">Signup</button>
                 <div>
                    <Link className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ' to="/login">Already have account?</Link>
                 </div>
            </form>
        </div>
    );
};

export default Signup;                 




// import React from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useForm } from "react-hook-form"
// import { toast } from "react-toastify"

// const Signup = () => {
//   const navigate = useNavigate()

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm()

//   const onSubmit = async (data) => {
//     console.log(data)
//     try {
//       const response = await fetch("http://localhost:3000/signup/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })
//       const result = await response.json()
//       console.log(result)
//       if (response.ok) {
//         toast.success("Signup successful! Redirecting to login...")
//         setTimeout(() => {
//           navigate("/login")
//         }, 100)
//       } else {
//         toast.error(result.message || "Signup failed!")
//       }
//     } catch (error) {
//       console.error("Error:", error)
//       toast.error("Something went wrong!")
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-transform duration-300 hover:scale-105">
//         <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
//           Create an Account
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
//               {...register("username", { required: "Username is required" })}
//             />
//             {errors.username && (
//               <p className="text-sm text-red-500">{errors.username.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value:
//                     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                   message: "Invalid email address",
//                 },
//               })}
//             />
//             {errors.email && (
//               <p className="text-sm text-red-500">{errors.email.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 3,
//                   message: "Password must be at least 3 characters",
//                 },
//               })}
//             />
//             {errors.password && (
//               <p className="text-sm text-red-500">{errors.password.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
//               {...register("confirmPassword", {
//                 required: "Confirm Password is required",
//                 validate: (value) =>
//                   value === watch("password") || "Passwords do not match",
//               })}
//             />
//             {errors.confirmPassword && (
//               <p className="text-sm text-red-500">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition duration-300"
//           >
//             SIGN UP
//           </button>

//           <p className="text-sm text-center mt-4 text-gray-600">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-purple-600 hover:underline font-medium"
//             >
//               Login here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Signup
