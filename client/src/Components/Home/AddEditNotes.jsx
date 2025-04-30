// import React, { useState } from 'react'
// import { MdClose } from 'react-icons/md'
// import TagInput from '../Input/TagInput'
// const AddEditNotes = ({ onClose, noteData, type }) => {
//     const [title, setTitle] = useState("")
//     const [content, setContent] = useState("")
//     const [tags, setTags] = useState([])
//     const [error, setError] = useState(null)


//     const editNote = async () => { }
//     // const addNewNote = () => { }

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please Enter a valid title")
//             return
//         }
//         if (!content) {
//             setError("Please Enter the content")
//             return
//         }
//         setError("")
//         if (type === "edit") {
//             editNote()
//         }
//         else {
//             addNewNote()
//         }
//         onClose()
//         setTitle("")
//         setContent("")
//         setTags([])
//         setError(null)
      
//     }
//     const addNewNote = () => {
//         const response = fetch("http://localhost:3000/modal/modal", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 title: title,
//                 content: content,
//                 tags: tags
//             })
//         })
//         const data = response.json()
//         console.log(data)
//         if (response.ok) {
//             setTitle("")
//             setContent("")
//             setTags([])
//             onClose()
//         } else {
//             setError("Failed to add note")
//         }
//     }


//     return (
//         <div className='relative'>
//             <button className='w-10 h-10 rounded-full flex items-center absolute justify-center -top-3 -right-3 hover:bg-slate-50'
//                 onClick={onClose}
//             ><MdClose className='text-xl text-slate-400' /></button>


//             <div className='flex gap-2 flex-col'>
//                 <label className='input-label text-red-400 '>Title</label>
//                 <input type="text" name='title' className='text-exl text-slate-950 outline-none' placeholder='Wake up at 6 a.m.'
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}

//                 />
//             </div>

//             <div className='flex  gap-2 mt-4 flex-col'>

//                 <label className='input-label text-red-400  uppercase'>Content</label>

//                 <textarea type="text" name='content' className='text-sm w-auto  text-slate-950 outline-none bg-slate-50 p-2 rounded' placeholder='Content....'
//                     rows={10}
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}

//                 >
//                     {""}
//                 </textarea>
//             </div>

//             <div className=''>
//                 <label className='input-label text-red-400 uppercase'>tags</label>
//                 <TagInput tags={tags} setTags={setTags} />
//             </div>

//              {/* Display error message if it exists */}
//              {error && (
//                 <div className="mb-4 p-2 text-red-500 bg-red-50 rounded text-xs">
//                     {error}
//                 </div>
//             )}

//             <button className="w-full text-sm  text-white bg-blue-500 p-2 rounded my-1 hover:bg-blue-700"
//                 onClick={handleAddNote}
              
//                onSubmit={()=>addNewNote()}

//             >ADD</button>
//         </div>
//     )
// }

// export default AddEditNotes

import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import TagInput from '../Input/TagInput'
import axios from "axios"
import { toast } from "react-toastify"

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "")
  const [content, setContent] = useState(noteData?.content || "")
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error, setError] = useState(null)

  //   Edit Note
  const editNote = async () => {
    const noteId = noteData._id
    console.log(noteId)

    try {
      const res = await axios.post(
        "http://localhost:3000/note/edit/" + noteId,
        { title, content, tags },
        { withCredentials: true }
      )

      console.log(res.data)

      if (res.data.success === false) {
        console.log(res.data.message)
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()
      onClose()
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
      setError(error.message)
    }
  }

  //   Add Note
  const addNewNote = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/note/modal",
        { title, content, tags },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        console.log(res.data.message)
        setError(res.data.message)
        toast.error(res.data.message)

        return
      }

      toast.success(res.data.message)
      getAllNotes()
      onClose()
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
      setError(error.message)
    }
  }

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title")
      return
    }

    if (!content) {
      setError("Please enter the content")
      return
    }

    setError("")

    if (type === "edit") {
      editNote()
    } else {
      addNewNote()
    }
  }

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label text-red-400 uppercase">Title</label>

        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Wake up at 6 a.m."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-red-400 uppercase">Content</label>

        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label text-red-400 uppercase">tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="w-full text-sm bg-blue-400 text-black  p-2 rounded my-1 hover:bg-blue-700"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>


    </div>
  )
}

export default AddEditNotes