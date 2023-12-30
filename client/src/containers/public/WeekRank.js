import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import bgChart from '../../assets/week-chart.jpg'
import { RankList } from '../../components'
const notActivedStyle = 'text-[24px] font-bold text-white py-[12px] uppercase'
const activedStyle = 'text-[24px] font-bold text-main py-[12px] uppercase border-b-2 border-main'

const WeekRank = ({ weekChart }) => {
  console.log(weekChart)
  const { pid } = useParams()
  useEffect(() => {

  }, [])

  return (
    <div>
      <div className='relative'>
        {/* <img src={bgChart} alt="bg-chart" className='w-full object-contain grayscale' /> */}
        <div className="top-0 right-0 left-0 bottom-0 absolute"></div>
        <div className="top-0 right-0 left-0 bottom-0 absolute bg-gradient-to-t from-[#ced9d9] to-transparent"></div>
        <div className="top-0 right-0 left-0 bottom-1/2 absolute flex flex-col gap-4 px-[59px]">
          <h3 className='text-[40px] font-bold mt-[90px] text-white'>Bảng xếp hạng tuần</h3>
          <div className='flex gap-8 '>
            {weekChart?.map(item => (
              <NavLink key={item.chartId} to={item.link.split('.')[0]} className={({ isActive }) => isActive ? activedStyle : notActivedStyle}>
                {item.country === 'korea' ? 'K-Pop' : item.country === 'us' ? 'US-UK' : item.country === 'vn' ? 'Việt Nam' : ''}
              </NavLink>
            ))}
          </div>
          <div className='w-full pb-8'>
            <RankList
              // isHideAlbum={true}
              data={weekChart?.find(item => item?.link?.includes(pid))?.items}
              number={100}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeekRank