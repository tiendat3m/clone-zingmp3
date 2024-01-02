import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { SectionItem } from '..'
import icons from '../../utils/icons'

const { FiChevronRight } = icons

const Section = ({ data }) => {
    const { currentWidth } = useSelector(state => state.app)

    return (
        <div className='mt-12 px-[43px] flex flex-col relative z-0 text-white'>
            <div className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold px-4 '>{data.title}</h3>
                <span className='flex items-center text-xs px-5 font-bold opacity-50 hover:text-main cursor-pointer'>TẤT CẢ <FiChevronRight size={20} /></span>
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
