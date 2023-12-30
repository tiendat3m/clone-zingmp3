import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import icons from '../utils/icons'
import SongItem from './SongItem'
import { apiGetDetailPlaylist } from '../apis'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { setRecent } from '../store/actions'
const { ImBin } = icons

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false)
  const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } = useSelector(state => state.music)
  const [playlist, setPlaylist] = useState()
  // console.log(curAlbumId)
  // console.log(playlist);
  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(curAlbumId)
    if (response.data?.err === 0) setPlaylist(response.data.data?.song.items)
  }
  useEffect(() => {
    curAlbumId && fetchDetailPlaylist()
  }, [])
  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist()
  }, [curAlbumId])
  useEffect(() => {
    isPlaying && setIsRecent(false)
  }, [isPlaying, curSongId])
  // console.log(recentSongs)
  return (
    <div className='flex flex-col text-xs w-full h-full'>
      <div className='py-[14px] px-2 h-[70px] flex-none flex items-center justify-between w-full gap-8 '>
        <div className='flex flex-auto justify-center bg-[#2F2739] text-gray-300 font-semibold rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer'>
          <span
            onClick={() => setIsRecent(prev => !prev)}
            className={`py-[5px] ${!isRecent && 'bg-layout'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
          >
            Danh sách phát
          </span>
          <span
            onClick={() => setIsRecent(prev => !prev)}
            className={`py-[5px] ${isRecent && 'bg-layout'}  flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
          >
            Nghe gần đây
          </span>
        </div>
        {/* <span className='p-1 rounded-full hover:bg-sidebar cursor-pointer'><ImBin size={14} /></span> */}
      </div>
      {isRecent
        ? <div className='w-full flex-col flex-auto flex px-2'>
          <Scrollbars autoHide style={{ width: '100%', height: '85%' }}>
            {recentSongs && <div className='flex flex-col'>
              {recentSongs?.map(item => (
                <SongItem
                  key={item.sid}
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artists={item?.artists}
                  sid={item?.sid}
                  size='w-[40px] h-[40px]'
                />
              ))}
            </div>}
          </Scrollbars>
        </div>
        : <div className='w-full flex flex-auto flex-col px-2 '>
          <Scrollbars autoHide style={{ width: '100%', height: '85%' }}>
            <SongItem
              thumbnail={curSongData?.thumbnail}
              title={curSongData?.title}
              artists={curSongData?.artistsNames}
              sid={curSongData?.encodeId}
              size='w-[40px] h-[40px]'
              style='bg-main text-white'
            />
            <div className='flex flex-col px-2 pt-[15px] pb-[5px] gap-1'>
              <span className='text-sm font-bold text-white'>Tiếp theo</span>
              <span className='flex text-xs gap-1 opacity-70 items-center'>
                <span className='text-sm text-gray-200'>Từ playlist</span>
                <span className='font-bold text-main'>{curSongData?.album?.title?.length > 30 ? `${curSongData?.album?.title.slice(0, 30)}...` : curSongData?.album?.title}</span>
              </span>
            </div>
            {playlist && <div className='flex flex-col'>
              {playlist?.map(item => (
                <SongItem
                  key={item.encodeId}
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artists={item?.artistsNames}
                  sid={item?.encodeId}
                  size='w-[40px] h-[40px]'
                />
              ))}
            </div>}
          </Scrollbars>
        </div>}

      {/* <div className='w-full h[90px]'></div> */}
    </div>
  )
}

export default SidebarRight