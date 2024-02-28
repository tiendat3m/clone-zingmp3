import React, { memo, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../../utils/icons'

const { AiOutlineHeart, BsFillPlayFill, BsThreeDots } = icons
const SectionItem = ({ link, title, thumbnailM }) => {

    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const imageRef = useRef()
    const handleHover = () => {
        setIsHover(true)
        imageRef.current.classList.add('animate-scale-up-image')
        imageRef.current.classList.remove('animate-scale-down-image')

    }
    const handleLeave = () => {
        setIsHover(false)
        imageRef.current.classList.remove('animate-scale-up-image')
        imageRef.current.classList.add('animate-scale-down-image')

    }
    return (
        <div
            onClick={() => {
                navigate(link?.split('.')[0], { state: { playAlbum: false } })
            }}
            className={`flex flex-col gap-3 justify-start p-4 text-sm cursor-pointer flex-1 relative z-0 text-white`}
        >
            <div
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                className='w-full relative overflow-hidden rounded-lg'
            >
                {isHover && <div className='z-40 absolute top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-lg flex items-center justify-center text-white gap-5'>
                    <span><AiOutlineHeart size={25} /></span>
                    <span
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(link?.split('.')[0], { state: { playAlbum: true } })
                        }}
                        className='border border-white rounded-full p-1'>
                        <BsFillPlayFill size={35} />
                    </span>
                    <span><BsThreeDots size={25} /></span>
                </div>}
                <img src={thumbnailM} alt="avatar" className='w-full h-auto rounded-lg' ref={imageRef} />
            </div>
            <span className='flex flex-col'>
                <span className='font-semibold mb-1'>{title?.length > 50 ? title.slice(0, 50) + '...' : title}</span>
            </span>
        </div>
    )
}

export default memo(SectionItem)