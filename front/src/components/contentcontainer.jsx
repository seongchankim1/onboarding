import React, { useState, useEffect } from "react";
import AgentList from "@/components/agentList.jsx";
import PatchList from "@/components/patchList.jsx";
import PatchDetail from "@/components/patchDetail.jsx";

export default function ContentContainer({
                                             viewList,
                                             selectedSection,
                                             selectedPost,
                                             patchData,
                                             isLoading,
                                             handleShowList,
                                             handleSelectPatch,
                                             agentList,
                                             handleSelectAgent,
                                             selectedAgent,
                                         }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionCallback, setTransitionCallback] = useState(null);

    // useEffect를 이용하여 애니메이션이 끝났을 때 상태 변경
    useEffect(() => {
        if (isTransitioning && transitionCallback) {
            // 애니메이션이 끝날 시점에 콜백 실행 후 상태 변경
            const timer = setTimeout(() => {
                transitionCallback();
                setIsTransitioning(false);
                setTransitionCallback(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning, transitionCallback]);

    const handleTransition = (callback) => {
        setIsTransitioning(true);
        setTransitionCallback(() => callback);
    };

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
                        <h1 className="text-4xl font-bold text-red-400 mb-4">
                            {selectedSection === "latestPatch"
                                ? "패치 내역"
                                : selectedSection === "upcomingPatch"
                                    ? "패치 예정"
                                    : selectedAgent
                                        ? `${selectedAgent} 업데이트 목록`
                                        : "요원별 업데이트"}
                        </h1>

                        {selectedSection === "agentUpdates" && !selectedAgent ? (
                            <AgentList
                                agentList={agentList}
                                handleSelectAgent={handleSelectAgent}
                                handleTransition={handleTransition}
                            />
                        ) : (
                            <PatchList
                                selectedAgent={selectedAgent}
                                patchData={patchData}
                                groupedPatches={patchData.reduce((groups, patch) => {
                                    if (!groups[patch.version]) {
                                        groups[patch.version] = [];
                                    }
                                    groups[patch.version].push(patch);
                                    return groups;
                                }, {})}
                                handleSelectPatch={handleSelectPatch}
                                handleTransition={handleTransition}
                            />
                        )}
                    </div>
                ) : (
                    <PatchDetail
                        selectedPost={selectedPost}
                        handleTransition={handleTransition}
                        handleShowList={handleShowList}
                        selectedSection={selectedSection}
                        handleSelectAgent={handleSelectAgent}
                    />
                )}
            </div>
        </main>
    );
}
