import icons from "./icons";

const { MdLibraryMusic, FaRegDotCircle, TbChartArcs, MdOutlineFeed } = icons;
export const sidebarMenu = [
  // {
  //   path: "mymusic",
  //   text: "Cá nhân ",
  //   icons: <MdLibraryMusic size={24} />,
  // },
  {
    path: "",
    text: "Khám phá ",
    end: true,
    icons: <FaRegDotCircle size={24} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart ",
    icons: <TbChartArcs size={24} />,
  },
  // {
  //   path: "follow",
  //   text: "Theo dõi ",
  //   icons: <MdOutlineFeed size={24} />,
  // },
];

export const searchMenu = [
  {
    path: "tat-ca",
    text: "TẤT CẢ",
  },
  {
    path: "bai-hat",
    text: "BÀI HÁT",
    end: true,
  },
  {
    path: "playlist",
    text: "PLAYLIST/ALBUM",
  },
];
