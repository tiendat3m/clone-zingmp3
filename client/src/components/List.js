import moment from 'moment'
import React, { memo } from 'react'
import icons from '../utils/icons'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const { BsMusicNoteBeamed } = icons

const List = ({ songData, isHideAlbum, isHideNode, order }) => {
    const dispatch = useDispatch()
    return (
        <div
            className='flex justify-between items-center p-[10px] border-b border-[rgba(0,0,0,0.05)] hover:bg-[hsla(0,0%,100%,0.1)] cursor-pointer'
            onClick={() => {
                dispatch(actions.setCurSongId(songData?.encodeId))
                dispatch(actions.play(true))
                dispatch(actions.playAlbum(true))
                dispatch(actions.setRecent(
                    {
                        thumbnail: songData?.thumbnail,
                        title: songData?.title,
                        sid: songData?.encodeId,
                        artists: songData?.artistsNames
                    }
                ))
            }}
        >
            <div className='flex items-center gap-3 flex-1'>
                {order && <div
                    className={`${order === 1 ? 'text-shadow-no1' : order === 2 ? 'text-shadow-no2' : order === 3 ? 'text-shadow-no3' : 'text-shadow-rest'} text-white text-[32px] flex items-center justify-center flex-none w-[10%]`}
                >
                    {order}
                </div>}
                {!isHideNode && <span><BsMusicNoteBeamed /></span>}
                <img src={songData?.thumbnail} alt="thumbnailM" className='w-10 object-cover h-10 rounded-md' />
                <span className='flex flex-col w-full'>
                    <span className='text-sm font-semibold text-white'>{songData?.title?.length > 30 ? `${songData?.title?.slice(0, 29)}...` : songData?.title}</span>
                    <span className='text-xs opacity-70 font-semibold text-white'>{songData?.artistsNames}</span>
                </span>
            </div>
            <div className='flex-1 flex items-center justify-center text-xs text-white'>
                {!isHideAlbum && <div className='flex'>
                    {songData?.album?.title?.length > 30 ? `${songData?.album?.title?.slice(0, 30)}...` : songData?.album?.title}
                </div>}
                <div className='flex-1 flex justify-end text-xs opacity-70'>
                    {moment.utc(songData?.duration * 1000).format("mm:ss")}
                </div>
            </div>
        </div>
    )
}

export default memo(List)
