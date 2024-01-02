import React from "react";
import logo from "../../assets/logo.svg";
import { sidebarMenu } from "../../utils/menu";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import path from '../../utils/path'
const notActiveStyle =
  "py-3 px-[24px] font-semibold text-white text-[13px] flex gap-3 items-center";
const activeStyle =
  "py-3 px-[21px] font-semibold text-white text-[13px] flex gap-3 items-center bg-overlay-30 border-main  border-l-[3px]";

const SidebarLeft = () => {

  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div onClick={() => navigate(path.HOME)} className="w-full h-[70px] md:py-[15px] md:px-[24px] flex items-center justify-start cursor-pointer">
        <img src={logo} alt="logo" className="w-[120px] h-10 md:block hidden" />
        <img
          src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.14/static/media/icon_zing_mp3_60.f6b51045.svg"
          alt="logo"
          className="w-[95px] h-[45px] md:hidden"
        />
      </div>
      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.end}
            className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
          >
            {item.icons}
            <span className="md:inline hidden">{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
