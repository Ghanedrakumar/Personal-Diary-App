import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import TagInput from '../Input/TagInput'
const AddEditNotes = ({ onClose,noteData,type }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)


    const editNote = async() => {}
    const addNewNote = () => {}

        const handleAddNote = () => {
            if (!title) {
                setError("Please Enter a valid title")
                return
            }
            if (!content) {
                setError("Please Enter the content")
                return
            }
            setError("")
            if (type === "edit") {
                editNote()
            }
            else {
                addNewNote()
            }
        }

        return (
            <div className='relative'>
                <button className='w-10 h-10 rounded-full flex items-center absolute justify-center -top-3 -right-3 hover:bg-slate-50'
                    onClick={onClose}
                ><MdClose className='text-xl text-slate-400' /></button>

                <div className='flex gap-2 flex-col'>
                    <label className='input-label text-red-400 '>Title</label>
                    <input type="text" className='text-exl text-slate-950 outline-none' placeholder='Wake up at 6 a.m.'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='flex  gap-2 mt-4 flex-col'>

                    <label className='input-label text-red-400  uppercase'>Content</label>

                    <textarea type="text" className='text-sm w-auto  text-slate-950 outline-none bg-slate-50 p-2 rounded' placeholder='Content....'
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    >
                        {""}
                    </textarea>
                </div>

                <div className=''>
                    <label className='input-label text-red-400 uppercase'>tags</label>
                    <TagInput tags={tags} setTags={setTags} />
                </div>
                <button className="w-full text-sm  text-white bg-blue-500 p-2 rounded my-1 hover:bg-blue-700"
                    onClick={handleAddNote}

                >ADD</button>
            </div>
        )
    }

    export default AddEditNotes
