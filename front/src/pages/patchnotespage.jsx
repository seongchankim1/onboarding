// src/pages/PatchNotesPage.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import ContentContainer from "../components/ContentContainer.jsx";

export default function PatchNotesPage() {
    const [selectedSection, setSelectedSection] = useState("latestPatch");
    const [selectedPost, setSelectedPost] = useState(null);
    const [patchData, setPatchData] = useState([]);
    const [versions, setVersions] = useState([]);
    const [agentList, setAgentList] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [selectedMap, setSelectedMap] = useState(null);
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const [selectedOther, setSelectedOther] = useState(null);
    const [viewList, setViewList] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [versionPage, setVersionPage] = useState(0);
    const [totalVersionPages, setTotalVersionPages] = useState(1);

    const [notePage, setNotePage] = useState(0);
    const [totalNotePages, setTotalNotePages] = useState(1);
    const [totalNotes, setTotalNotes] = useState(0);

    const pageSize = 5;

    // Note 선택 시 selectedPost를 설정하는 함수 추가
    const handleSelectNote = (note) => {
        console.log("Selected Note:", note); // 디버깅용 로그
        setSelectedPost(note);
        setViewList(false);
    };

    const fetchData = async (condition, value = null, page = 0) => {
        let url = `http://localhost:8080/note?page=${page}&size=${pageSize}&condition=${condition}`;
        if (condition === "agent" && value) url += `&agentName=${encodeURIComponent(value)}`;
        if (condition === "map" && value) url += `&mapName=${encodeURIComponent(value)}`;
        if (condition === "weapon" && value) url += `&weaponName=${encodeURIComponent(value)}`;
        if (condition === "other" && value) url += `&otherType=${encodeURIComponent(value)}`;
        if (condition === "byVersion" && value) url += `&version=${encodeURIComponent(value)}`;

        const response = await fetch(url);
        const data = await response.json();
        return {
            content: data?.data?.content || [],
            totalPages: data?.data?.totalPages || 1,
            totalElements: data?.data?.totalElements || 0
        };
    };

    const fetchAgentList = async () => {
        const response = await fetch("http://localhost:8080/note/list?type=agent");
        const data = await response.json();
        if (data?.data) setAgentList(data.data);
    };

    useEffect(() => {
        // 목록 로딩 시 detail 모드가 아니면 목록 로딩
        if (!viewList) {
            // Detail 모드일때 목록 재로딩 방지
            return;
        }

        setIsLoading(true);
        setSelectedPost(null);

        // 초기화: 항목이 바뀌면 선택 상태들 초기화
        if (selectedSection !== "agentUpdates") setSelectedAgent(null);
        if (selectedSection !== "mapUpdates") setSelectedMap(null);
        if (selectedSection !== "weaponUpdates") setSelectedWeapon(null);
        if (selectedSection !== "otherUpdates") setSelectedOther(null);
        setItemList([]);
        setPatchData([]);
        setVersions([]);
        setTotalNotes(0);

        const loadData = async () => {
            if (selectedSection === "latestPatch") {
                const versionResult = await fetch(`http://localhost:8080/note/versions?page=${versionPage}&size=${pageSize}&condition=newest`);
                const vData = await versionResult.json();
                setVersions(vData.data?.content || []);
                setTotalVersionPages(vData.data?.totalPages || 1);
                setIsLoading(false);
            } else if (selectedSection === "upcomingPatch") {
                const versionResult = await fetch(`http://localhost:8080/note/versions?page=${versionPage}&size=${pageSize}&condition=upcomingPatch`);
                const vData = await versionResult.json();
                setVersions(vData.data?.content || []);
                setTotalVersionPages(vData.data?.totalPages || 1);
                setIsLoading(false);
            } else if (selectedSection === "agentUpdates") {
                if (!selectedAgent) {
                    await fetchAgentList();
                    setIsLoading(false);
                } else {
                    const result = await fetchData("agent", selectedAgent, notePage);
                    console.log("Agent notes:", result.content);
                    setPatchData(result.content);
                    setTotalNotePages(result.totalPages);
                    setTotalNotes(result.totalElements);
                    setIsLoading(false);
                }
            } else if (selectedSection === "mapUpdates") {
                if (!selectedMap) {
                    const res = await fetch(`http://localhost:8080/note/list?type=map`);
                    const d = await res.json();
                    setItemList(d.data || []);
                    setIsLoading(false);
                } else {
                    const result = await fetchData("map", selectedMap, notePage);
                    console.log("Map notes:", result.content);
                    setPatchData(result.content);
                    setTotalNotePages(result.totalPages);
                    setTotalNotes(result.totalElements);
                    setIsLoading(false);
                }
            } else if (selectedSection === "weaponUpdates") {
                if (!selectedWeapon) {
                    const res = await fetch(`http://localhost:8080/note/list?type=weapon`);
                    const d = await res.json();
                    setItemList(d.data || []);
                    setIsLoading(false);
                } else {
                    const result = await fetchData("weapon", selectedWeapon, notePage);
                    console.log("Weapon notes:", result.content);
                    setPatchData(result.content);
                    setTotalNotePages(result.totalPages);
                    setTotalNotes(result.totalElements);
                    setIsLoading(false);
                }
            } else if (selectedSection === "otherUpdates") {
                if (!selectedOther) {
                    const res = await fetch(`http://localhost:8080/note/list?type=other`);
                    const d = await res.json();
                    setItemList(d.data || []);
                    setIsLoading(false);
                } else {
                    const result = await fetchData("other", selectedOther, notePage);
                    console.log("Other notes:", result.content);
                    setPatchData(result.content);
                    setTotalNotePages(result.totalPages);
                    setTotalNotes(result.totalElements);
                    setIsLoading(false);
                }
            }
        };

        loadData();
    }, [selectedSection, selectedAgent, selectedMap, selectedWeapon, selectedOther, versionPage, viewList, notePage]);

    const handleShowList = () => {
        if (selectedSection === "agentUpdates" && selectedAgent) {
            setSelectedAgent(null);
            setNotePage(0);
        }
        if (selectedSection === "mapUpdates" && selectedMap) {
            setSelectedMap(null);
            setNotePage(0);
        }
        if (selectedSection === "weaponUpdates" && selectedWeapon) {
            setSelectedWeapon(null);
            setNotePage(0);
        }
        if (selectedSection === "otherUpdates" && selectedOther) {
            setSelectedOther(null);
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
    };

    const handleSelectVersion = (version) => {
        setIsLoading(true);
        setNotePage(0);
        fetchData("byVersion", version, 0).then((res) => {
            console.log("ByVersion notes:", res.content);
            setSelectedPost({ version, notes: res.content, totalElements: res.totalElements });
            setTotalNotePages(res.totalPages);
            setTotalNotes(res.totalElements);
            setViewList(false);
            setIsLoading(false);
        });
    };

    const handleSelectMap = (mName) => {
        setSelectedMap(mName);
        setNotePage(0);
    };

    const handleSelectWeapon = (wName) => {
        setSelectedWeapon(wName);
        setNotePage(0);
    };

    const handleSelectOther = (oType) => {
        setSelectedOther(oType);
        setNotePage(0);
    };

    const handleNotePageChange = (newPage) => {
        setIsLoading(true);
        if (selectedPost && selectedPost.version) {
            fetchData("byVersion", selectedPost.version, newPage).then((res) => {
                console.log("Next page notes (byVersion):", res.content);
                setSelectedPost({
                    version: selectedPost.version,
                    notes: res.content,
                    totalElements: res.totalElements
                });
                setTotalNotePages(res.totalPages);
                setTotalNotes(res.totalElements);
                setNotePage(newPage);
                setIsLoading(false);
            });
        } else if (selectedSection === "agentUpdates" && selectedAgent) {
            fetchData("agent", selectedAgent, newPage).then((res) => {
                console.log("Next page notes (agent):", res.content);
                setPatchData(res.content);
                setTotalNotePages(res.totalPages);
                setTotalNotes(res.totalElements);
                setNotePage(newPage);
                setIsLoading(false);
            });
        } else if (selectedSection === "mapUpdates" && selectedMap) {
            fetchData("map", selectedMap, newPage).then((res) => {
                console.log("Next page notes (map):", res.content);
                setPatchData(res.content);
                setTotalNotePages(res.totalPages);
                setTotalNotes(res.totalElements);
                setNotePage(newPage);
                setIsLoading(false);
            });
        } else if (selectedSection === "weaponUpdates" && selectedWeapon) {
            fetchData("weapon", selectedWeapon, newPage).then((res) => {
                console.log("Next page notes (weapon):", res.content);
                setPatchData(res.content);
                setTotalNotePages(res.totalPages);
                setTotalNotes(res.totalElements);
                setNotePage(newPage);
                setIsLoading(false);
            });
        } else if (selectedSection === "otherUpdates" && selectedOther) {
            fetchData("other", selectedOther, newPage).then((res) => {
                console.log("Next page notes (other):", res.content);
                setPatchData(res.content);
                setTotalNotePages(res.totalPages);
                setTotalNotes(res.totalElements);
                setNotePage(newPage);
                setIsLoading(false);
            });
        } else {
            // latestPatch, upcomingPatch 등에서는 페이지네이션 별도 필요 없음
            setIsLoading(false);
        }
    };

    const handleTransition = (callback) => {
        callback();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white flex">
            <Sidebar
                selectedSection={selectedSection}
                setSelectedSection={(section) => {
                    setSelectedAgent(null);
                    setSelectedMap(null);
                    setSelectedWeapon(null);
                    setSelectedOther(null);
                    setSelectedPost(null);
                    setSelectedSection(section);
                    setViewList(true);
                    setVersionPage(0);
                    setNotePage(0);
                }}
                setViewList={setViewList}
            />
            <ContentContainer
                viewList={viewList}
                selectedSection={selectedSection}
                selectedPost={selectedPost}
                versions={versions}
                patchData={patchData}
                agentList={agentList}
                itemList={itemList}
                selectedAgent={selectedAgent}
                selectedMap={selectedMap}
                selectedWeapon={selectedWeapon}
                selectedOther={selectedOther}
                isLoading={isLoading}
                handleShowList={handleShowList}
                handleSelectAgent={handleSelectAgent}
                handleSelectVersion={handleSelectVersion}
                handleSelectMap={handleSelectMap}
                handleSelectWeapon={handleSelectWeapon}
                handleSelectOther={handleSelectOther}
                versionPage={versionPage}
                setVersionPage={setVersionPage}
                totalVersionPages={totalVersionPages}
                notePage={notePage}
                handleNotePageChange={handleNotePageChange}
                totalNotePages={totalNotePages}
                totalNotes={totalNotes}
                handleTransition={handleTransition}
                handleSelectNote={handleSelectNote} // handleSelectNote 함수 전달
            />
        </div>
    );
}
