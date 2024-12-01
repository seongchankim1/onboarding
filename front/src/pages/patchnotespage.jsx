import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import ContentContainer from "@/components/contentcontainer";

export default function PatchNotesPage() {
    const [selectedSection, setSelectedSection] = useState("latestPatch");
    const [selectedPost, setSelectedPost] = useState(null);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [viewList, setViewList] = useState(false);
    const [patchData, setPatchData] = useState([]); // 패치 데이터를 저장할 상태

    useEffect(() => {
        const fetchData = async () => {
            const path = window.location.pathname;

            try {
                let url = "";
                if (path.includes("latest-patch")) {
                    url = "http://localhost:8080/note?page=0&size=5&condition=newest";
                } else if (path.includes("upcoming-patch")) {
                    url = "http://localhost:8080/note?page=0&size=5&condition=newest"; // 예정 패치도 동일한 조건
                } else if (path.includes("agent-updates")) {
                    url = "http://localhost:8080/note?page=0&size=5&condition=agent&agentName=NEON";
                }

                const response = await fetch(url);
                const data = await response.json();

                if (data?.data?.content) {
                    setPatchData(data.data.content); // 데이터 저장
                    setSelectedPost(data.data.content[0]); // 첫 번째 항목 선택
                }
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
            }
        };

        fetchData();
    }, []);

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
                setSelectedSection={setSelectedSection}
                isSubMenuOpen={isSubMenuOpen}
                setIsSubMenuOpen={setIsSubMenuOpen}
                setViewList={setViewList}
            />
            <ContentContainer
                viewList={viewList}
                selectedSection={selectedSection}
                selectedPost={selectedPost}
                patchData={patchData} // 백엔드 데이터 전달
                handleShowList={handleShowList}
                handleSelectPatch={handleSelectPatch}
            />
        </div>
    );
}
