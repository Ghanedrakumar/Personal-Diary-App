// import React from 'react'
// import SearchBar from './SearchBar/SearchBar'
// import ProfileInfo from './Cards/ProfileInfo'
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// const Navbar = () => {
//     const Navigate = useNavigate()
//     const [searchQuery, setSearchQuery] = React.useState('')
//     const handleSearch = () => {}

//     const onClearSearch = () => {
//         setSearchQuery('')
//     }
//     const onLogout = () => {
//         localStorage.removeItem('token')
//         Navigate('/login')
//     }

//     return (
//         <div>
//             <nav>
//                 <ul className="flex justify-between drop-shadow items-center bg-gray-400 drop-shadow-blue-300 text-white p-1">
//                 <span>     <Link className="text-xl font-bold flex justify-center items-center hover:text-blue-500" to="/dashboard"  > GoodNotes </Link></span>
//                     <SearchBar 
//                     value={searchQuery} 
//                     onChange={({target}) => setSearchQuery(target.value)}
//                     handleSearch={handleSearch}
//                     onClearSearch={onClearSearch}

//                     />

//                     <ProfileInfo onLogout={onLogout} />
//                     {/* <div className="flex space-x-10  font-bold">
//                         <Link to="/login"> Logout</Link>
//                     </div> */}
//                 </ul>
//             </nav>
//         </div>
//     )
// }

// export default Navbar
     

import React, { useState } from "react"
import SearchBar from "./SearchBar/SearchBar"
import ProfileInfo from "./Cards/ProfileInfo"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
  signInSuccess,
  signoutFailure,
  signoutStart,
} from "../redux/user/userSlice"
import axios from "axios"

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery("")
    handleClearSearch()
  }

  const onLogout = async () => {
    try {
      dispatch(signoutStart())

      const res = await axios.get("http://localhost:3000/login/signout", {
        withCredentials: true,
      })

      if (res.data.success === false) {
        dispatch(signoutFailure(res.data.message))
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      dispatch(signInSuccess())
      navigate("/login")
    } catch (error) {
      toast.error(error.message)
      dispatch(signoutFailure(error.message))
    }
  }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to={"/"}>
        <h2 className="text-xl font-medium text-black py-2">
          <span className="text-slate-500">Diary</span>
          <span className="text-slate-900">App</span>
        </h2>
      </Link>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar