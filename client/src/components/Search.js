import React, { useState, useEffect } from 'react'
import icons from '../utils/icons'
import { apiSearch } from '../apis'
import *as actions from '../store/actions'
import { useDispatch } from 'react-redux'
import { useNavigate, createSearchParams, useParams } from 'react-router-dom'
import path from '../utils/path'

const { HiOutlineSearch, GrClose } = icons
const Search = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { singer } = useParams()

  const [keyword, setKeyword] = useState('')

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      // const response = await apiSearch(keyword)
      dispatch(actions.search(keyword))
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword
        }).toString()
      })
    }
  }

  // useEffect(() => {
  //   window.addEventListener('keyup', handleSearch)

  //   return () => {
  //     window.removeEventListener('keyup', handleSearch)
  //   }
  // }, [])

  return (
    <div className='w-full flex items-center relative'>
      {keyword && <span onClick={() => setKeyword('')} className='absolute right-[16px] cursor-pointer'><GrClose size={14} /></span>}
      <span className={`h-10 pl-4 flex items-center justify-center text-gray-100 bg-[#2F2739] rounded-l-[20px]`}>
        <HiOutlineSearch size={20} />
      </span>
      <input
        onChange={e => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
        value={keyword}
        type="text"
        className={`outline-none placeholder:text-white bg-[#2F2739] p-2 w-full h-10 rounded-r-[20px] text-white placeholder:text-[14px]`}
        placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
      />
    </div>
  )
}

export default Search