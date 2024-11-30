import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import ContentContainer from "@/components/contentcontainer";
import { patchSections } from "@/data/patchSections";

export default function PatchNotesPage() {
    const [selectedSection, setSelectedSection] = useState("latestPatch"); // 선택된 섹션
    const [selectedPost, setSelectedPost] = useState(null); // 현재 표시할 콘텐츠 상태
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // 서브 메뉴 열림 상태
    const [viewList, setViewList] = useState(false); // 목록 보기 상태

    useEffect(() => {
        // URL을 확인해 기본값 설정
        const path = window.location.pathname;

        if (path.includes("latest-patch")) {
            setSelectedSection("latestPatch");
            setSelectedPost(patchSections.latestPatch[0]); // 최신 패치의 첫 번째 포스트
            setIsSubMenuOpen(true);
        } else if (path.includes("upcoming-patch")) {
            setSelectedSection("upcomingPatch");
            setSelectedPost(patchSections.upcomingPatch[0]); // 예정 패치의 첫 번째 포스트
            setIsSubMenuOpen(true);
        } else if (path.includes("agent-updates")) {
            setSelectedSection("agentUpdates");
            setSelectedPost(patchSections.agentUpdates[0]); // 요원 업데이트의 첫 번째 포스트
            setIsSubMenuOpen(true);
        } else {
            // 기본값으로 최신 패치의 첫 번째 포스트를 설정
            setSelectedSection("latestPatch");
            setSelectedPost(patchSections.latestPatch[0]);
            setIsSubMenuOpen(true);
        }
    }, []);

    const handleShowList = () => {
        setViewList(true); // 목록 보기 활성화
        setSelectedPost(null); // 현재 선택된 콘텐츠 초기화
    };

    const handleSelectPatch = (patch) => {
        setViewList(false); // 목록 보기 종료
        setSelectedPost(patch); // 선택된 패치 설정
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white flex">
            {/* Sidebar에 상태와 함수 전달 */}
            <Sidebar
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                isSubMenuOpen={isSubMenuOpen}
                setIsSubMenuOpen={setIsSubMenuOpen}
                setViewList={setViewList}
            />
            {/* ContentContainer에 데이터와 상태 전달 */}
            <ContentContainer
                viewList={viewList}
                selectedSection={selectedSection}
                selectedPost={selectedPost}
                patchSections={patchSections}
                handleShowList={handleShowList}
                handleSelectPatch={handleSelectPatch}
            />
        </div>
    );
}
