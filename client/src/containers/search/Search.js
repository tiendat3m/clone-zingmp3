import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { searchMenu } from '../../utils/menu'


const notActiveStyle = 'px-4 hover:text-main font-semibold cursor-pointer'
const activeStyle = 'px-4 hover:text-main font-semibold cursor-pointer text-main border-b-2 border-green-900 flex items-center h-[54px]'

const Search = () => {
  const scrollRef = useRef()
  const { keyword } = useSelector(state => state.music)
  useEffect(() => {
    scrollRef.current.scrollIntoView({ block: 'start' })
  }, [])
  return (
    <div ref={scrollRef} className='w-full pt-[70px]'>
      <div className='flex h-[50px] mb-[28px] items-center text-sm border-b border-gray-400 pb-1 pl-[59px] text-white'>
        <span className='text-[24px] font-bold pr-6 border-r border-gray-400'>Kết quả tìm kiếm</span>
        <div className='flex items-center'>
          {searchMenu.map(item => (
            <NavLink
              key={item.path}
              to={`${item.path}?q=${keyword}`}
              className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
            >
              {item.text}
            </NavLink>
          ))}

        </div>
      </div>
      <div className='w-full'>
        <Outlet />
      </div>
      <div className='w-full h-[120px]'></div>
    </div>
  )
}

export default Search