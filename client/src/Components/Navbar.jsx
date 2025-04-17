import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import ProfileInfo from './Cards/ProfileInfo'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const Navigate = useNavigate()
    const [searchQuery, setSearchQuery] = React.useState('')
    const handleSearch = () => {}

    const onClearSearch = () => {
        setSearchQuery('')
    }
    const onLogout = () => {
        localStorage.removeItem('token')
        Navigate('/login')
    }

    return (
        <div>
            <nav>
                <ul className="flex justify-between drop-shadow items-center bg-gray-800 text-white p-1">
                <span>     <Link className="text-xl font-bold flex justify-center items-center" to="/dashboard"  > GoodNotes </Link></span>
                    <SearchBar 
                    value={searchQuery} 
                    onChange={({target}) => setSearchQuery(target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}

                    />

                    <ProfileInfo onLogout={onLogout} />
                    {/* <div className="flex space-x-10  font-bold">
                        <Link to="/login"> Logout</Link>
                    </div> */}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
     