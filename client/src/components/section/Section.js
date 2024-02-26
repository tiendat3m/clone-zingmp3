import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { SectionItem } from '..'
import icons from '../../utils/icons'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'

const { FiChevronRight } = icons

const Section = ({ data, isHideAllButton }) => {
    const navigate = useNavigate()
    const { currentWidth } = useSelector(state => state.app)

    return (
        <div className='mt-12 px-[43px] flex flex-col relative z-0 text-white'>
            <div className='flex items-center justify-between'>
                {data?.title && <h3 className='text-[20px] font-bold px-4 '>{data.title}</h3>}
                {!isHideAllButton && <span onClick={() => navigate(path.TOP100)} className='flex items-center text-xs px-5 font-bold opacity-50 hover:text-main cursor-pointer'>TẤT CẢ <FiChevronRight size={20} /></span>}
            </div>
            <div className='flex'>
                {data && data?.items?.length > 0 && data.items.filter((item, index) => index <= (currentWidth < 600 ? 1 : currentWidth < 900 ? 2 : currentWidth < 1024 ? 3 : 4))?.map(item => (
                    <SectionItem
                        key={item.encodeId}
                        data={data}
                        title={item.title}
                        link={item.link}
                        sortDescription={item.sortDescription}
                        thumbnailM={item.thumbnailM}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(Section)
