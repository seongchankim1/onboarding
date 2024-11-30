import { Home, Profile, SignIn, SignUp } from "@/pages";
import PatchNotesPage from "@/pages/PatchNotesPage"; // 패치 노트 페이지 컴포넌트 가져오기

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Latest", // "패치 내역" 경로
    path: "/latest-patch",
    element: <PatchNotesPage initialSection="latestPatch" />, // 초기 섹션 설정
  },
  {
    name: "Upcoming", // "패치 예정" 경로
    path: "/upcoming-patch",
    element: <PatchNotesPage initialSection="upcomingPatch" />, // 초기 섹션 설정
  },
  {
    name: "Agents", // "요원별 업데이트" 경로
    path: "/agent-updates",
    element: <PatchNotesPage initialSection="agentUpdates" />, // 초기 섹션 설정
  },
];

export default routes;
