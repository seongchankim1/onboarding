import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import ContentContainer from "@/components/contentcontainer";

export default function PatchNotesPage() {
    const [selectedSection, setSelectedSection] = useState("latestPatch");
    const [selectedPost, setSelectedPost] = useState(null);
    const [patchData, setPatchData] = useState([]); // 패치 데이터를 저장할 상태
    const [viewList, setViewList] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // 서브 메뉴 열림 상태 추가
    const [agentList, setAgentList] = useState([]); // 요원 목록 상태 추가
    const [selectedAgent, setSelectedAgent] = useState(null); // 선택된 요원 이름

    // 요원 목록 가져오기
    useEffect(() => {
        const fetchAgentList = async () => {
            try {
                const response = await fetch("http://localhost:8080/note/list");
                const data = await response.json();
                if (data?.data) {
                    setAgentList(data.data);
                } else {
                    console.error("요원 목록 형식이 잘못되었습니다.", data);
                }
            } catch (error) {
                console.error("요원 목록 가져오기 실패:", error);
            }
        };

        fetchAgentList();
    }, []);

    const fetchData = async (section, agentName = null) => {
        setIsLoading(true); // 로딩 시작
        try {
            let url = "";

            switch (section) {
                case "latestPatch":
                    url = "http://localhost:8080/note?page=0&size=5&condition=newest";
                    break;
                case "upcomingPatch":
                    url = "http://localhost:8080/note?page=0&size=5&condition=upcomingPatch";
                    break;
                case "agentUpdates":
                    if (!agentName) {
                        console.error("요원 이름이 제공되지 않았습니다.");
                        setIsLoading(false);
                        return;
                    }
                    url = `http://localhost:8080/note?page=0&size=100&condition=agent&agentName=${agentName}`;
                    break;
                default:
                    console.error("Unknown section:", section);
                    setIsLoading(false);
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

    const handleSelectAgent = (agentName) => {
        setSelectedSection("agentUpdates");
        setSelectedAgent(agentName); // 선택된 요원 저장
        setViewList(false); // 요원 목록 보기 해제 후 업데이트 보기로 전환
        fetchData("agentUpdates", agentName);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white flex">
            <Sidebar
                selectedSection={selectedSection}
                setSelectedSection={(section) => {
                    setSelectedSection(section);
                    setViewList(false); // 메뉴 선택 시 요원 목록 or 패치 목록으로 전환 준비
                    if (section !== "agentUpdates") {
                        fetchData(section);
                    } else {
                        setViewList(false); // 요원 목록 보기로 전환
                        setSelectedAgent(null); // 요원 선택 해제
                    }
                }}
                setViewList={setViewList}
                isSubMenuOpen={isSubMenuOpen} // 서브 메뉴 상태 전달
                setIsSubMenuOpen={setIsSubMenuOpen} // 서브 메뉴 상태 변경 함수 전달
            />
            <ContentContainer
                viewList={viewList}
                selectedSection={selectedSection}
                selectedPost={selectedPost}
                patchData={patchData} // 데이터 전달
                isLoading={isLoading} // 로딩 상태 전달
                handleShowList={handleShowList}
                handleSelectPatch={handleSelectPatch}
                agentList={agentList} // 요원 목록 전달
                handleSelectAgent={handleSelectAgent} // 요원 선택 핸들러 전달
                selectedAgent={selectedAgent} // 선택된 요원 전달
            />
        </div>
    );
}
