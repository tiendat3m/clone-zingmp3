import React from 'react'
import List from './List'
import icons from '../../utils/icons'
import moment, { duration } from 'moment'
import { useSelector } from 'react-redux'

const { BsDot } = icons
const Lists = ({ totalDuration, isHideTime }) => {
  const { songs } = useSelector(state => state.music)
  return (
    <div className='w-full flex-col text-xs text-gray-500'>
      <div className='flex items-center p-[10px] font-semibold'>
        <span className={isHideTime ? 'text-lg font-bold' : 'flex-1'}>BÀI HÁT</span>
        {!isHideTime && <span className='flex-1 flex justify-between items-center'>
          <span >ALBUM</span>
          <span>THỜI GIAN</span>
        </span>}
      </div>
      <div>
        {songs?.map((item) => (
          <List key={item.encodeId} isHideNode songData={item} />
        ))}
      </div>
      {totalDuration && <span className='flex items-center gap-2'>
        <span>{`${songs?.length} bài hát`}</span>
        <BsDot size={24} />
        <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
      </span>}
    </div>
  )
}

export default Lists