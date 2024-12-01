import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import ContentContainer from "@/components/contentcontainer";

export default function PatchNotesPage() {
    const [selectedSection, setSelectedSection] = useState("latestPatch");
    const [selectedPost, setSelectedPost] = useState(null);
    const [patchData, setPatchData] = useState([]); // 패치 데이터를 저장할 상태
    const [viewList, setViewList] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // 서브 메뉴 열림 상태 추가

    const fetchData = async (section) => {
        setIsLoading(true); // 로딩 시작
        try {
            let url = "";

            switch (section) {
                case "latestPatch":
                    url = "http://localhost:8080/note?page=0&size=5&condition=newest";
                    break;
                case "upcomingPatch":
                    url = "http://localhost:8080/note?page=0&size=5&condition=upcoming"; // 수정된 URL
                    break;
                case "agentUpdates":
                    url = "http://localhost:8080/note?page=0&size=5&condition=agent&agentName=NEON";
                    break;
                default:
                    console.error("Unknown section:", section);
                    return;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data?.data?.content) {
                setPatchData(data.data.content); // 데이터 저장
                setSelectedPost(null); // 선택된 항목 초기화
                setViewList(true); // 목록 보기 활성화
            } else {
                console.error("데이터 형식이 잘못되었습니다.", data);
            }
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    const handleShowList = () => {
        setViewList(true);
        setSelectedPost(null);
    };

    const handleSelectPatch = (patch) => {
        setViewList(false);
        setSelectedPost(patch);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white flex">
            <Sidebar
                selectedSection={selectedSection}
                setSelectedSection={(section) => {
                    setSelectedSection(section);
                    fetchData(section); // 섹션 선택 시 데이터 가져오기
                }}
                setViewList={setViewList}
                isSubMenuOpen={isSubMenuOpen} // 추가된 상태 전달
                setIsSubMenuOpen={setIsSubMenuOpen} // 상태 변경 함수 전달
            />
            <ContentContainer
                viewList={viewList}
                selectedSection={selectedSection}
                selectedPost={selectedPost}
                patchData={patchData} // 데이터 전달
                isLoading={isLoading} // 로딩 상태 전달
                handleShowList={handleShowList}
                handleSelectPatch={handleSelectPatch}
            />
        </div>
    );
}
