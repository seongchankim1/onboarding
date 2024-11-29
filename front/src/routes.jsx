import { Home, Profile, SignIn, SignUp } from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Patch",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "TBU",
    path: "/profile",
    element: "",
  },
  {
    name: "Agents",
    path: "/profile",
    element: "",
  },
];

export default routes;
