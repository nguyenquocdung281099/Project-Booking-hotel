import './style.scss'

import { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
export default function InputSearch({ onSubmit, widthBtn, width }) {
  const [text, settext] = useState('')
  return (
    <div className="inputSearch">
      <input
        type="text"
        value={text}
        className="search"
        placeholder="Search..."
        onChange={({ target }) => settext(target.value)}
        style={{ width: width || 'auto' }}
      />
      <button
        type="submit"
        onClick={() => {
          onSubmit(text)
          settext('')
        }}
        style={{  width: widthBtn || "auto" }}
      >
        <SearchOutlined /> Search
      </button>
    </div>
  )
}
