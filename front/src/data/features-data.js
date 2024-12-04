import tailwindBlackIcon from "../../public/icons/black/tailwind-black.png";
import spycamBlackIcon from "../../public/icons/black/spycam-black.png";
import resurrectionBlackIcon from "../../public/icons/black/resurrection-black.png";

export const featuresData = [
  {
    color: "gray",
    title: "최신 패치 내역",
    icon: tailwindBlackIcon,
    description: "9.11 패치 내역",
    link: "/sign-in",
  },
  {
    color: "gray",
    title: "패치 예정",
    icon: spycamBlackIcon,
    description: "업데이트 예정된 항목",
    link: "/sign-up",
  },
  {
    color: "gray",
    title: "요원별 업데이트",
    icon: resurrectionBlackIcon,
    description: "요원별 업데이트 기록",
    link: "/feature1",
  },
];

export default featuresData;
