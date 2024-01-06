
import icons from "./icons";

const {
  MdLibraryMusic,
  FaRegDotCircle,
  TbChartArcs,
  MdOutlineFeed,
  BsPlayCircle,
  FaBrush,
  AiOutlineInfoCircle,
  MdOutlinePrivacyTip,
  FaRegFlag,
  RiAdvertisementLine,
  FaPhoneAlt } = icons;
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
    icon: <FaRegDotCircle size={24} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart ",
    icon: <TbChartArcs size={24} />,
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


export const settingsMenu = [
  {
    id: 1,
    icon: <BsPlayCircle />,
    text: 'Trình phát nhạc',
  },
  {
    id: 2,
    icon: <FaBrush />,
    text: 'Giao diện',
  },
  {
    id: 3,
    icon: <AiOutlineInfoCircle />,
    text: 'Giới thiệu',
  },
  {
    id: 4,
    icon: <MdOutlineFeed />,
    text: 'Thoả thuận sử dụng',
  },
  {
    id: 5,
    icon: <MdOutlinePrivacyTip />,
    text: 'Chính sách bảo mật',
  },
  {
    id: 6,
    icon: <FaRegFlag />,
    text: 'Báo cáo vi phạm bản quyền',
  },
  {
    id: 7,
    icon: <RiAdvertisementLine />,
    text: 'Quảng cáo',
  },
  {
    id: 8,
    icon: <FaPhoneAlt />,
    text: 'Liên hệ',
  },
]