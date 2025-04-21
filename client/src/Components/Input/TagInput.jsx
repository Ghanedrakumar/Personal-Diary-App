import React,{useState} from 'react'
import { MdClose } from 'react-icons/md'
const TagInput = ({tags,setTags}) => {
const [inputValue, setInputValue] = useState("")
const addNewtag = () => {
if(inputValue.trim() !== "") {
  setTags([...tags, inputValue.trim()])
  setInputValue("") // Clear the input field after adding the tag

}
}

  return (
    <div>
    {tags?.length > 0 && (
      <div className='flex gap-2 flex-wrap  mt-4 mb-2 items-center '>
        {tags.map((tag, index) => (
          <span key={index} className='bg-slate-200 text-black-900 text-xs font-medium mr-2 px-2.5 py-1 rounded'>
            # {tag}
            <button className='ml-5  mt-1 ' onClick={() => setTags(tags.filter((_, i) => i !== index))}><MdClose/></button>
          </span>
        ))}
      </div>
    )}

    <div className='flex gap-2 flex-wrap mt-2 mb-4 items-center'>
        <input type="text" className='border-2 border-gray-300 text-sm w-auto  p-2 rounded' placeholder='Add tags...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === 'Enter') {
                addNewtag()
            }
            }}
        />
        <button className='bg-white border-1 border-blue-300 text-blue-800 px-2 py-1 rounded hover:text-white hover:bg-blue-500 w-9 h-9' onClick={addNewtag}>+</button>
      </div>

    </div>

  )
}

export default TagInput
