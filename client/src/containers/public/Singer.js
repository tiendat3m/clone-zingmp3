import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetArtist } from '../../apis'
import icons from '../../utils/icons'
import { SongItem, Section, Artist } from '../../components'
import Sliders from 'react-slick'
import bgChart from '../../assets/bg-chart.jpg'

const { AiOutlineUserAdd, BsFillPlayFill } = icons

const Singer = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };
    // const { currentWidth } = useSelector(state => state.app)
    // const { scrollTop } = useSelector(state => state.app)
    // console.log(scrollTop);
    const [isHover, setIsHover] = useState(false)
    const { singer } = useParams()
    console.log(singer)
    const [artistData, setArtistData] = useState()
    const ref = useRef()
    useEffect(() => {
        const fetch = async () => {
            const res = await apiGetArtist(singer)
            if (res.data.err === 0) {
                setArtistData(res.data.data)
            }
        }
        singer && fetch()
    }, [singer])
    // console.log(artistData?.sections);
    // useEffect(() => {
    //     ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    // }, [singer])
    return (
        <div className='flex flex-col w-full'>
            <div className='relative' ref={ref}>
                <img src={artistData?.cover || bgChart} alt="background" className='h-[410px] object-cover w-full' />
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,.5)] to-transparent px-[59px] text-white'>
                    <div className='absolute bottom-0 pb-6'>
                        <div className='flex gap-4 items-center'>
                            <h1 className='text-[60px] font-bold'>{artistData?.name}</h1>
                            <span
                                className='p-2 relative rounded-full text-main hover:text-gray-100 cursor-pointer bg-white'
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                            >
                                <div className='w-8 h-8'></div>
                                {isHover && <span className='absolute top-[-1px] animate-scale-up-center left-[-1px] bottom-[-1px] right-[-1px] bg-main rounded-full'></span>}
                                <span className='absolute top-0 right-0 left-0 bottom-0 z-50 p-2'><BsFillPlayFill size={32} /></span>

                            </span>
                        </div>
                        <div className='flex items-center mt-4'>
                            <span className='text-sm text-gray-300 font-semibold mr-6'>{`${Number(artistData?.totalFollow.toFixed(1)).toLocaleString()} người quan tâm`}</span>
                            <button
                                type='button'
                                className='bg-main px-4 py-2 text-sm rounded-r-full flex items-center justify-center gap-1 rounded-l-full text-white'
                            >
                                <span><AiOutlineUserAdd /></span>
                                <span className='text-xs font-semibold'>QUAN TÂM</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-[30px] flex flex-col px-[59px] w-full'>
                <h3 className='mb-5 font-bold text-[20px]'>Bài hát nổi bật</h3>
                <div className='flex flex-wrap w-full'>
                    {artistData?.sections?.find(item => item.sectionType === 'song')?.items?.filter((item, index) => index < 6)?.map(item => (
                        <div key={item.encodeId} className="md:w-[50%]  426:w-full">
                            <div className=' flex items-center w-[90%] border-b border-[rgba(0,0,0,0.09)] '>
                                <SongItem
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    artists={item.artistsNames}
                                    totalDuration={item.duration}
                                    sid={item.encodeId}
                                    duration={item.duration}
                                    size='w-[40px] h-[40px]'
                                />
                                {/* <span className='text-xs opacity-70'>{moment.utc(item.duration*1000).format("mm:ss")}</span> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {artistData?.sections?.filter(item => item.sectionType === 'playlist')?.map((item, index) => (
                <div className='flex flex-1'>
                    <Section key={index} data={item} />
                </div>
            ))}
            <div className='flex flex-col mt-12'>
                <h3 className="text-[20px] font-bold mb-5 px-[59px]">{artistData?.sections?.find(item => item.sectionType === 'artist')?.title}</h3>
                {artistData && <div className="px-[43px] w-full">
                    <Sliders {...settings}>
                        {artistData.sections?.find(item => item.sectionType === 'artist')?.items?.map(item => (
                            <div
                                key={item.encodeId}
                                className='px-4'
                            >
                                <Artist
                                    image={item.thumbnail}
                                    follower={item.totalFollow}
                                    link={item.link}
                                    title={item.name}
                                />
                            </div>
                        ))}
                    </Sliders>
                </div>}
            </div>
            <div className='px-[59px] mt-12'>
                <h3 className='text-[20px] font-bold mb-5'>{`Về ${artistData?.name}`}</h3>
                <div className='flex gap-8'>
                    <img src={artistData?.thumbnailM} alt="thumbnail" className='rounded-md object-cover h-[375px] w-[45%] flex none' />
                    <div className='flex flex-col gap-8 text-sm'>
                        <p dangerouslySetInnerHTML={{ __html: artistData?.biography }}></p>

                        <div className='flex flex-col'>
                            <span className='text-[20px] font-bold mb-1'>{`${Number(artistData?.follow.toFixed(1)).toLocaleString()}`}</span>
                            <div className='text-sm opacity-70 font-semibold'>Người quan tâm</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[500px]'></div>
        </div>
    )
}

export default Singer