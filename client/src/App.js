import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Home, Login, Public, Personal, Album, WeekRank, ZingChart, Search, SearchSongs, SearchAll, Singer, SearchPlaylist } from "./containers";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import path from "./utils/path";
import * as actions from "./store/actions";
import "react-toastify/dist/ReactToastify.css";
import { apiGetChartHome } from "./apis";

function App() {
  const dispatch = useDispatch();
  const [weekChart, setWeekChart] = useState(null)
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth)
  // console.log(currentWidth)
  // console.log(currentWidth)
  useEffect(() => {
    dispatch(actions.getHome());
    const fetchChartData = async () => {
      const res = await apiGetChartHome()
      if (res.data.err === 0) setWeekChart(res.data.data.weekChart)
    }
    fetchChartData()
  }, []);

  const setWidth = (e) => {
    setCurrentWidth(e.target.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', setWidth)
    return () => {
      window.removeEventListener('resize', setWidth)
    }
  }, [])
  useEffect(() => {
    dispatch(actions.setCurrentWidth(currentWidth))
  }, [currentWidth])

  // console.log(currentWidth)
  return (
    <>
      <div className="">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MY_MUSIC} element={<Personal />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route path={path.WEEKRANK__TITLE__PID} element={<WeekRank weekChart={weekChart && Object.values(weekChart)} />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.HOME__SINGER} element={<Singer />} />\
            <Route path={path.HOME_ARTIST__SINGER} element={<Singer />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.SEARCH_ALL} element={<SearchAll />} />
              <Route path={path.SONG} element={<SearchSongs />} />
              <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
            </Route>
            <Route path={path.ALL} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
