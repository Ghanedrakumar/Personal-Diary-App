import React, { useState } from 'react'
import NoteCard from '../Cards/NoteCards'
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'
import AddEditNotes from './AddEditNotes'
const Dashboard = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown:false,
    type:"add",
    data:null,
  })
  return (
    <>
    <div className="container mx-auto">
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8 max-md:m-5'>
        <NoteCard title={"Wake Up at 6 a.m."} date={"2nd June,2003"} tags={"#johnsnow"} content={"You know the Johnsnow"} onEdit={()=>{}} onDelete={()=>{}}   onPinNote={()=>{}} isPinned={false} />
       
       
       
      </div>
    </div>
    <button className='w-16 h-16 flex items-center justify-center  rounded-2xl bg-[#2B85FF] hover:bg-blue-700 absolute right-10 bottom-10' 
    onClick={()=>setOpenAddEditModal({isShown:true,type:"add",data:null})}
    ><MdAdd className='text-white text-3xl'/></button>
<Modal isOpen={openAddEditModal.isShown} onRequestClose={()=>{}} 
  style={{overlay:{backgroundColor:"rgba(0,0,0,0.2)"}}}
  contentLabel="Add Note"
  className=" w-[40%] max-md:w-[60%] max-sm:w-[70%]  max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
  >
  <AddEditNotes/>
  </Modal>

   </>
  )
}

export default Dashboard
