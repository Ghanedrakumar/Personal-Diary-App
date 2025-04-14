import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <div>
            <nav>
                <ul className="flex justify-between items-center bg-gray-800 text-white p-4">
                   <Link className="text-xl font-bold flex justify-center items-center" to="/dashboard"  > Dashboard</Link>
                    <div className="flex space-x-10  font-bold">
                        <Link to="/signup"> Signup</Link>
                        <Link to="/login"> Login</Link>
                        <Link to="/logout"> Logout</Link>
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
