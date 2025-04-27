import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = async (data) => {
        console.log(data);
        // Handle login logic here (e.g., send data to the server)
        try {
            const response = await fetch('http://localhost:3000/login/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",  
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                setTimeout(() => {
                    window.location.href = '/dashboard'; // Redirect to dashboard after 2 seconds
                },100); // 1 second delay
                // Redirect to dashboard or perform other actions
            } else {
                alert('Login failed!');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message)
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        {...register('email', { required: 'Email is required' })}
                        style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</p>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</p>}
                </div>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Login
                </button>
                <div>
                <Link to="/signup" style={{ color: '#007BFF' }}>Create a New Account</Link>
                    {/* <p style={{ marginTop: '15px' }}>Don't have an account? <Link to="/signup" style={{ color: '#007BFF' }}>Signup</Link></p> */}
                </div>
            </form>
        </div>
    );
};

export default Login;