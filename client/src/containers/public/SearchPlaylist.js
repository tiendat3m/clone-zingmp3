import React, { useEffect, useState }  from 'react'
import { apiGetArtist, apiSearch } from '../../apis'
import { useSelector } from 'react-redux'
import { Section, SectionItem } from '../../components'
const SearchPlaylist = () => {

    const {searchData} = useSelector(state => state.music)
    const [playlists, setPlaylists] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const res = await apiGetArtist(searchData?.top?.alias)
            if(res.data.err === 0) {
                setPlaylists(res.data.data.sections[1])
            }
        }
        fetch()
    }, [searchData])
    return (
        <div className='w-full flex-col flex px-[43px]'>
            <h3 className='px-[16px] text-lg font-bold'>Playlist/Album</h3>
            <div className='flex items-start flex-wrap justify-start'>
                {playlists && playlists?.items?.length > 0 && playlists.items?.map(item => (
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
    )
}

export default SearchPlaylist