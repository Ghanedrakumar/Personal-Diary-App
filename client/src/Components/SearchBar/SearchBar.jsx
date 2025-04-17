import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {

    
    return (
        <div className=' w-70  flex items-center justify-between px-2 bg-slate-100 rounded-md shadow-md'>
            < input
                type="text"
                placeholder="Search Notes..."
                className=" text-slate-500 rounded-lg py-[7px]   bg-transparent px-1 text-1xl outline-none focus:border-blue-500"
            value={value}
            onChange={onChange}
            />

          {value && <IoMdClose className='text-slate-500 text-xl cursor-pointer hover:text-black ' onClick={onClearSearch}/>}  
            <FaMagnifyingGlass className='text-slate-500 text-xl cursor-pointer hover:text-black ml-3 ' onClick={handleSearch} />
        </div>
    )
}

export default SearchBar
