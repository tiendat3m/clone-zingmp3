import React from 'react'
import { useSelector } from 'react-redux'
import { handleNumber } from '../../utils/fn'
import { SongItem, List, SectionItem, Artist } from '../../components'
const SearchAll = () => {
  const { searchData } = useSelector(state => state.music)
  return (
    <div className='w-full flex flex-col px-[43px] gap-[43px]'>
      <div className='flex flex-col px-4'>
        <h3 className='text-lg font-bold mb-5 text-white'>Nổi bật</h3>
        <div className='flex gap-8 text-white'>
          {searchData?.top && <div className='flex-1 p-[10px] bg-sidebar rounded-md flex gap-4 items-center cursor-pointer'>
            <img src={searchData?.top.thumbnail} alt="avatar" className={`w-[84px] h[84px] object-cover ${searchData?.top.objectType === 'artist' && 'rounded-full'}`} />
            <div className='flex flex-col'>
              <span className='text-xs opacity-70 mb-2'>{searchData?.top.objectType === 'artist' ? 'Nghệ sĩ' : 'Bài hát'}</span>
              <span className='text-sm font-semibold'>{searchData?.top.title || searchData?.top.name}</span>
              {searchData?.top && <span className='text-xs opacity-70'>{searchData?.top.objectType === 'artist' ? handleNumber(searchData?.artists[0].totalFollow) + ' quan tâm' : searchData?.top.artistsNames}</span>}
            </div>
          </div>}
          {searchData?.songs?.filter((item, index) => [...Array(2).keys()].some(i => i === index)).map(item => (
            <div key={item.encodeId} className="flex-1">
              <SongItem
                thumbnail={item.thumbnail}
                sid={item.encodeId}
                title={item.title}
                artists={item.artistsNames}
                size='w-[84px] h-[84px]'
                style='bg-sidebar'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col px-4'>
        <h3 className="text-lg font-bold mb-5 text-white">Bài hát</h3>
        <div className="flex justify-between flex-wrap w-full">
          {searchData?.songs?.filter((i, index) => index < 8)?.map((item, index) => (
            <div className={`flex-auto w-[45%] ${index % 2 !== 0 ? 'pl-4' : 'pr-4'}`} key={item.encodeId}>
              <List songData={item} isHideAlbum isHideNode={true} />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col w-full '>
        {<h3 className="text-lg font-bold mb-5 px-4 text-white">Playlist/Album</h3>}
        <div className="flex flex-wrap items-start justify-between">
          {searchData?.playlists?.filter((i, index) => index <= 4)?.map((item) => (
            <SectionItem
              key={item.encodeId}
              title={item.title}
              link={item.link}
              sortDescription={item.sortDescription}
              thumbnailM={item.thumbnailM}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col w-full text-white'>
        <h3 className="text-lg font-bold mb-5 px-4 ">Nghệ sĩ/OA</h3>
        <div className="flex gap-[24px]">
          {searchData?.artists?.filter((i, index) => index <= 4)?.map((item) => (
            <Artist
              key={item.id}
              title={item.name.length > 30 ? item.name.slice(0, 30) + '...' : item.name}
              image={item.thumbnailM}
              follower={item.totalFollow}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchAll