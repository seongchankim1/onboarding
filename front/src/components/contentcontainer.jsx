import React, { useState } from "react";
import AgentList from "@/components/agentList.jsx";
import PatchList from "@/components/patchList.jsx";
import PatchDetail from "@/components/patchDetail.jsx";

export default function ContentContainer({
                                             viewList,
                                             selectedSection,
                                             selectedPost,
                                             versions,
                                             patchData,
                                             isLoading,
                                             handleShowList,
                                             handleSelectVersion,
                                             agentList,
                                             handleSelectAgent,
                                             selectedAgent,
                                             versionPage,
                                             setVersionPage,
                                             totalVersionPages,
                                             notePage,
                                             handleNotePageChange,
                                             totalNotePages
                                         }) {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleTransition = (callback) => {
        setIsTransitioning(true);
        setTimeout(() => {
            callback();
            setIsTransitioning(false);
        }, 300);
    };

    const isAgentMode = (selectedSection === "agentUpdates" && selectedAgent);

    let title = "";
    if (selectedSection === "latestPatch") title = "패치 내역";
    else if (selectedSection === "upcomingPatch") title = "패치 예정";
    else if (selectedSection === "agentUpdates" && !selectedAgent) title = "요원별 업데이트";

    return (
        <main className="flex-1 p-6">
            <div
                className={`bg-gray-900 p-8 rounded-3xl shadow-2xl transition-all duration-500 ease-out transform ${
                    isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
            >
                {isLoading ? (
                    <p className="text-gray-400 text-center">로딩 중...</p>
                ) : viewList ? (
                    <div>
                        {title && <h1 className="text-4xl font-bold text-red-400 mb-4">{title}</h1>}
                        {selectedSection === "agentUpdates" && !selectedAgent ? (
                            <AgentList
                                agentList={agentList}
                                handleSelectAgent={handleSelectAgent}
                                handleTransition={handleTransition}
                            />
                        ) : isAgentMode ? (
                            <PatchDetail
                                notes={patchData}
                                handleTransition={handleTransition}
                                handleShowList={handleShowList}
                                selectedSection={selectedSection}
                                isAgentMode={true}
                                notePage={notePage}
                                handleNotePageChange={handleNotePageChange}
                                totalNotePages={totalNotePages}
                            />
                        ) : (
                            // latestPatch, upcomingPatch일 때 versions 목록 보여주기
                            <PatchList
                                versions={versions}
                                handleSelectVersion={handleSelectVersion}
                                handleTransition={handleTransition}
                                versionPage={versionPage}
                                setVersionPage={setVersionPage}
                                totalVersionPages={totalVersionPages}
                            />
                        )}
                    </div>
                ) : (
                    // selectedPost 있을 때 (byVersion 노트 보기)
                    <PatchDetail
                        selectedPost={selectedPost}
                        handleTransition={handleTransition}
                        handleShowList={handleShowList}
                        selectedSection={selectedSection}
                        isAgentMode={false}
                        notePage={notePage}
                        handleNotePageChange={handleNotePageChange}
                        totalNotePages={totalNotePages}
                    />
                )}
            </div>
        </main>
    );
}
