import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import * as apis from '../../apis'
import { Lists, AudioLoading } from '../../components'
import Scrollbars from 'react-custom-scrollbars-2'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import icons from '../../utils/icons'

const { BsFillPlayFill } = icons

const Album = () => {

  const { pid } = useParams()
  const { isPlaying } = useSelector((state) => state.music);
  const [playlistData, setPlaylistData] = useState({})
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid))
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true))
      const response = await apis.apiGetDetailPlaylist(pid)
      dispatch(actions.loading(false))
      if (response?.data.err === 0) {
        setPlaylistData(response.data.data)
        dispatch(actions.setPlaylist(response?.data?.data?.song.items))
      }
    }
    fetchDetailPlaylist()
  }, [pid])
  // console.log(playlistData)
  useEffect(() => {
    if (location.state?.playAlbum) {
      const randomSong = Math.round(Math.random() * playlistData?.song?.items?.length) - 1
      dispatch(actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId))
      dispatch(actions.play(true))
    }
  }, [pid, playlistData])
  return (
    <>
      <div className='w-full h-[90px]'></div>
      <div className='w-full relative h-full flex gap-7 px-[59px]'>
        <div className="flex-none w-1/4  flex flex-col items-center gap-2">
          <div className='w-full relative overflow-hidden'>
            <img
              src={playlistData.thumbnailM}
              alt="thumbnail"
              className={`w-full object-contain ${isPlaying ? 'rounded-full animate-rotate-center' : 'rounded-md animate-rotate-center-pause'} shadow-md`}
            />
            <div className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-30 cursor-pointer text-white flex items-center justify-center ${isPlaying && 'rounded-full'}`}>
              <span className='p-2 border border-white rounded-full'>
                {isPlaying ? <AudioLoading /> : <BsFillPlayFill size={30} />}
              </span>
            </div>
          </div>
          <div className='flex flex-col items-center text-white font-semibold'>
            <h3 className='text-[20px] font-bold '>{playlistData.title}</h3>
            <span className='flex gap-2 items-center text-[12px] '>
              <span>Cập nhật: </span>
              <span>
                {moment.unix(playlistData.contentLastUpdate).format("DD/MM//YYYY")}
              </span>
            </span>
            <span className='flex gap-2 items-center text-[12px] text-gray-600'>{playlistData.artistsNames}</span>
            <span className='flex gap-2 items-center text-[12px] text-gray-600'>{`${Math.round(playlistData.like / 1000)}K Người yêu thích`}</span>
          </div>
        </div>
        <Scrollbars style={{ width: '100%', height: '80%' }}>
          <div className='flex-auto mb-40'>
            <span className='text-sm'>
              <span className='text-gray-500 font-semibold'>Lời tựa </span>
              <span className='text-white'>{playlistData.sortDescription}</span>
            </span>
            <Lists totalDuration={playlistData?.song?.totalDuration} />
          </div>
        </Scrollbars>
      </div>
    </>
  )
}

export default Album
