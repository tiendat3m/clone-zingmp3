import React, { memo } from "react";
import { useState } from "react";
import { Outlet, } from "react-router-dom";
import { Player, SidebarLeft, SidebarRight, Header, Loading } from "../../components";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/actions'

const Public = () => {
  // const { singer } = useParams()
  // const dispatch = useDispatch()
  const [isShowRightSideBar, setIsShowRightSideBar] = useState(false)
  const { isLoading, scrollTop } = useSelector(state => state.app)
  // const handleScrollTop = (e) => {
  //   e.target.scrollTop === 0 ? dispatch(actions.zeroScrollTop(true)) : dispatch(actions.zeroScrollTop(false))
  // }

  return (
    <div className="w-full relative h-screen flex flex-col bg-layout">
      <div className="w-full h-full flex flex-auto">
        <div className="md:w-[240px] w-[70px] h-full flex-none">
          <SidebarLeft />
        </div>
        <div className="flex-auto relative flex flex-col">
          {isLoading && <div className='absolute top-0 left-0 z-20 bottom-0 right-0 bg-sidebar flex items-center justify-center'>
            <Loading />
          </div>}
          <div className={`h-[70px] ${scrollTop ? 'bg-transparent' : 'bg-layout shadow-md'} fixed z-10 top-0 md:left-[240px] 426:left-[70px] px-[59px] flex items-center ${isShowRightSideBar ? 'right-0' : 'right-0'}`}>
            <Header />
          </div>
          <div className="flex-auto w-full">
            <Scrollbars
              // onScroll={handleScrollTop}
              autoHide
              style={{ width: '100%', height: '100%' }}
              className='relative z-0'
            >
              <Outlet />
              {/* <div className="h-[150px] w-full"></div> */}
            </Scrollbars>
          </div>
        </div>
        <div className="relative">
          {isShowRightSideBar && <div className="w-[329px] flex fixed top-0 right-0 z-50 flex-none h-screen animate-slide-left bg-layout border-l-[1px] border-gray-700">
            <SidebarRight />
          </div>}
        </div>
      </div>
      <div className="fixed z-50 bottom-0 left-0 right-0 h-[90px]">
        <Player setIsShowRightSideBar={setIsShowRightSideBar} />
      </div>
    </div>
  );
};

export default memo(Public);
