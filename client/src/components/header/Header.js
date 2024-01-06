import React, { useEffect, useRef, useState } from "react";
import icons from "../../utils/icons";
import Search from "../search/Search";
import { useNavigate } from "react-router-dom";
import userDefault from '../../assets/user.png'
import { toast } from "react-toastify";
import MenuBar from "../menu/MenuBar";
const { HiArrowNarrowLeft, HiArrowNarrowRight, CiSettings, MdOutlineFileDownload } = icons;

const Header = () => {
  const menuRef = useRef(null)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsShowMenu(false)
      }
    };
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [])
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-6 w-full items-center">
        <div className="flex gap-6 text-white cursor-pointer">
          <span onClick={() => navigate(-1)}><HiArrowNarrowLeft size={24} /></span>
          <span onClick={() => navigate(+1)}><HiArrowNarrowRight size={24} /></span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      <div className="flex items-center w-full justify-end gap-3 relative">
        <div onClick={e => toast.info('Chức năng nay đang được hoàn thiện')} className="flex items-center h-10 px-5 text-main font-semibold bg-[#30293B] rounded-full cursor-pointer">
          <MdOutlineFileDownload size={26} />
          <span className="hover:opacity-90">Tải bản Windows</span>
        </div>
        <div ref={menuRef} onClick={() => setIsShowMenu(prev => !prev)} className="bg-[#30293B] h-[40px] w-[40px] flex items-center justify-center rounded-full cursor-pointer  relative">
          <span className="hover:opacity-90"><CiSettings size={22} color="white" /></span>
          {isShowMenu && <div className="absolute top-[52px] right-[12px] w-[300px]"><MenuBar /></div>}
        </div>
        <img src={userDefault} alt="" className="w-[38px] h-[38px] rounded-full object-contain cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
