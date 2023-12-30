import React, { memo, useState, useEffect, useRef } from 'react'
import bgChart from '../assets/bg-chart.jpg'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { SongItem } from './'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import path from '../utils/path'
import icons from '../utils/icons'

const { BsFillPlayFill } = icons

const ChartSection = () => {

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
                grid: { color: 'rgba(255,255,255,0.1)', drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] }
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' }
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
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                            encodeId: Object.keys(chart?.items)[i],
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
    // console.log({ chart, rank });
    // console.log(tooltipState)
    // console.log(selected)
    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
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
    }, [chart])
    return (
        <div className='px-[59px] mt-12 relative 1324:max-h-[430px] h-[760px] z-0'>
            <img src={bgChart} alt="bg-chart" className='w-full object-cover rounded-md 1324:max-h-[430px] h-[760px]' />
            <div className='absolute top-0 z-10 left-[59px] bg-[rgba(77,34,104,0.9)] right-[59px] bottom-0 rounded-md'></div>
            <div className='absolute top-0 z-20 left-[59px] right-[59px] bottom-0 p-5 flex flex-col gap-8'>
                <Link to={path.ZING_CHART} className='flex gap-2 items-center text-white hover:text-green-500'>
                    <h3 className='text-2xl  font-bold '>#zingchart</h3>
                    <span className='p-1 rounded-full bg-white'><BsFillPlayFill size={18} color='green' /></span>
                </Link>
                <div className='1324:flex-row  flex flex-col gap-4 h-full'>
                    <div className='flex-3 flex flex-col gap-4'>
                        {rank.filter((i, index) => index < 3)?.map((item, index) => (
                            <SongItem
                                key={item.encodeId}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                artists={item.artistsNames}
                                sid={item.encodeId}
                                order={index + 1}
                                percent={Math.round(+item.score * 100 / +chart?.totalScore)}
                                style='text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#935EA7]'
                            />
                        ))}
                        <Link to={path.ZING_CHART} className='text-white px-4 py-2 rounded-r-full rounded-l-full w-fit m-auto border border-white hover:bg-overlay-30'>Xem thêm</Link>
                    </div>
                    <div className='flex-7 h-[90%] order-first 1324:order-last 1324:w-[500px]'>
                        {data && <Line data={data} options={options} ref={chartRef} />}
                        <div
                            className="tooltip"
                            style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute' }}

                        >
                            <SongItem
                                thumbnail={rank?.find(i => i.encodeId === selected)?.thumbnail}
                                title={rank?.find(i => i.encodeId === selected)?.title}
                                artists={rank?.find(i => i.encodeId === selected)?.artistsNames}
                                sid={rank?.find(i => i.encodeId === selected)?.encodeId}
                                style='bg-white'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ChartSection)