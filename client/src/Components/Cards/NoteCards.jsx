import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
const NoteCards = ({title,date,tags,content, onPinNote ,onEdit,onDelte,isPinned}) => {
    return (
        <div className='boder rounded p-4 bg-white hover:shadow-xl transition-all duration-300 ease-in-out'>
            <div className=' flex items-center justify-between'>
                <div >
                    <h6 className='text-sm font-medium '>{title}</h6>
                    <span className='text-green-700 text-xs'>{date}</span>
                </div>
                <MdOutlinePushPin 
                className={` icon-btn hover:text-blue-600 ${isPinned ? 'text-[#2B85FF]' : 'text-gray-400'}`}
                    onClick={onPinNote}
                />
            </div>
            <p className='text-xs text-slate-600 mt-2'>
                {content?.slice(0,60)}
            </p>
            <div className='flex items-center justify-between mt-2'>
                <div className='text-slate-500 text-xs'>{tags} </div>
            
            <div className='flex items-center  gap-2'>
                <MdCreate className='icon-btn hover:text-green-600'
                onClick={onEdit} />
                <MdDelete className='icon-btn hover:text-red-500'
                onClick={onDelte} />
            </div>
            </div>
        </div>
    )
}

export default NoteCards
