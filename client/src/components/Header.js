import React from "react";
import icons from "../utils/icons";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { HiArrowNarrowLeft, HiArrowNarrowRight } = icons;

const Header = () => {
  const { scrollTop } = useSelector(state => state.app)
  const navigate = useNavigate()
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
      <div className="">Login</div>
    </div>
  );
};

export default Header;
