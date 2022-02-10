import './style.scss'

import { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
export default function InputSearch({ onSubmit, widthBtn, width }) {
  const {t} = useTranslation()
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
        <SearchOutlined /> {t("Search")}
      </button>
    </div>
  )
}
