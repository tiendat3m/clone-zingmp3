import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SongItem } from '..'
import icons from '../../utils/icons'

const { FiChevronRight } = icons

const NewRelease = () => {
    const { newRelease } = useSelector(state => state.app)
    const [isActived, setIsActived] = useState(0)
    const [songs, setSongs] = useState([])

    useEffect(() => {
        isActived ? setSongs(newRelease?.items.others) : setSongs(newRelease?.items?.vPop)
    }, [isActived, newRelease])

    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5'>
            <div className='flex items-center justify-between text-white'>
                <h3 className='text-[20px] font-bold '>{newRelease.title}</h3>
                <span className='flex items-center text-xs px-5 font-bold opacity-50 hover:text-main cursor-pointer '>TẤT CẢ <FiChevronRight size={20} /></span>
            </div>
            <div className='flex items-center gap-5 text-xs text-white font-semibold'>
                <button
                    type='button'
                    className={`py-1 px-4 rounded-l-full rounded-r-full border  border-gray-400 ${isActived === 0 && 'bg-main text-white'}`}
                    onClick={() => setIsActived(0)}
                >
                    VIỆT NAM
                </button>
                <button
                    type='button'
                    className={`py-1 px-4 rounded-l-full rounded-r-full border  border-gray-400  ${isActived === 1 && 'bg-main text-white'}`}
                    onClick={() => setIsActived(1)}
                >
                    QUỐC TẾ
                </button>
            </div>
            <div className='flex flex-wrap w-full'>
                {songs?.map(item => (
                    <div
                        key={item.encodeId}
                        className='lg:w-1/3 sm:w-1/2 426:w-full text'
                    >
                        <SongItem
                            thumbnail={item.thumbnail}
                            title={item.title}
                            artists={item.artistsNames}
                            releaseDate={item.releaseDate}
                            sid={item.encodeId}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewRelease
