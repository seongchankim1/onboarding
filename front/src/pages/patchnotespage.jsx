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

    const fetchData = async (section, agentName = null, page = 0) => {
        setIsLoading(true);
        try {
            let url = "";
            switch (section) {
                case "latestPatch":
                    url = `http://localhost:8080/note?page=${page}&size=5&condition=newest`;
                    break;
                case "upcomingPatch":
                    url = `http://localhost:8080/note?page=${page}&size=5&condition=upcomingPatch`;
                    break;
                case "agentUpdates":
                    if (!agentName) {
                        console.error("요원 이름이 제공되지 않았습니다.");
                        setIsLoading(false);
                        return;
                    }
                    url = `http://localhost:8080/note?page=${page}&size=5&condition=agent&agentName=${agentName}`;
                    break;
                default:
                    console.error("Unknown section:", section);
                    setIsLoading(false);
                    return;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data?.data?.content) {
                setPatchData(data.data.content);
                setSelectedPost(null);
                setViewList(true);
            } else {
                console.error("데이터 형식이 잘못되었습니다.", data);
            }
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShowList = () => {
        if (selectedSection === "agentUpdates" && selectedAgent) {
            // 요원별 업데이트에서 돌아갈 때는 요원 목록을 보여주기 위해 selectedAgent를 null로 설정
            setSelectedAgent(null);
        }
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

        if (agentName) {
            fetchData("agentUpdates", agentName);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white flex">
            <Sidebar
                selectedSection={selectedSection}
                setSelectedSection={(section) => {
                    setSelectedAgent(null);
                    setSelectedSection(section);
                    if (section !== "agentUpdates") {
                        fetchData(section);
                    } else {
                        setViewList(false);
                    }
                }}
                setViewList={setViewList}
                isSubMenuOpen={isSubMenuOpen}
                setIsSubMenuOpen={setIsSubMenuOpen}
            />
            <ContentContainer
                viewList={viewList}
                selectedSection={selectedSection}
                selectedPost={selectedPost}
                patchData={patchData}
                isLoading={isLoading}
                handleShowList={handleShowList}
                handleSelectPatch={handleSelectPatch}
                agentList={agentList}
                handleSelectAgent={handleSelectAgent}
                selectedAgent={selectedAgent}
                fetchData={fetchData}
            />
        </div>
    );
}
