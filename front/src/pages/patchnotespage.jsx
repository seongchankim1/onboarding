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

    useEffect(() => {
        if (selectedSection) {
            fetchData(selectedSection, selectedAgent)
                .then((result) => {
                    setPatchData(result.content);
                    setTotalPages(result.totalPages);
                    setTotalElements(result.totalElements);
                })
                .catch((error) => {
                    console.error("Error initializing data:", error);
                });
        }
    }, [selectedSection, selectedAgent]);


    const fetchData = async (section, agentName = null, page = 0) => {
        console.log("Fetching data for:", { section, agentName, page });

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
                        console.error("Agent name is required for agentUpdates");
                        return { content: [], totalPages: 1, totalElements: 0 };
                    }
                    url = `http://localhost:8080/note?page=${page}&size=5&condition=agent&agentName=${encodeURIComponent(
                        agentName
                    )}`;
                    break;
                default:
                    console.error("Unknown section:", section);
                    return { content: [], totalPages: 1, totalElements: 0 };
            }

            console.log("Requesting URL:", url);

            const response = await fetch(url);
            const data = await response.json();

            console.log("API Response:", data);

            if (data?.data?.content) {
                return {
                    content: data.data.content,
                    totalPages: data.data.totalPages || 1,
                    totalElements: data.data.totalElements || 0, // 전체 노트 수 반환
                };
            } else {
                console.error("Unexpected response format:", data);
                return { content: [], totalPages: 1, totalElements: 0 };
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return { content: [], totalPages: 1, totalElements: 0 };
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
                    fetchData(section);
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
                fetchData={fetchData} // fetchData 전달
            />
        </div>
    );
}
