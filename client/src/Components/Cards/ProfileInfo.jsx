import React from 'react'
const ProfileInfo = ({onLogout}) => {
    return (
        <div className='flex items-center justify-center  gap-3'>
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
                Gk
                
                </div>
                <div className='text-sm font-medium' >
                    Ghendra kumar 
                </div>

                <button className="flex space-x-10 bg-red-500 hover: hover:bg-red-800 hover:text-blue-300 hover:opacity-80 font-bold p-2 rounded-sm"
                onClick={onLogout}>
                     Logout
                </button>
            
        </div>
    )
}

export default ProfileInfo
