import React, { useEffect, useState, useRef } from 'react'
import { apiGetChartHome } from '../../apis'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import _ from 'lodash'
import bgChart from '../../assets/bg-chart.jpg'
import { useSelector } from 'react-redux'
import { SongItem, RankList } from '../../components'
import icons from '../../utils/icons'

const { BsFillPlayFill } = icons

const ZingChart = () => {
  const scrollRef = useRef()
  const [chartData, setChartData] = useState(null)
  const [data, setData] = useState(null)
  const { chart, rank } = useSelector(state => state.app)
  const chartRef = useRef()
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  })
  const [selected, setSelected] = useState(null)

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: 'rgba(255,255,255, 0.1)', drawTicks: false },
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore,
        border: { dash: [3, 4] },

      },
      x: {
        ticks: { color: 'gray' },
        grid: { color: 'transparent', display: false }
      }
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0) setTooltipState(prev => ({ ...prev, opacity: 0 }))
            return
          }
          const counters = []
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
              encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
            })
          }

          // console.log(tooltip.body[0]?.lines[0].replace(',' , ''));
          const rs = counters.find(i => i.data.some(n => n === +tooltip?.body[0]?.lines[0].replace(',', '')))
          setSelected(rs.encodeId)
          const newTooltipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY
          }
          if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
        }

      }
    },
    hover: {
      mode: 'dataset',
      intersect: false
    }
  }

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await apiGetChartHome()
      if (res.data.err === 0) setChartData(res.data.data)
    }
    fetchChartData()
  }, [])
  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
    const datasets = []
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
          borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: 'white',
          pointHoverRadius: 4,
          pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          pointHoverBorderWidth: 4
        })
      }
      setData({ labels, datasets })
    }
  }, [chartData])
  // console.log(chartData)  
  useEffect(() => {
    scrollRef.current.scrollIntoView({ block: 'start' })
  }, [])

  return (
    <>
      <div ref={scrollRef} className='w-full'>
        <div className='flex flex-col'>
          <div className='relative'>
            <img src={bgChart} alt="bg-chart" className='w-full max-h-[560px] object-contain grayscale' />
            {/* <div className='h-[500px]'></div> */}
            <div className="top-0 right-0 left-0 bottom-0 absolute bg-[rgba(42,23,54,0.9)]"></div>
            <div className="top-0 right-0 left-0 bottom-0 absolute bg-gradient-to-t from-[#170F23] to-transparent"></div>
            <div className="top-0 right-0 left-0 bottom-[50%] absolute flex items-center ">
              <h3 className='text-[40px] font-bold text-purple-600 px-[59px]'>#zingchart</h3>
            </div>
            <div>
              <div className='flex-7 absolute top-[40%] left-0 right-0 bottom-0 px-[59px]'>
                {data && <Line data={data} options={options} ref={chartRef} />}
                <div
                  className="tooltip"
                  style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute' }}

                >
                  <SongItem
                    thumbnail={chartData?.RTChart?.items?.find(i => i.encodeId === selected)?.thumbnail}
                    title={chartData?.RTChart?.items?.find(i => i.encodeId === selected)?.title}
                    artists={chartData?.RTChart?.items?.find(i => i.encodeId === selected)?.artistsNames}
                    sid={chartData?.RTChart?.items?.find(i => i.encodeId === selected)?.encodeId}
                    style='bg-white'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='p-[59px]'>
        <RankList data={chartData?.RTChart?.items} number={10} />
      </div>
      <div className='relative'>
        <img src={bgChart} alt="bg-chart" className='w-full h-[700px] object-cover grayscale' />
        <div className="top-0 right-0 left-0 bottom-[-20%] absolute bg-[rgba(32,19,53,0.9)]"></div>
        <div className="top-0 right-0 left-0 bottom-1/2 absolute mt-8 flex flex-col gap-8 px-[59px]">
          <h3 className='text-[40px] font-bold text-main'>Bảng xếp hạng tuần</h3>
          <div className='flex gap-6'>
            {chartData?.weekChart && Object.entries(chartData?.weekChart)?.map((item, index) => (
              <div className='flex-1 bg-[hsla(0,0%,100%,0.05)] rounded-md px-[10px] py-[20px]' key={index} >
                <h3 className='pl-10 pb-[10px] text-[24px] font-bold text-main'>
                  {item[0] === 'korea' ? 'K-Pop' : item[0] === 'us' ? 'US-UK' : item[0] === 'vn' ? 'Việt Nam' : ''}
                </h3>
                <div className='mt-4 h-fit'>
                  <RankList
                    data={item[1].items}
                    isHideAlbum={true}
                    number={5}
                    link={item[1]?.link}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ZingChart
