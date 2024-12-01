import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import DetailView from "@/components/DetailView"; // DetailView 컴포넌트 임포트
import { useState, useEffect } from "react";

function App() {
    const { pathname } = useLocation();
    const [post, setPost] = useState(null); // 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    // /note 페이지 접속 시 데이터를 불러옵니다.
    useEffect(() => {
        if (pathname === "/note") {
            setLoading(true); // 로딩 상태 시작
            fetch("http://localhost:8080/note?page=0&size=10&condition=newest")
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.data && data.data.content.length > 0) {
                        setPost(data.data.content[0]); // 첫 번째 데이터를 저장
                    }
                })
                .catch((error) => console.error("Error fetching data:", error))
                .finally(() => setLoading(false)); // 로딩 상태 종료
        }
    }, [pathname]);

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
                {/* /note 페이지에 DetailView 추가 */}
                <Route
                    path="/note"
                    element={
                        loading ? (
                            <div>로딩 중...</div>
                        ) : post ? (
                            <DetailView
                                post={post}
                                onBackToList={() => window.history.pushState(null, "", "/home")}
                            />
                        ) : (
                            <div>데이터를 불러올 수 없습니다.</div>
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </>
    );
}

export default App;
