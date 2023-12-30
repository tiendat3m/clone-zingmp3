import React, { useState, memo } from 'react'
import { handleNumber } from '../utils/fn'
import { Link } from 'react-router-dom'
import icons from '../utils/icons'
const { AiOutlineUserAdd } = icons

const Artist = ({ image, title, follower, link }) => {
    const [isHover, setIsHover] = useState(false)
    return (
        <div className='w-full flex flex-col gap-[15px]'>
            <Link
                className='relative rounded-full cursor-pointer'
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                to={link}
            >
                <img src={image} alt="Singer" className={`w-full object-contain rounded-full ${isHover ? 'animate-scale-up-image' : 'animate-scale-down-image'}`} />
                {isHover && <div className='absolute top-0 left-0 right-0 bottom-0 rounded-full bg-overlay-30'></div>}
            </Link>
            <div className='flex items-center flex-col'>
                <span className='text-sm font-medium hover:underline hover:text-main cursor-pointer'>{title}</span>
                <span className='text-xs opacity-70'>{`${handleNumber(follower)} quan tâm`}</span>
                <button
                    type='button'
                    className='bg-main px-4 py-2 text-sm rounded-r-full flex items-center justify-center gap-1 rounded-l-full text-white mt-4'
                >
                    <span><AiOutlineUserAdd /></span>
                    <span className='text-xs font-semibold'>QUAN TÂM</span>
                </button>
            </div>
        </div>
    )
}

export default memo(Artist)
