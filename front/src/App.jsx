import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";

function App() {
    const { pathname } = useLocation();

    return (
        <>
            {/* 홈 페이지에서만 Navbar 표시 */}
            {pathname === "/home" && (
                <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
                    <Navbar routes={routes} />
                </div>
            )}

            {/* 라우트 설정 */}
            <Routes>
                {routes.map(
                    ({ path, element }, key) =>
                        element && <Route key={key} exact path={path} element={element} />
                )}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </>
    );
}

export default App;
