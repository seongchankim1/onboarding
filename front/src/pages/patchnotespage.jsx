import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import ContentContainer from "@/components/contentcontainer";

export default function PatchNotesPage() {
    const [selectedSection, setSelectedSection] = useState("latestPatch");
    const [selectedPost, setSelectedPost] = useState(null);
    const [patchData, setPatchData] = useState([]);
    const [viewList, setViewList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [agentList, setAgentList] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);

    // 요원 목록 가져오기
    useEffect(() => {
        fetchAgentList();
    }, []);

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

    const fetchData = async (section, agentName = null) => {
        if (section === "agentUpdates" && !agentName) {
            console.warn("요원 이름이 제공되지 않았기 때문에 데이터를 불러오지 않습니다.");
            return;
        }

        setIsLoading(true);
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
                    url = `http://localhost:8080/note?page=0&size=5&condition=agent&agentName=${agentName}`;
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
        setViewList(true);
        setSelectedPost(null);
        setSelectedAgent(null); // 요원 선택 해제
    };

    const handleSelectPatch = (patch) => {
        setViewList(false);
        setSelectedPost(patch);
    };

    const handleSelectAgent = (agentName) => {
        if (!agentName) {
            // 요원이 선택되지 않았을 경우 (돌아가기 버튼)
            setSelectedAgent(null);
            setViewList(true);
            return;
        }

        setSelectedSection("agentUpdates");
        setSelectedAgent(agentName);
        setViewList(false);
        fetchData("agentUpdates", agentName);
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
            />
        </div>
    );
}
