import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import LoadingSong from "./LoadingSong";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import icons from "../../utils/icons";
import * as actions from "../../store/actions"
import * as apis from "../../apis";
// import { setCurSongData } from "../store/actions";

const {
  AiOutlineHeart,
  MdOutlineMoreHoriz,
  MdSkipNext,
  MdSkipPrevious,
  BsPlayCircle,
  BsPauseCircle,
  TbRepeatOnce,
  TbRepeat,
  TbArrowsShuffle2,
  BsMusicNoteList,
  HiVolumeUp,
  HiVolumeOff,
  ImVolumeHigh
} = icons;

var intervalId

const Player = ({ setIsShowRightSideBar }) => {
  const dispatch = useDispatch();
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [seconds, setSeconds] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0)
  const [isLoadedSource, setIsLoadedSource] = useState(true)
  const [volume, setVolume] = useState(100)
  const thumbRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoadedSource(false)
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId)
      ])
      setIsLoadedSource(true)
      if (res1.data.err === 0) {
        // console.log(res1);
        setSongInfo(res1.data.data)
        dispatch(actions.setCurSongData(res1.data.data))
      }

      if (res2.data.err === 0) {
        audio.pause()
        setAudio(new Audio(res2.data.data['128']))
      } else {
        audio.pause()
        setAudio(new Audio())
        dispatch(actions.play(false))
        toast.warn(res2.data.msg)
        audio.pause()
        setSeconds(0)
        thumbRef.current.style.cssText = `right: 100%`
      }
    };
    fetchDetailSong()
  }, [curSongId]);
  useEffect(() => {
    intervalId && clearInterval(intervalId)
    audio.pause()
    audio.load()
    if (isPlaying && thumbRef.current) {
      audio.play()
      intervalId = setInterval(() => {
        let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        setSeconds(Math.round(audio.currentTime))
      }, 200)
    }
  }, [audio])

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle()
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong()
      } else {
        audio.pause()
        dispatch(actions.play(false))
      }
    }
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audio, isShuffle, repeatMode])

  useEffect(() => {
    audio.volume = volume / 100
  }, [volume])

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause()
      dispatch(actions.play(false))
    } else {
      audio.play()
      dispatch(actions.play(true))
    }
  }

  const handleNextSong = () => {
    if (songs) {

      let currentSongIndex
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index
      })
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
      dispatch(actions.play(true))
    }
  }

  const handlePrevSong = () => {
    if (songs) {

      let currentSongIndex
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index
      })
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
      dispatch(actions.play(true))
    }
  }

  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
    dispatch(actions.play(true))
  }

  const handleClickProgressbar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect()
    const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
    thumbRef.current.style.cssText = `right: ${100 - percent}%`
    audio.currentTime = (percent * songInfo.duration) / 100
    setSeconds(Math.round((percent * songInfo.duration) / 100))
  }

  const handleRepeatOne = () => {
    audio.play()
  }

  return (
    <div className="bg-player px-5 h-full flex border-t-[1px] border-gray-700">
      <div className="w-[30%] flex-auto flex items-center gap-3">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h16 object-cover rounded-md"
        />
        <div className="flex flex-col ">
          <span className="font-semibold text-white text-sm">
            {songInfo?.title}
          </span>
          <span className="text-xs text-white">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 text-white pl-3">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <MdOutlineMoreHoriz size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto flex gap-4 items-center justify-center flex-col py-2">
        <div className="flex gap-8 justify-center items-center text-white">
          <span
            className={`cursor-pointer ${isShuffle && 'text-purple-600'}`}
            title="Bật phát ngẫu nhiên"
            onClick={() => setIsShuffle(prev => !prev)}
          >
            <TbArrowsShuffle2 size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? 'text-white' : 'cursor-pointer'}`}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 hover:text-main cursor-pointer "
            onClick={handleTogglePlayMusic}
          >
            {!isLoadedSource ? <LoadingSong /> : isPlaying ? <BsPauseCircle size={32} /> : <BsPlayCircle size={32} />}
          </span>
          <span
            onClick={handleNextSong}
            className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            className={`cursor-pointer ${repeatMode && 'text-main'}`}
            title="Bật phát lại tất cả"
            onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1)}
          >
            {repeatMode === 1 ? <TbRepeatOnce size={24} /> : <TbRepeat size={24} />}
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-3 text-xs text-white">
          <span>{moment.utc(seconds * 1000).format("mm:ss")}</span>
          <div
            className="w-3/5 h-[3px] hover:h-[6px] relative bg-gray-600 rounded-r-full rounded-l-full cursor-pointer "
            onClick={handleClickProgressbar}
            ref={trackRef}
          >
            <div ref={thumbRef} className="absolute top-0 left-0 bottom-0 bg-white rounded-r-full rounded-l-full"></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="w-[30%] hidden flex-auto smc:flex items-center justify-end gap-4 text-white ">
        <div className="flex gap-2 items-center">
          <span
            className="cursor-pointer"
            onClick={() => setVolume(prev => +prev === 0 ? 70 : 0)}
          >
            {+volume >= 50 ? <ImVolumeHigh /> : +volume === 0 ? <HiVolumeOff /> : <HiVolumeUp />}
          </span>
          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="cursor-pointer h-[5px]"
          />
        </div>

        <span
          onClick={() => setIsShowRightSideBar(prev => !prev)}
          className="p-1 rounded-sm bg-main opacity-80 hover:opacity-100 cursor-pointer"
        >
          <BsMusicNoteList size={16} />
        </span>
      </div>
    </div>
  );
};

export default Player;
