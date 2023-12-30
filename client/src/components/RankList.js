import React, { memo, useEffect, useState } from 'react'
import List from './List'
import { useNavigate } from 'react-router-dom'
const RankList = ({ data, isHideAlbum, number, link }) => {

  const [isShowFull, setIsShowFull] = useState(false)
  const [songs, setSongs] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isShowFull) {
      setSongs(data?.filter((item, index) => index < number))
    } else {
      setSongs(data)
    }
  }, [isShowFull, data])

  return (
    <div className=''>
      {songs?.map((item, index) => (
        <List
          key={item.encodeId}
          songData={item}
          isHideNode
          order={index + 1}
          isHideAlbum={isHideAlbum}
        />
      ))}
      <div className='flex items-center justify-center w-full mt-8'>
        <button
          type='button'
          className='px-4 py-2 border border-white rounded-l-full rounded-r-full text-white  hover:bg-overlay-30'
          onClick={() => link ? navigate(link.split('.')[0]) : setIsShowFull(prev => !prev)}
        >
          {isShowFull ? 'Ẩn bớt' : 'Xem tất cả'}
        </button>
      </div>
    </div>
  )
}

export default memo(RankList)