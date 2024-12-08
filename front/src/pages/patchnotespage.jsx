import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import ContentContainer from "@/components/contentcontainer";

export default function PatchNotesPage() {
    const [selectedSection, setSelectedSection] = useState("latestPatch");
    const [selectedPost, setSelectedPost] = useState(null);
    const [versions, setVersions] = useState([]);
    const [patchData, setPatchData] = useState([]);
    const [viewList, setViewList] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [agentList, setAgentList] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);

    const [versionPage, setVersionPage] = useState(0);
    const [totalVersionPages, setTotalVersionPages] = useState(1);

    const [notePage, setNotePage] = useState(0);
    const [totalNotePages, setTotalNotePages] = useState(1);

    const pageSize = 5;

    const fetchAgentList = async () => {
        const response = await fetch("http://localhost:8080/note/list");
        const data = await response.json();
        if (data?.data) setAgentList(data.data);
    };

    const fetchVersions = async (section, agentName = null, page = 0) => {
        let condition = "";
        if (section === "latestPatch") condition = "newest";
        else if (section === "upcomingPatch") condition = "upcomingPatch";
        else if (section === "agentUpdates") condition = "agent";

        let url = `http://localhost:8080/note/versions?page=${page}&size=${pageSize}&condition=${condition}`;
        if (agentName) url += `&agentName=${encodeURIComponent(agentName)}`;

        const response = await fetch(url);
        const data = await response.json();
        return {
            content: data?.data?.content || [],
            totalPages: data?.data?.totalPages || 1,
        };
    };

    const fetchNotesByVersion = async (version, page = 0) => {
        const url = `http://localhost:8080/note?page=${page}&size=${pageSize}&condition=byVersion&version=${encodeURIComponent(version)}`;
        const response = await fetch(url);
        const data = await response.json();
        return {
            content: data?.data?.content || [],
            totalPages: data?.data?.totalPages || 1,
        };
    };

    const fetchAgentNotes = async (agentName, page = 0) => {
        const url = `http://localhost:8080/note?page=${page}&size=${pageSize}&condition=agent&agentName=${encodeURIComponent(agentName)}`;
        const response = await fetch(url);
        const data = await response.json();
        return {
            content: data?.data?.content || [],
            totalPages: data?.data?.totalPages || 1,
        };
    };

    // viewList가 true일 때만 초기 데이터 로딩
    useEffect(() => {
        if (!viewList) return; // Detail 모드일 때는 재로딩 안 함

        const loadData = async () => {
            setIsLoading(true);
            setSelectedPost(null);

            if (selectedSection === "agentUpdates" && !selectedAgent) {
                // 에이전트 목록 로드
                await fetchAgentList();
                setVersions([]);
                setPatchData([]);
                setIsLoading(false);
                return;
            }

            if (selectedSection === "agentUpdates" && selectedAgent) {
                // 에이전트 노트 로드
                const result = await fetchAgentNotes(selectedAgent, notePage);
                setPatchData(result.content);
                setTotalNotePages(result.totalPages);
                setIsLoading(false);
                return;
            }

            // latestPatch, upcomingPatch -> 버전 목록 로드
            const versionResult = await fetchVersions(selectedSection, null, versionPage);
            setVersions(versionResult.content);
            setTotalVersionPages(versionResult.totalPages);
            setIsLoading(false);
        };

        loadData();
    }, [selectedSection, selectedAgent, versionPage, viewList]);
    // notePage는 의존성에서 제외해 초기 목록 로딩에 영향 주지 않음
    // agentUpdates + selectedAgent 상태에서 리스트 보기에 들어올 때만 agent 노트 로딩

    const handleShowList = () => {
        if (selectedSection === "agentUpdates" && selectedAgent) {
            setSelectedAgent(null);
            setNotePage(0);
        }
        setViewList(true);
        setSelectedPost(null);
    };

    const handleSelectAgent = (agentName) => {
        setSelectedAgent(agentName);
        setSelectedPost(null);
        setViewList(true);
        setNotePage(0);
        // agent 노트 로드는 viewList true이고 selectedAgent 설정 후 useEffect 통해 로드됨
    };

    const handleSelectVersion = (version) => {
        setIsLoading(true);
        setNotePage(0);
        fetchNotesByVersion(version, 0).then((res) => {
            setSelectedPost({ version, notes: res.content });
            setTotalNotePages(res.totalPages);
            setViewList(false);
            setIsLoading(false);
        });
    };

    const handleNotePageChange = (newPage) => {
        // 노트 페이지 변경 시 목록으로 돌아가지 않도록, viewList 변경 없음
        if (selectedPost && selectedPost.version) {
            setIsLoading(true);
            fetchNotesByVersion(selectedPost.version, newPage).then((res) => {
                setSelectedPost({ version: selectedPost.version, notes: res.content });
                setTotalNotePages(res.totalPages);
                setNotePage(newPage);
                setIsLoading(false);
            });
        } else if (selectedSection === "agentUpdates" && selectedAgent) {
            setIsLoading(true);
            fetchAgentNotes(selectedAgent, newPage).then((res) => {
                setPatchData(res.content);
                setTotalNotePages(res.totalPages);
                setNotePage(newPage);
                setIsLoading(false);
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white flex">
            <Sidebar
                selectedSection={selectedSection}
                setSelectedSection={(section) => {
                    setSelectedAgent(null);
                    setSelectedPost(null);
                    setSelectedSection(section);
                    setViewList(true);
                    setVersionPage(0);
                    setNotePage(0);
                }}
                setViewList={setViewList}
                isSubMenuOpen={isSubMenuOpen}
                setIsSubMenuOpen={setIsSubMenuOpen}
            />
            <ContentContainer
                viewList={viewList}
                selectedSection={selectedSection}
                selectedPost={selectedPost}
                versions={versions}
                patchData={patchData}
                isLoading={isLoading}
                handleShowList={handleShowList}
                handleSelectVersion={handleSelectVersion}
                agentList={agentList}
                handleSelectAgent={handleSelectAgent}
                selectedAgent={selectedAgent}
                versionPage={versionPage}
                setVersionPage={setVersionPage}
                totalVersionPages={totalVersionPages}
                notePage={notePage}
                handleNotePageChange={handleNotePageChange}
                totalNotePages={totalNotePages}
            />
        </div>
    );
}
