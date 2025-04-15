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