import { Home, Profile, SignIn, SignUp } from "@/pages";
import BoardPage from "@/pages/boardpage.jsx";
import PatchNoteCreate from "@/pages/PatchNoteCreate";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "PatchNotes",
    path: "/patch-notes",
    element: <BoardPage />, // 패치노트 게시판 경로 추가
  },
  {
    name: "CreatePatchNote",
    path: "/patch-notes/create",
    element: <PatchNoteCreate />, // 패치노트 작성 페이지 경로 추가
  },
  {
    name: "Profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "Signin",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Signup",
    path: "/sign-up",
    element: <SignUp />,
  },
];

export default routes;
