import React, { useEffect } from 'react'
import { Lists, List } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const SearchSongs = () => {
  const { searchData } = useSelector(state => state.music)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getSearchSongs(searchData?.top?.id))
  }, [searchData])
  return (
      <div className='px-[59px] w-full'><Lists isHideTime={true}/></div>
  )
}

export default SearchSongs